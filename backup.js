// The backup box at the bottom of the games and movies pages
(function () {
  const store = window.Store;
  const note = document.getElementById("storage-note");
  const result = document.getElementById("backup-result");
  const file = document.getElementById("backup-file");

  function describeStorage() {
    const { kept, guarded } = store.status();
    if (!kept) note.textContent = "This browser is blocking storage, so your ticks will be gone when you close the page.";
    else if (guarded) note.textContent = "The browser has agreed not to clear your ticks on its own.";
    else note.textContent = "The browser may clear your ticks on its own if the device runs low on space.";
  }

  function count(number, one, many) {
    return `${number} ${number === 1 ? one : many}`;
  }

  document.getElementById("backup-download").addEventListener("click", async () => {
    const today = new Date();
    const date = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
      .map((part) => String(part).padStart(2, "0"))
      .join("-");
    const name = `i-will-play-backup-${date}.json`;

    const url = URL.createObjectURL(new Blob([await store.exportBackup()], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    // Give the browser a moment to start the download before the link stops working
    setTimeout(() => URL.revokeObjectURL(url), 1000);

    result.textContent = `Backup downloaded as ${name}.`;
  });

  document.getElementById("backup-restore").addEventListener("click", () => file.click());

  file.addEventListener("change", async () => {
    const [picked] = file.files;
    // Reset so picking the same file again still fires a change
    file.value = "";
    if (!picked) return;

    try {
      await store.importBackup(await picked.text());
      const played = count(store.count("games"), "game", "games");
      const watched = count(store.count("movies"), "title", "titles");
      result.textContent = `Backup restored. This browser now has ${played} marked played and ${watched} marked watched.`;
    } catch {
      result.textContent = "That file couldn't be restored, so nothing was changed. Check that it's a backup downloaded from this site.";
    }
  });

  store.onStatus(describeStorage);
  store.ready.then(describeStorage);
})();
