// Movies, cartoons and series. One object per title, in the order you want them shown.
//
//   title        the name
//   type         "movie", "cartoon" or "series"
//   year         optional, e.g. 2004 or "2019–2023"
//   image        a poster URL, or a file in images/ like "images/shrek.jpg" (tall 2:3 posters fit best)
//   url          where to watch it or read about it
//   description  a line or two about it

window.MOVIES = [
  {
    title: "Project Hail Mary",
    type: "movie",
    year: 2026,
    image: "images/project-hail-mary.jpg",
    url: "https://www.primevideo.com/detail/0J0SQMKFG51K9S3UTU9SDEMT7D",
    description:
      "Ryan Gosling wakes up alone on a spaceship with no memory, the last hope of a mission to save Earth from a microbe that's dimming the Sun, and finds an unlikely partner out there. From Andy Weir's novel, directed by Phil Lord and Christopher Miller.",
  },
  {
    title: "In Time",
    type: "movie",
    year: 2011,
    image: "images/in-time.jpg",
    url: "https://www.primevideo.com/detail/In-Time/0K1SFXIH7R0VURZLQJHAQZ44AG",
    description:
      "In a future where people stop aging at 25 and time is money, glowing as a clock on your arm, a factory worker (Justin Timberlake) is framed for murder and goes on the run with a rich man's daughter (Amanda Seyfried). Written and directed by Andrew Niccol.",
  },
  {
    title: "Naruto",
    type: "series",
    year: "2002–2007",
    image: "images/naruto.jpg",
    url: "https://www.crunchyroll.com/series/GY9PJ5KWR/naruto",
    description:
      "The original anime from Studio Pierrot, 220 episodes. Naruto Uzumaki, a loud orphan ninja everyone in his village avoids, trains with Sasuke and Sakura under Kakashi and dreams of becoming Hokage. Naruto Shippuden picks up the story after it.",
  },
  {
    title: "Family Guy",
    type: "series",
    year: "Since 1999",
    image: "images/family-guy.jpg",
    url: "https://www.disneyplus.com/browse/entity-3c3c0f8b-7366-4d15-88ab-18050285978e",
    description:
      "Seth MacFarlane's animated sitcom about the Griffins of Quahog, Rhode Island: clueless dad Peter, Lois, Meg, Chris, evil-genius baby Stewie and their talking dog Brian. Famous for its random cutaway gags. Still running, with 24 seasons and over 450 episodes.",
  },
];
