(function () {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  const shelf = document.getElementById("shelf");
  const empty = document.getElementById("empty");
  const tally = document.getElementById("tally");
  const search = document.getElementById("search");
  const filters = document.getElementById("filters");
  const template = document.getElementById("card-template");

  const played = window.Store.list("games");
  let activeFilter = "all";

  // The name a tick is saved under. Renaming a game loses its tick unless it gets an id set to the old title.
  function keyOf(game) {
    return game.id || game.title;
  }

  function initials(title) {
    const letters = title
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("");
    return letters.toUpperCase() || "?";
  }

  function buildCard(game) {
    const card = template.content.firstElementChild.cloneNode(true);
    const key = keyOf(game);
    const title = game.title || "Untitled game";

    const cover = card.querySelector(".card-cover");
    const img = cover.querySelector("img");
    card.querySelector(".cover-fallback").textContent = initials(title);
    if (game.image) {
      img.src = game.image;
      img.addEventListener("error", () => card.classList.add("no-image"), { once: true });
    } else {
      card.classList.add("no-image");
    }

    const titleLink = card.querySelector(".card-title a");
    titleLink.textContent = title;

    const play = card.querySelector(".play");
    if (game.url) {
      cover.href = game.url;
      titleLink.href = game.url;
      play.href = game.url;
      play.setAttribute("aria-label", `Open ${title}`);
    } else {
      play.remove();
    }

    const platform = card.querySelector(".card-platform");
    if (game.platform) {
      platform.textContent = game.platform;
      platform.classList.toggle("is-mobile", /^mobile/i.test(game.platform));
    } else {
      platform.remove();
    }

    card.querySelector(".card-desc").textContent = game.description || "";

    const toggle = card.querySelector(".played-toggle");
    toggle.setAttribute("aria-label", `Played ${title}`);
    setPlayed(card, toggle, played.has(key));
    toggle.addEventListener("click", () => {
      const nowPlayed = !played.has(key);
      played.set(key, nowPlayed);
      setPlayed(card, toggle, nowPlayed);
      updateTally();
      updateFilterCounts();
      if (activeFilter !== "all") dropFromFilteredView(card);
    });

    return card;
  }

  function setPlayed(card, toggle, isPlayed) {
    card.classList.toggle("is-played", isPlayed);
    toggle.setAttribute("aria-pressed", String(isPlayed));
  }

  function updateTally() {
    const total = games.length;
    const done = games.filter((game) => played.has(keyOf(game))).length;

    if (!total) tally.textContent = "Nothing in the pile yet.";
    else if (!done) tally.textContent = `${total} ${total === 1 ? "game" : "games"} to play.`;
    else if (done === total) tally.textContent = `All ${total} played. Time for new ones.`;
    else tally.textContent = `${total - done} to play, ${done} played.`;
  }

  function passesFilter(game) {
    if (activeFilter === "played") return played.has(keyOf(game));
    if (activeFilter === "unplayed") return !played.has(keyOf(game));
    return true;
  }

  function updateFilterCounts() {
    const done = games.filter((game) => played.has(keyOf(game))).length;
    const counts = { all: games.length, unplayed: games.length - done, played: done };
    for (const button of filters.querySelectorAll("button")) {
      button.querySelector(".filter-count").textContent = counts[button.dataset.filter];
    }
  }

  function setFilter(filter) {
    activeFilter = filter;
    for (const button of filters.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.filter === filter));
    }
    render();
  }

  // A card that no longer fits the filter leaves the list; keep keyboard focus on a neighbouring card
  function dropFromFilteredView(card) {
    const cards = [...shelf.children];
    const index = cards.indexOf(card);
    render();
    const next = shelf.children[index] || shelf.children[index - 1];
    if (next) next.querySelector(".played-toggle").focus();
    else filters.querySelector('[aria-pressed="true"]').focus();
  }

  function clearSearch() {
    search.value = "";
    render();
    search.focus();
  }

  function showAll() {
    setFilter("all");
    filters.querySelector('[data-filter="all"]').focus();
  }

  function showEmpty(message, actions = []) {
    const box = document.createElement("div");
    box.className = "empty-box";
    const text = document.createElement("p");
    text.textContent = message;
    box.append(text);

    for (const action of actions) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = action.label;
      button.addEventListener("click", action.run);
      box.append(button);
    }

    empty.replaceChildren(box);
    empty.hidden = false;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const matches = games.filter((game) => {
      if (!passesFilter(game)) return false;
      if (!query) return true;
      const haystack = [game.title, game.description, game.platform].join(" ").toLowerCase();
      return haystack.includes(query);
    });

    shelf.replaceChildren(...matches.map(buildCard));
    updateTally();

    const filterName = { unplayed: "To play", played: "Played" }[activeFilter];
    if (!games.length) {
      showEmpty("Your pile is empty. Add a game to games.js and reload the page.");
    } else if (!matches.length && query) {
      const where = filterName ? ` in ${filterName}` : "";
      const actions = [{ label: "Clear search", run: clearSearch }];
      if (filterName) actions.push({ label: "Show all games", run: showAll });
      showEmpty(`No games match “${search.value.trim()}”${where}.`, actions);
    } else if (!matches.length && activeFilter === "played") {
      showEmpty("You haven't ticked any games as played yet.", [{ label: "Show all games", run: showAll }]);
    } else if (!matches.length && activeFilter === "unplayed") {
      showEmpty("Everything's played. Time to add new games.", [{ label: "Show all games", run: showAll }]);
    } else {
      empty.hidden = true;
    }
  }

  // Back to top: show the button once the masthead has scrolled out of view
  const toTop = document.getElementById("to-top");
  const masthead = document.querySelector(".masthead");
  const title = document.getElementById("top");
  new IntersectionObserver(([entry]) => {
    toTop.classList.toggle("is-visible", !entry.isIntersecting);
  }).observe(masthead);

  toTop.addEventListener("click", (event) => {
    event.preventDefault();
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    // Move keyboard focus back to the top too, without jumping the scroll
    title.focus({ preventScroll: true });
  });

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) setFilter(button.dataset.filter);
  });
  search.addEventListener("input", render);
  // Ticks changed outside this page's own buttons: another tab, a restored backup
  window.Store.onChange(() => {
    updateFilterCounts();
    render();
  });
  updateFilterCounts();
  render();
})();
