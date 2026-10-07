// Your games. One object per game, in the order you want them shown.
//
//   title        the game's name
//   image        a picture URL, or a file in images/ like "images/hades.jpg"
//   url          where to play or get the game
//   description  a line or two about it
//   platform     optional, e.g. "Steam", "Browser", "Switch"

window.GAMES = [
  {
    title: "Алёша Попович и Тугарин Змей",
    image: "images/alesha-popovich.jpg",
    url: "https://www.old-games.ru/game/11087.html",
    description:
      "Point-and-click adventure from 2005 based on the Melnitsa cartoon. Alyosha and Tikhon chase Tugarin's horde across fairs, forests and villages to win back Rostov's stolen gold, solving puzzles along the way.",
    platform: "PC",
  },
  {
    title: "Добрыня Никитич и Змей Горыныч",
    image: "images/dobrynya-nikitich.jpg",
    url: "https://www.old-games.ru/game/12301.html",
    description:
      "The 2006 follow-up from the same studio, based on the next Melnitsa cartoon. Dobrynya and the messenger Elisey go after Zmey Gorynych to rescue Prince Vladimir's niece Zabava, with lots of arcade mini-games mixed into the quest.",
    platform: "PC",
  },
  {
    title: "Илья Муромец и Соловей-Разбойник",
    image: "images/ilya-muromets.jpg",
    url: "https://ru.wikipedia.org/wiki/Илья_Муромец_и_Соловей-Разбойник_(игра)",
    description:
      "Third game in the series (2007). Nightingale the Robber steals Ilya's horse Burushka and the prince's treasury. You switch between Ilya, the Prince of Kiev and Alyonushka, chasing him all the way to Constantinople, with arcade and logic mini-games along the way.",
    platform: "PC",
  },
  {
    title: "Три богатыря и Шамаханская царица",
    image: "images/tri-bogatyrya-shamakhanskaya.jpg",
    url: "https://gama-gama.ru/detail/tri-bogatyrya-i-shamahanskaya-carica-3/",
    description:
      "The 2010 quest where all three heroes finally team up. The Shamakhan Queen seizes the prince's throne in Kiev, and you play as Alyosha, Dobrynya and Ilya, each with their own skills, on a trip that reaches as far as England and China.",
    platform: "PC",
  },
  {
    title: "Весёлая ферма",
    image: "images/farm-frenzy.jpg",
    url: "https://store.steampowered.com/app/38120/Farm_Frenzy/",
    description:
      "Alawar's 2007 farm time-manager that started the whole series. Grow grass, feed your animals, turn eggs and milk into goods and ship them to town before the clock runs out on each level.",
    platform: "Steam",
  },
  {
    title: "Весёлая ферма 2",
    image: "images/farm-frenzy-2.jpg",
    url: "https://store.steampowered.com/app/38130/Farm_Frenzy_2/",
    description:
      "The sequel. Grow grass, feed chickens and sell eggs, then buy new workshops that turn your goods into steaks, cakes and clothes. Guard dogs help keep the bears off your farm.",
    platform: "Steam",
  },
  {
    title: "Весёлая ферма 3",
    image: "images/farm-frenzy-3.jpg",
    url: "https://store.steampowered.com/app/38150/Farm_Frenzy_3/",
    description:
      "The third game. Help Scarlett win votes to become president of the farmers' union by running five farms around the world, from breeding penguins to making jewellery. 95 levels, 30 animals and 33 products to make.",
    platform: "Steam",
  },
  {
    title: "Ice Age 2: The Meltdown",
    image: "images/ice-age-2.jpg",
    url: "https://en.wikipedia.org/wiki/Ice_Age_2:_The_Meltdown_(video_game)",
    description:
      "Eurocom's 3D platformer based on the 2006 movie. You play mostly as Scrat, chasing acorns through the melting valley, with bonus stages where you take over as Manny, Sid or Diego.",
    platform: "PC",
  },
  {
    title: "Ice Age: Dawn of the Dinosaurs",
    image: "images/ice-age-3.jpg",
    url: "https://en.wikipedia.org/wiki/Ice_Age:_Dawn_of_the_Dinosaurs_(video_game)",
    description:
      "The 2009 follow-up from Eurocom, based on the third movie. Switch between Manny, Sid, Diego, Buck, Scrat and Scratte to outrun dinosaurs, roll eggs to safety and explore the jungle world under the ice.",
    platform: "PC",
  },
  {
    title: "Ice Age: Scrat's Nutty Adventure",
    image: "images/ice-age-scrat.jpg",
    url: "https://store.steampowered.com/app/751060/Ice_Age_Scrats_Nutty_Adventure/",
    description:
      "A 2019 3D platformer starring just Scrat. An ancient temple locks away his prized possession, and he has to find four Crystal Nuts to get it back, hopping across icicles, geysers and lava through classic Ice Age places.",
    platform: "Steam",
  },
  {
    title: "Алекс Гордон",
    image: "images/alex-gordon.jpg",
    url: "https://funplayland.ru/games/arkady/alex-gordon/",
    description:
      "Alawar's 2008 platformer. Alex the cat and his sister Alice go treasure hunting on a tropical island, but a cursed amulet loses its stones and Alice gets captured. Run and jump to each level's finish arch, grab coins and stomp the guards.",
    platform: "PC",
  },
  {
    title: "Супер Корова",
    image: "images/supercow.jpg",
    url: "https://store.steampowered.com/app/1883570/Supercow/",
    description:
      "Nevosoft's 2007 platformer. The evil Professor Duriarti escapes from prison, seizes the farm in Sunny Valley and turns its animals into monsters, so Supercow flies in to rescue them across 47 levels.",
    platform: "Steam",
  },
  {
    title: "Gromada",
    image: "images/gromada.jpg",
    url: "https://www.old-games.ru/game/7948.html",
    description:
      "Buka's 1999 top-down tank shooter, released in the West by Bethesda in 2000. A scientist drives his prototype tank Cassandra across the alien planet Gromada, alone against whole armies, swapping between wheels, tracks and hover drive and four weapon slots.",
    platform: "PC",
  },
  {
    title: "Ферма Айрис",
    image: "images/ferma-ayris.jpg",
    url: "https://funplayland.ru/games/biznes/magic-farm/",
    description:
      "Meridian'93's flower-farm time manager, known in English as Magic Farm. Iris grows flowers, makes bouquets and sells them to pay her way across the land in search of her missing parents, with Robin the dragon helping to water plants and chase off pests.",
    platform: "PC",
  },
  {
    title: "Чудо Ферма",
    image: "images/chudo-ferma.jpg",
    url: "https://www.nevosoft.ru/game-Virtual-Farm/platform-pc",
    description:
      "A farm game from Nevosoft. Turn a plain vegetable patch into a thriving farm: grow and sell vegetables, fruit and flowers, make butter, thread and wool, and sign supply contracts with shops and diners, but deliver on time or pay a fine.",
    platform: "PC",
  },
  {
    title: "Натали Брукс. Тайна наследства",
    image: "images/natalie-brooks.jpg",
    url: "https://www.nevosoft.ru/game-Natalie-Brooks/platform-pc",
    description:
      "A hidden-object detective quest. Natalie Brooks inherits her grandmother's grand mansion, then learns it's about to be torn down for a highway. To save it she investigates the mansion, the lawyer's office, the police station and more, solving puzzles and finding clues.",
    platform: "PC",
  },
  {
    title: "Туртикс",
    image: "images/turtix-1.jpg",
    url: "https://www.nevosoft.ru/game-Turtix/platform-pc",
    description:
      "The first Turtix platformer. Dark magic shatters the Diamond Amulet that protected the turtles, and the escaped monsters capture almost all of them. Help Turtix free his kin across five worlds, jumping on guards and kicking them off the level, while the wise Shaman teaches him new magic.",
    platform: "PC",
  },
  {
    title: "Туртикс. Спасательная экспедиция",
    image: "images/turtix.jpg",
    url: "https://www.nevosoft.ru/game-Turtix-Rescue-Adventure/platform-pc",
    description:
      "The second Turtix platformer. The little turtle sets out again to free his captured kin through forests, caves and deserts. Jump on enemies' heads to knock them off the level, guide the rescued turtles safely to the teleport and beat a boss at the end of each stage.",
    platform: "PC",
  },
  {
    title: "Луксор",
    image: "images/luxor.jpg",
    url: "https://www.nevosoft.ru/game-Luxor/platform-pc",
    description:
      "MumboJumbo's classic Egyptian ball shooter. Slide your winged launcher along the bottom and fire coloured balls to break up the chain rolling through the maze before it reaches the pyramid. The balls speed up as you go, with power-ups to help, across 88 levels.",
    platform: "PC",
  },
  {
    title: "Тайны Города N",
    image: "images/secrets-of-town-n.jpg",
    url: "https://www.nevosoft.ru/game-Secrets-of-Town-N/platform-pc",
    description:
      "A hidden-object adventure. You're a reporter in a small town full of surprises, and a simple story turns into an investigation of the Black Lotus and its ancient prophecy. Question odd locals for clues, search 21 cluttered locations and solve puzzles.",
    platform: "PC",
  },
  {
    title: "Тайны Города N. Часть вторая",
    image: "images/secrets-of-town-n-2.jpg",
    url: "https://www.nevosoft.ru/game-Secrets-Of-Town-N-2/platform-pc",
    description:
      "The sequel. Reporter Laura Winner returns to Town N at the invitation of her old friend Bill Witowski, only to find he has vanished just as the new priest is about to auction off art and jewellery. Search the town's rooms for clues and find out whether the two are connected.",
    platform: "PC",
  },
  {
    title: "Съедобная планета",
    image: "images/tasty-planet.jpg",
    url: "https://www.nevosoft.ru/game-Tasty-Planet/platform-pc",
    description:
      "Dingo Games' Tasty Planet. A lab experiment creates a tiny ball of grey goo that can eat anything smaller than itself, and the more it eats, the bigger it gets: pills and test tubes first, then cars and buildings, and eventually the whole planet. Casual, expert and two-player modes.",
    platform: "PC",
  },
  {
    title: "Эвокрафт",
    image: "images/evocraft.jpg",
    url: "https://www.nevosoft.ru/game-Evocraft/platform-pc",
    description:
      "Nevosoft's casual medieval conquest strategy, known in English as Landgrabbers and winner of KRI's 2011 best casual game award. Send your troops to capture enemy castles and the land around them across 45 levels, from forests and deserts to snow and even the Moon.",
    platform: "PC",
  },
  {
    title: "Feeding Frenzy",
    image: "images/feeding-frenzy.jpg",
    url: "https://en.wikipedia.org/wiki/Feeding_Frenzy_(video_game)",
    description:
      "Sprout Games' 2004 underwater arcade game, published by PopCap. Eat smaller fish to grow big enough to eat bigger ones, chain quick bites into a Feeding Frenzy for bonus points, and dodge sharks, mines and jellyfish across 40 levels as five different sea creatures.",
    platform: "PC",
  },
  {
    title: "Путя Спасает Мир",
    image: "images/putya.jpg",
    url: "https://www.nevosoft.ru/game-Putya/platform-pc",
    description:
      "Nevosoft's tongue-in-cheek arcade puzzler. Aliens invade the peaceful green land of Putya the dinosaur, trampling crops and putting up laser towers everywhere, so he fights back with martial arts and magic bombs. Plays like a mix of Pac-Man, Bomberman and Sokoban.",
    platform: "PC",
  },
  {
    title: "Папины дочки",
    image: "images/papiny-dochki.jpg",
    url: "https://stopgame.ru/game/papiny_dochki",
    description:
      "HeroCraft's 2009 hidden-object game based on the TV sitcom, published by Alawar. The Vasnetsov household is in chaos: dad oversleeps, Pugovka is late for kindergarten and everyone needs help. Five chapters, one per daughter: find items, combine them and solve puzzles.",
    platform: "PC",
  },
  {
    title: "Мастер Бургер",
    image: "images/master-burger.jpg",
    url: "https://www.doublegames.ru/stand-o-food.html",
    description:
      "Shape Games' 2008 burger-bar rush, known in English as Stand O'Food. Customers queue up with orders, and you stack the right buns, patties and toppings fast before they get angry, then spend your earnings on new sauces and kitchen gear.",
    platform: "PC",
  },
  {
    title: "Кошмарные детки",
    image: "images/koshmarnye-detki.jpg",
    url: "https://www.nevosoft.ru/game-Daycare-Nightmare/platform-pc",
    description:
      "Daycare Nightmare, a 2008 monster-babysitting game. Molly finds out her neighbours are monsters and becomes their nanny, keeping little vampires, dragons, ghosts and cyclopes fed, entertained and from biting each other. Earn tips to buy better gear across seven episodes.",
    platform: "PC",
  },
  {
    title: "Букашечная схватка",
    image: "images/bukashechnaya-shvatka.jpg",
    url: "https://dist.1c.ru/news/novinki_pc_prostye_igry_vypusk_17_bukashechnaya_skhvatka_arkada_1649/",
    description:
      "Alawar's 2006 bug shooter, known in English as Feelers. Ants have stolen the dragonfly queen's eggs, so you fight through ants, killer bees, beetles, gnats and spiders to get them back, while dragonflies drop new weapons like ice bombs, homing rockets and a super-cannon.",
    platform: "PC",
  },
  {
    title: "Армада танков",
    image: "images/armada-tankov.jpg",
    url: "https://www.enkord.com/game/armada-tanks/info/",
    description:
      "Enkord's 2007 top-down tank arcade, published by Alawar as Armada Tanks. Defend your base against waves of enemy tanks, grab power-ups from supply drops and upgrade your tank between battles: 6 weapons, 24 upgrades and over 60 levels with boss fights.",
    platform: "PC",
  },
  {
    title: "Танчики",
    image: "images/tanchiki.jpg",
    url: "https://igrowiki.fandom.com/ru/wiki/%D0%A2%D0%B0%D0%BD%D1%87%D0%B8%D0%BA%D0%B8",
    description:
      "Exclusive Games' 2004 remake of Battle City, published by Buka, known in English as Tank-O-Box. Destroy every enemy tank on the map, guard your HQ and blow up enemy factories and bunkers, alone or with a friend on one PC. Extra mode gives you 99 lives against swarms of tanks.",
    platform: "PC",
  },
  {
    title: "АвиаНалет",
    image: "images/air-strike.jpg",
    url: "https://www.nevosoft.ru/game-Air-Strike/platform-pc",
    description:
      "DivoGames' 3D helicopter shooter, AirStrike 3D in English. Pick one of 10 helicopters and blast your way through 20 levels across 5 kinds of terrain, against more than 100 types of enemy vehicles and 3 huge bosses.",
    platform: "PC",
  },
  {
    title: "АвиаНалет 2",
    image: "images/air-strike-2.jpg",
    url: "https://www.nevosoft.ru/game-AirStrike-2/platform-pc",
    description:
      "The sequel. Fly a new gunship to wipe out secret terrorist bases and weapons factories around the world, upgrade your guns and rockets, grab bonuses, and earn stars from the toughest enemies to rise through the ranks.",
    platform: "PC",
  },
  {
    title: "АвиаНалет 3",
    image: "images/air-strike-3.jpg",
    url: "https://www.nevosoft.ru/game-Air-Strike-3/platform-pc",
    description:
      "AirStrike 3D: Gulf Thunder. Terrorists are massing in Iraq, and a recon flight turns into a full assault: take your heavily armoured gunship against tanks, jeeps, boats and helicopters, and level as many enemy bases as you can.",
    platform: "PC",
  },
  {
    title: "Kung Fu Panda",
    image: "images/kung-fu-panda.jpg",
    url: "https://en.wikipedia.org/wiki/Kung_Fu_Panda_(video_game)",
    description:
      "Activision's 2008 game of the DreamWorks movie, with the PC version by Beenox. Fight and jump your way through the story as Po, then unlock Master Shifu and the Furious Five, each with their own fighting style. Tightropes and balance challenges, plus a multiplayer mode.",
    platform: "PC",
  },
  {
    title: "Черепашки Ниндзя",
    image: "images/tmnt-2007.jpg",
    url: "https://en.wikipedia.org/wiki/TMNT_(video_game)",
    description:
      "Ubisoft's 2007 TMNT, based on the CGI movie. Leonardo, Raphael, Donatello and Michelangelo each have their own fighting style, and you switch between them to wall-run and leap across New York rooftops Prince of Persia-style, then brawl through Foot ninjas and stone generals. 16 story levels plus 16 challenges.",
    platform: "PC",
  },
  {
    title: "Killer Bean Unleashed",
    image: "images/killer-bean-unleashed.jpg",
    url: "https://play.google.com/store/apps/details?id=com.KillerBeanStudios.KillerBeanUnleashed",
    description:
      "The original Killer Bean game, Jeff Lew's 2012 side-scrolling shooter for phones. Play as Killer Bean and gun down Major Firepower's bad beans across story levels, mega levels, a pixel-art level, the Underground and the Dungeon. Free, with ads.",
    platform: "Mobile (Android, iOS)",
  },
  {
    title: "Purble Place",
    image: "images/purble-place.jpg",
    url: "https://en.wikipedia.org/wiki/Purble_Place",
    description:
      "The kids' game that came with Windows Vista and Windows 7, made by Oberon Media for Microsoft in 2007. Three mini-games: Purble Pairs (memory matching), Comfy Cakes (build cakes to order on a conveyor belt) and Purble Shop (guess the hidden colours, Mastermind-style).",
    platform: "PC",
  },
  {
    title: "Суперсемейка",
    image: "images/incredibles.jpg",
    url: "https://ru.wikipedia.org/wiki/The_Incredibles_(игра)",
    description:
      "The first Incredibles game, made by Heavy Iron Studios for THQ in 2004 from Pixar's film. Each level hands you a different member of the family: Mr. Incredible brawls and smashes, Elastigirl stretches and swings, Violet sneaks past guards while invisible, and Dash races against the clock. Music by Michael Giacchino, who scored the film.",
    platform: "PC",
  },
  {
    title: "Суперсемейка: Подземная битва",
    image: "images/incredibles-underminer.jpg",
    url: "https://ru.wikipedia.org/wiki/The_Incredibles:_Rise_of_the_Underminer",
    description:
      "The Incredibles: Rise of the Underminer, the 2005 sequel that starts where the film ends: the Underminer drills up into the city, and Mr. Incredible and Frozone chase him underground through his army of robots. Mr. Incredible punches, lifts and throws, Frozone freezes. Swap between them on the fly, or play the whole game in two-player co-op.",
    platform: "PC",
  },
];
