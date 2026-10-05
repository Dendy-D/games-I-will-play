(function () {
  const TYPES = {
    movie: { label: "Movie", open: "Open movie" },
    cartoon: { label: "Cartoon", open: "Open cartoon" },
    series: { label: "Series", open: "Open series" },
  };

  const films = Array.isArray(window.MOVIES) ? window.MOVIES : [];
  const posters = document.getElementById("posters");
  const empty = document.getElementById("empty");
  const tally = document.getElementById("tally");
  const search = document.getElementById("search");
  const filters = document.getElementById("filters");
  const template = document.getElementById("film-template");

  const watched = window.Store.list("movies");
  let activeType = "all";

  // The name a tick is saved under. Changing a title or year loses its tick unless it gets an id set to the old "title year".
  function keyOf(film) {
    return film.id || [film.title, film.year].filter(Boolean).join(" ");
  }

  function buildFilm(film) {
    const card = template.content.firstElementChild.cloneNode(true);
    const key = keyOf(film);
    const title = film.title || "Untitled";
    const type = TYPES[film.type];

    const poster = card.querySelector(".film-poster");
    const img = poster.querySelector("img");
    card.querySelector(".poster-fallback-title").textContent = title;
    if (film.image) {
      img.src = film.image;
      img.addEventListener("error", () => card.classList.add("no-image"), { once: true });
    } else {
      card.classList.add("no-image");
    }

    const titleLink = card.querySelector(".film-title a");
    titleLink.textContent = title;

    const watch = card.querySelector(".watch");
    if (film.url) {
      poster.href = film.url;
      titleLink.href = film.url;
      watch.href = film.url;
      watch.textContent = type ? type.open : "Open";
      watch.setAttribute("aria-label", `Open ${title}`);
    } else {
      watch.remove();
    }

    const typeTag = card.querySelector(".film-type");
    if (type) typeTag.textContent = type.label;
    else typeTag.remove();

    const year = card.querySelector(".film-year");
    if (film.year) year.textContent = film.year;
    else year.remove();

    card.querySelector(".film-desc").textContent = film.description || "";

    const toggle = card.querySelector(".watched-toggle");
    toggle.setAttribute("aria-label", `Watched ${title}`);
    setWatched(card, toggle, watched.has(key));
    toggle.addEventListener("click", () => {
      const nowWatched = !watched.has(key);
      watched.set(key, nowWatched);
      setWatched(card, toggle, nowWatched);
      updateTally();
    });

    return card;
  }

  function setWatched(card, toggle, isWatched) {
    card.classList.toggle("is-watched", isWatched);
    toggle.setAttribute("aria-pressed", String(isWatched));
  }

  function updateTally() {
    const total = films.length;
    const done = films.filter((film) => watched.has(keyOf(film))).length;

    if (!total) tally.textContent = "Nothing on the list yet.";
    else if (!done) tally.textContent = `${total} to watch.`;
    else if (done === total) tally.textContent = `All ${total} watched. Time for new ones.`;
    else tally.textContent = `${total - done} to watch, ${done} watched.`;
  }

  function updateFilterCounts() {
    for (const button of filters.querySelectorAll("button")) {
      const type = button.dataset.type;
      const count = type === "all" ? films.length : films.filter((film) => film.type === type).length;
      button.querySelector(".filter-count").textContent = count;
    }
  }

  function showEmpty(message, action) {
    const box = document.createElement("div");
    box.className = "empty-box";
    const text = document.createElement("p");
    text.textContent = message;
    box.append(text);

    if (action) {
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
    const matches = films.filter((film) => {
      if (activeType !== "all" && film.type !== activeType) return false;
      if (!query) return true;
      const haystack = [film.title, film.description, film.year, TYPES[film.type]?.label].join(" ").toLowerCase();
      return haystack.includes(query);
    });

    posters.replaceChildren(...matches.map(buildFilm));
    updateTally();

    if (!films.length) {
      showEmpty("Your list is empty. Add a title to movies.js and reload the page.");
    } else if (!matches.length && query) {
      showEmpty(`Nothing matches “${search.value.trim()}”.`, {
        label: "Clear search",
        run: () => {
          search.value = "";
          render();
          search.focus();
        },
      });
    } else if (!matches.length) {
      showEmpty(`No ${TYPES[activeType].label.toLowerCase()} titles on the list yet.`, {
        label: "Show all",
        run: () => setType("all"),
      });
    } else {
      empty.hidden = true;
    }
  }

  function setType(type) {
    activeType = type;
    for (const button of filters.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.type === type));
    }
    render();
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) setType(button.dataset.type);
  });
  search.addEventListener("input", render);
  // Ticks changed outside this page's own buttons: another tab, a restored backup
  window.Store.onChange(render);

  updateFilterCounts();
  render();
})();
