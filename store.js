// Ticks for both lists: which games are played and which titles are watched.
//
// IndexedDB holds the main copy. A second, plain copy sits in localStorage so a page
// can draw the right ticks the instant it opens, and so either copy can refill the
// other if one gets wiped. Every tick keeps the time it last changed, which lets a
// backup file be merged in without undoing anything newer.
(function () {
  const DB_NAME = "i-will-play";
  const DB_STORE = "ticks";
  const BACKUP_FORMAT = "i-will-play-backup";
  // Same keys and shape (an array of ticked names) the pages used before IndexedDB
  const MIRRORS = {
    games: "games-i-will-play:played",
    movies: "movies-i-will-watch:watched",
  };
  const LISTS = Object.keys(MIRRORS);

  const ticked = {};
  for (const list of LISTS) ticked[list] = readMirror(list);

  const changeListeners = new Set();
  const statusListeners = new Set();
  const localListeners = new Set();
  const mirrorWorks = canUseLocalStorage();

  let db = null;
  let opening = true;
  let guarded = false;
  let askedToGuard = false;
  // Ticks made in the first moments, before the database has been read
  const early = [];

  function canUseLocalStorage() {
    try {
      localStorage.setItem("i-will-play:probe", "1");
      localStorage.removeItem("i-will-play:probe");
      return true;
    } catch {
      return false;
    }
  }

  function readMirror(list) {
    try {
      const saved = JSON.parse(localStorage.getItem(MIRRORS[list]));
      return new Set(Array.isArray(saved) ? saved : []);
    } catch {
      return new Set();
    }
  }

  function writeMirror(list) {
    try {
      localStorage.setItem(MIRRORS[list], JSON.stringify([...ticked[list]]));
    } catch {
      // Storage blocked (private window etc.) — IndexedDB may still be keeping the ticks.
    }
  }

  function openDb() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore(DB_STORE, { keyPath: ["list", "key"] });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function readAll() {
    return new Promise((resolve, reject) => {
      const request = db.transaction(DB_STORE).objectStore(DB_STORE).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // With onlyNewer, a record is skipped when the stored one changed more recently
  function writeAll(records, { onlyNewer = false } = {}) {
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, "readwrite");
      const store = tx.objectStore(DB_STORE);
      for (const record of records) {
        if (!onlyNewer) {
          store.put(record);
          continue;
        }
        const stored = store.get([record.list, record.key]);
        stored.onsuccess = () => {
          if (!stored.result || stored.result.at < record.at) store.put(record);
        };
      }
      tx.oncomplete = () => resolve();
      tx.onerror = tx.onabort = () => reject(tx.error);
    });
  }

  function tickedFrom(records, list) {
    return new Set(records.filter((record) => record.list === list && record.done).map((record) => record.key));
  }

  // When each tick last changed, as far as this browser has seen
  const stamps = new Map();
  const stampId = (list, key) => `${list}\n${key}`;

  function remember(records) {
    for (const record of records) stamps.set(stampId(record.list, record.key), record.at);
  }

  // A new change must count as the latest even if another device's clock runs ahead of this one
  function nextStamp(list, key) {
    return Math.max(Date.now(), (stamps.get(stampId(list, key)) || 0) + 1);
  }

  function applyTick({ list, key, done }) {
    if (done) ticked[list].add(key);
    else ticked[list].delete(key);
  }

  function snapshot() {
    return JSON.stringify(LISTS.map((list) => [...ticked[list]].sort()));
  }

  function tellPage() {
    for (const listener of changeListeners) listener();
  }

  function tellStatus() {
    for (const listener of statusListeners) listener();
  }

  // This browser changed a tick itself (a click, a restored backup), as opposed to learning of one
  function tellLocal() {
    for (const listener of localListeners) listener();
  }

  // Open the database and bring it, the localStorage copy and the page into agreement
  async function start() {
    try {
      const opened = await openDb();
      opened.onversionchange = () => opened.close();
      db = opened;

      const records = await readAll();
      remember(records);
      const shown = snapshot();
      const catchUp = [];
      for (const list of LISTS) {
        if (records.some((record) => record.list === list)) {
          ticked[list] = tickedFrom(records, list);
        } else {
          // Nothing stored for this list: carry over the localStorage copy
          // (ticks from before IndexedDB, or a database that got wiped)
          for (const key of ticked[list]) catchUp.push({ list, key, done: true, at: Date.now() });
        }
      }
      for (const record of early) {
        applyTick(record);
        catchUp.push(record);
      }
      opening = false;

      if (catchUp.length) await writeAll(catchUp);
      LISTS.forEach(writeMirror);
      if (snapshot() !== shown) tellPage();
    } catch {
      // No usable IndexedDB (some private windows block it): the localStorage copy carries on alone
      db = null;
    } finally {
      opening = false;
      tellStatus();
    }
  }

  // Reload the ticks after they may have changed somewhere else: another tab, a restored backup,
  // another device. The page is only told when what it shows is no longer right.
  async function reload(shown = snapshot()) {
    if (db) {
      const records = await readAll();
      remember(records);
      for (const list of LISTS) {
        ticked[list] = tickedFrom(records, list);
        writeMirror(list);
      }
    } else {
      for (const list of LISTS) ticked[list] = readMirror(list);
    }
    const changed = snapshot() !== shown;
    if (changed) tellPage();
    return changed;
  }

  let channel = null;
  try {
    channel = new BroadcastChannel("i-will-play");
    channel.onmessage = () => reload();
  } catch {
    // No channel here: other open tabs catch up the next time they load
  }

  function announce() {
    if (channel) channel.postMessage("ticks");
  }

  // Ask the browser not to clear this site's data on its own. Asked on the first tick
  // rather than on load, because some browsers show a permission prompt.
  function guard() {
    if (askedToGuard || guarded || !navigator.storage?.persist) return;
    askedToGuard = true;
    navigator.storage.persist().then(setGuarded, () => {});
  }

  function setGuarded(granted) {
    guarded = granted;
    tellStatus();
  }

  function setTick(list, key, done) {
    const record = { list, key, done, at: nextStamp(list, key) };
    remember([record]);
    applyTick(record);
    writeMirror(list);

    if (opening) early.push(record);
    else if (db) writeAll([record]).catch(() => {}).then(told);
    else told();

    guard();
  }

  function told() {
    announce();
    tellLocal();
  }

  // Every tick this browser knows about, including the ones that were ticked and then unticked
  async function exportRecords() {
    if (db) return readAll();
    return LISTS.flatMap((list) => [...ticked[list]].map((key) => ({ list, key, done: true, at: Date.now() })));
  }

  function isTick(tick) {
    return (
      tick &&
      LISTS.includes(tick.list) &&
      typeof tick.key === "string" &&
      typeof tick.done === "boolean" &&
      Number.isFinite(tick.at)
    );
  }

  // The backup file and the file devices sync through share this format
  function formatBackup(records) {
    return JSON.stringify(
      { format: BACKUP_FORMAT, version: 1, exportedAt: new Date().toISOString(), ticks: records },
      null,
      2
    );
  }

  function parseBackup(text) {
    const backup = JSON.parse(text);
    if (backup?.format !== BACKUP_FORMAT || !Array.isArray(backup.ticks)) {
      throw new Error("Not a backup file");
    }
    return backup.ticks.filter(isTick).map(({ list, key, done, at }) => ({ list, key, done, at }));
  }

  // Merge in ticks from elsewhere: for each tick, whichever side changed it last wins
  async function mergeRecords(records) {
    const shown = snapshot();
    if (db) {
      await writeAll(records, { onlyNewer: true });
    } else {
      // No change times to compare without the database, so the ticks are applied as they are
      records.forEach(applyTick);
      LISTS.forEach(writeMirror);
    }
    if (await reload(shown)) announce();
  }

  async function exportBackup() {
    return formatBackup(await exportRecords());
  }

  async function importBackup(text) {
    await mergeRecords(parseBackup(text));
    tellLocal();
  }

  if (navigator.storage?.persisted) navigator.storage.persisted().then(setGuarded, () => {});

  window.Store = {
    ready: start(),
    list(name) {
      return {
        has: (key) => ticked[name].has(key),
        set: (key, done) => setTick(name, key, done),
      };
    },
    count: (name) => ticked[name].size,
    // kept: ticks survive closing the page. guarded: the browser promised not to clear them on its own.
    // timed: each tick's change time is recorded (needs IndexedDB), which syncing between devices relies on.
    status: () => ({ kept: Boolean(db) || mirrorWorks, guarded, timed: Boolean(db) }),
    onChange: (listener) => changeListeners.add(listener),
    onStatus: (listener) => statusListeners.add(listener),
    onLocalChange: (listener) => localListeners.add(listener),
    exportBackup,
    importBackup,
    exportRecords,
    mergeRecords,
    formatBackup,
    parseBackup,
  };
})();
