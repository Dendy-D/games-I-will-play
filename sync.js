// Sync: keeps the ticks the same on every device.
//
// The ticks live in one file in a private GitHub repository. Each device holds a
// GitHub token (the "sync key") that can read and write that file; the key stays in
// this browser. Devices merge rather than overwrite: for each tick, the most recent
// change wins.
(function () {
  const REPO = "Dendy-D/games-I-will-play-data";
  const FILE_URL = `https://api.github.com/repos/${REPO}/contents/ticks.json`;
  const KEY_STORAGE = "i-will-play:sync-key";
  const POLL_MS = 30000;
  // A burst of ticks goes up as one save
  const SETTLE_MS = 1000;

  const PROBLEMS = {
    offline: "Can't reach GitHub right now. Your ticks are saved here and will sync when the connection is back.",
    rejected: "GitHub rejected the sync key. It may have expired or been deleted.",
    "no-access": "This key can't open the sync storage. It needs access to the games-I-will-play-data repository.",
    "read-only": "This key can read the sync storage but can't write to it. It needs Contents set to Read and write.",
    limited: "GitHub is limiting requests for now. Sync will try again shortly.",
    "no-database": "Sync needs IndexedDB, which this browser is blocking.",
    failed: "Sync didn't go through. It will try again shortly.",
  };
  // Said instead when the key is being pasted in: nothing retries on its own at that point
  const SETUP_PROBLEMS = {
    offline: "Can't reach GitHub right now. Check your connection and try again.",
    rejected: "GitHub rejected that key. Check that you copied all of it.",
    limited: "GitHub is limiting requests for now. Try again in a few minutes.",
    failed: "Couldn't turn sync on. Try again in a moment.",
  };

  const store = window.Store;
  const status = document.getElementById("sync-status");
  const time = document.getElementById("sync-time");
  const setup = document.getElementById("sync-setup");
  const field = document.getElementById("sync-key");
  const controls = document.getElementById("sync-controls");

  let key = readKey();
  let problem = null;
  let syncedAt = null;
  let running = false;
  let queued = false;
  let settle = null;

  function readKey() {
    try {
      return localStorage.getItem(KEY_STORAGE);
    } catch {
      return null;
    }
  }

  function saveKey() {
    try {
      if (key) localStorage.setItem(KEY_STORAGE, key);
      else localStorage.removeItem(KEY_STORAGE);
    } catch {
      // Storage blocked — sync still works until the page is closed.
    }
  }

  class SyncProblem extends Error {
    constructor(kind) {
      super(kind);
      this.kind = kind;
    }
  }

  function toBase64(text) {
    let binary = "";
    for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
    return btoa(binary);
  }

  function fromBase64(encoded) {
    const binary = atob(encoded.replace(/\s/g, ""));
    return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
  }

  async function call(method, token, body) {
    let response;
    try {
      response = await fetch(FILE_URL, {
        method,
        // GitHub lets browsers reuse an answer for a minute, which would hide another device's save
        cache: "no-store",
        headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}` },
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw new SyncProblem("offline");
    }

    if (response.status === 401) throw new SyncProblem("rejected");
    // GitHub answers "not found" for a private repository the token isn't allowed to see
    if (response.status === 404) throw new SyncProblem("no-access");
    if (response.status === 403 || response.status === 429) {
      const limited = response.headers.get("x-ratelimit-remaining") === "0" || response.headers.has("retry-after");
      throw new SyncProblem(method === "PUT" && !limited ? "read-only" : "limited");
    }
    return response;
  }

  async function pull(token) {
    const response = await call("GET", token);
    if (!response.ok) throw new SyncProblem("failed");
    const file = await response.json();

    let records = [];
    try {
      records = store.parseBackup(fromBase64(file.content));
    } catch {
      // An unreadable file counts as empty; this device's ticks then replace it
    }
    return { records, sha: file.sha };
  }

  // Resolves to false when another device saved first, so the caller can merge and try again
  async function push(token, records, sha) {
    const response = await call("PUT", token, {
      message: "Sync ticks",
      content: toBase64(store.formatBackup(records)),
      sha,
    });
    if (response.status === 409 || response.status === 422) return false;
    if (!response.ok) throw new SyncProblem("failed");
    return true;
  }

  function fingerprint(records) {
    return JSON.stringify(records.map(({ list, key, done, at }) => [list, key, done, at]).sort());
  }

  // Take in what other devices saved, then save back anything they haven't seen
  async function exchange(token) {
    for (let attempt = 0; attempt < 4; attempt++) {
      const remote = await pull(token);
      await store.mergeRecords(remote.records);
      const local = await store.exportRecords();
      if (fingerprint(local) === fingerprint(remote.records)) return;
      if (await push(token, local, remote.sha)) return;
    }
    throw new SyncProblem("failed");
  }

  async function sync() {
    if (!key) return;
    if (running) {
      queued = true;
      return;
    }
    running = true;
    const token = key;
    try {
      await store.ready;
      await exchange(token);
      // Sync may have been turned off, or the key replaced, while this was in the air
      if (key !== token) return;
      problem = null;
      syncedAt = new Date();
    } catch (error) {
      if (key !== token) return;
      problem = error instanceof SyncProblem ? error.kind : "failed";
      if (problem === "rejected") {
        // A dead key can't recover on its own: turn sync off here so a new key can be pasted
        key = null;
        saveKey();
      }
    } finally {
      running = false;
      show();
      if (queued) {
        queued = false;
        sync();
      }
    }
  }

  function syncSoon() {
    clearTimeout(settle);
    settle = setTimeout(sync, SETTLE_MS);
  }

  async function turnOn(candidate) {
    await store.ready;
    if (!store.status().timed) throw new SyncProblem("no-database");
    // Proves the key can both read and write before it is kept
    await exchange(candidate);
    key = candidate;
    saveKey();
    problem = null;
    syncedAt = new Date();
  }

  function turnOff() {
    key = null;
    saveKey();
    problem = null;
    syncedAt = null;
  }

  function say(message) {
    // Same text again would only make a screen reader repeat itself
    if (status.textContent !== message) status.textContent = message;
  }

  function show() {
    const on = Boolean(key);
    setup.hidden = on;
    controls.hidden = !on;

    if (on) {
      say(problem ? PROBLEMS[problem] : "Sync is on. Ticks made here show up on your other devices, and theirs show up here.");
      time.textContent = syncedAt
        ? `Last synced at ${syncedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.`
        : "";
    } else {
      say(
        problem === "rejected"
          ? `Sync was turned off. ${PROBLEMS.rejected} Paste a new key to turn it back on.`
          : "Sync is off on this device. Paste your sync key to keep ticks the same on every device."
      );
      time.textContent = "";
    }
  }

  setup.addEventListener("submit", async (event) => {
    event.preventDefault();
    const candidate = field.value.trim();
    if (!candidate) return;

    const button = setup.querySelector("button");
    button.disabled = true;
    say("Checking the key…");
    try {
      await turnOn(candidate);
      field.value = "";
      show();
      controls.querySelector("button").focus();
    } catch (error) {
      const kind = error instanceof SyncProblem ? error.kind : "failed";
      say(SETUP_PROBLEMS[kind] || PROBLEMS[kind]);
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById("sync-now").addEventListener("click", sync);

  document.getElementById("sync-off").addEventListener("click", () => {
    turnOff();
    show();
    say("Sync is off on this device. Your ticks stay in this browser.");
    field.focus();
  });

  store.onLocalChange(syncSoon);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) sync();
  });
  window.addEventListener("online", sync);
  setInterval(() => {
    if (!document.hidden) sync();
  }, POLL_MS);

  show();
  sync();
})();
