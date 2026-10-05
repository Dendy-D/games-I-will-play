(function () {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  const films = Array.isArray(window.MOVIES) ? window.MOVIES : [];

  function countText(n, one, many) {
    if (!n) return "Nothing on the list yet";
    return `${n} ${n === 1 ? one : many} on the list`;
  }

  // First, middle and last, so the fan shows a spread of the list rather than one series
  function pickThree(list) {
    if (list.length <= 3) return list;
    return [list[0], list[Math.floor(list.length / 2)], list[list.length - 1]];
  }

  function fan(container, items, build) {
    const covers = items.map(build);
    const middle = (covers.length - 1) / 2;
    covers.forEach((cover, index) => {
      cover.style.setProperty("--i", index - middle);
      cover.style.zIndex = index === Math.round(middle) ? 2 : 1;
    });
    container.replaceChildren(...covers);
  }

  function gameCover(game) {
    const cover = document.createElement("span");
    cover.className = "cover-game";
    const img = document.createElement("img");
    img.alt = "";
    img.src = game.image;
    img.addEventListener("error", () => img.remove(), { once: true });
    cover.append(img);
    return cover;
  }

  function filmCover(film) {
    const cover = document.createElement("span");
    cover.className = "cover-film";
    const title = document.createElement("span");
    title.className = "cover-film-title";
    title.textContent = film.title || "";
    cover.append(title);
    if (film.image) {
      const img = document.createElement("img");
      img.alt = "";
      img.src = film.image;
      img.style.position = "relative";
      img.addEventListener("error", () => img.remove(), { once: true });
      cover.append(img);
    }
    return cover;
  }

  document.getElementById("game-count").textContent = countText(games.length, "game", "games");
  document.getElementById("movie-count").textContent = countText(films.length, "title", "titles");

  fan(document.getElementById("game-covers"), pickThree(games.filter((game) => game.image)), gameCover);
  fan(document.getElementById("movie-covers"), pickThree(films), filmCover);
})();
