/*
 * Curated, pinned trivia per country.
 *
 * Key   = ISO 3166-1 numeric code (same as the world-atlas feature id).
 * Fact fields
 *   title     short headline shown on the pin tooltip and the card
 *   year      year (or era) the fact refers to - shown as a badge
 *   cat       nature | history | culture | record | science
 *   lat, lon  where the pin goes on the zoomed-in map
 *   text      the trivia itself (keep it to 2-3 sentences)
 *   wiki      English Wikipedia article title - used for the photo, the
 *             "read more" link and by tools/verify-sources.py
 *   sources   extra references ({label, url}); Wikipedia is added automatically
 *
 * Run `python tools/verify-sources.py` after editing to check every link and
 * that each pin sits near the article's coordinates.
 */
window.TRIVIA = {
  /* ───────────── Philippines ───────────── */
  "608": [
    {
      title: "The Chocolate Hills of Bohol", year: "1988", cat: "nature",
      lat: 9.83, lon: 124.14, wiki: "Chocolate Hills",
      text: "At least 1,260 (and possibly as many as 1,776) grass-covered limestone mounds spread over more than 50 km² of Bohol. The grass turns brown in the dry season, giving them their name. In 1988 they were declared the country's third National Geological Monument."
    },
    {
      title: "Tubbataha Reefs Natural Park", year: "1993", cat: "nature",
      lat: 8.95, lon: 119.87, wiki: "Tubbataha Reef",
      text: "Two remote coral atolls in the middle of the Sulu Sea, inscribed as a UNESCO World Heritage Site in 1993. The park can only be reached by liveaboard dive boats during a short season from roughly March to June.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/653" }]
    },
    {
      title: "A river that runs underground", year: "1999", cat: "nature",
      lat: 10.17, lon: 118.92, wiki: "Puerto Princesa Subterranean River National Park",
      text: "In Palawan, a river runs for about 8 km through a limestone cave before it reaches the sea. It became a UNESCO World Heritage Site in 1999 and was later named one of the New 7 Wonders of Nature.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/652" }]
    },
    {
      title: "Rice Terraces of the Cordilleras", year: "1995", cat: "culture",
      lat: 16.93, lon: 121.06, wiki: "Rice Terraces of the Philippine Cordilleras",
      text: "The Ifugao rice terraces climb the mountainsides of northern Luzon and are still watered by an ancient system of forest-fed channels. In 1995 they were among the first sites added to UNESCO's World Heritage List in its new 'cultural landscape' category.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/722" }]
    },
    {
      title: "Mayon's near-perfect cone", year: "Today", cat: "nature",
      lat: 13.257, lon: 123.685, wiki: "Mayon",
      text: "Mayon in Albay is known for its almost perfectly symmetrical cone and is the most active volcano in the Philippines. It rises about 2,460 m above the Bicol plains."
    },
    {
      title: "Historic Town of Vigan", year: "1999", cat: "history",
      lat: 17.575, lon: 120.387, wiki: "Vigan",
      text: "UNESCO describes Vigan as the most intact example in Asia of a planned Spanish colonial town. Its cobblestone streets and stone houses blend Philippine, Chinese and European architecture.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/502" }]
    },
    {
      title: "7,641 islands, not 7,107", year: "2016", cat: "record",
      lat: 14.5995, lon: 120.9842, wiki: "List of islands of the Philippines",
      text: "For decades, schoolbooks said the Philippines had 7,107 islands. In 2016 the national mapping agency (NAMRIA) updated the count to 7,641 after new mapping surveys."
    },
    {
      title: "Mount Apo, the roof of the Philippines", year: "Today", cat: "nature",
      lat: 6.987, lon: 125.271, wiki: "Mount Apo",
      text: "Mount Apo, a dormant volcano in Mindanao, is the highest mountain in the Philippines at about 2,954 m. It is home to the critically endangered Philippine eagle."
    }
  ],

  /* ───────────── Japan ───────────── */
  "392": [
    {
      title: "Mount Fuji", year: "2013", cat: "culture",
      lat: 35.3606, lon: 138.7274, wiki: "Mount Fuji",
      text: "At 3,776 m, Fuji is Japan's highest mountain. It was inscribed on the World Heritage List in 2013 as a cultural site, 'place of worship and source of artistic inspiration', rather than as a natural site.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1418" }]
    },
    {
      title: "Himeji Castle, the White Heron", year: "1993", cat: "history",
      lat: 34.8394, lon: 134.6939, wiki: "Himeji Castle",
      text: "Japan's largest and best-preserved feudal castle. It is nicknamed 'White Heron Castle' for its brilliant white walls. In 1993 it was among the first sites in Japan inscribed on the World Heritage List.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/661" }]
    },
    {
      title: "Hiroshima Peace Memorial", year: "1945", cat: "history",
      lat: 34.3955, lon: 132.4536, wiki: "Hiroshima Peace Memorial",
      text: "The Genbaku Dome was one of the few structures left standing near the hypocentre of the atomic bomb dropped on 6 August 1945. It was preserved as it stood and became a World Heritage Site in 1996.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/775" }]
    },
    {
      title: "The first bullet train", year: "1964", cat: "science",
      lat: 35.6812, lon: 139.7671, wiki: "Tōkaidō Shinkansen",
      text: "The Tōkaidō Shinkansen between Tokyo and Osaka opened on 1 October 1964, just before the Tokyo Olympics. It was the world's first high-speed rail line."
    },
    {
      title: "Ancient Kyoto", year: "1994", cat: "culture",
      lat: 34.9671, lon: 135.7727, wiki: "Historic Monuments of Ancient Kyoto (Kyoto, Uji and Otsu Cities)",
      text: "Kyoto was Japan's imperial capital for over a thousand years. Seventeen of its temples, shrines and castles, including Kiyomizu-dera and Kinkaku-ji, are protected together as one World Heritage Site.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/688" }]
    }
  ],

  /* ───────────── Egypt ───────────── */
  "818": [
    {
      title: "The Great Pyramid of Giza", year: "c. 2560 BC", cat: "record",
      lat: 29.9792, lon: 31.1342, wiki: "Great Pyramid of Giza",
      text: "Built for the pharaoh Khufu, the Great Pyramid was the tallest human-made structure in the world for more than 3,800 years. It is the oldest of the Seven Wonders of the Ancient World and the only one still largely intact.",
      sources: [{ label: "UNESCO - Memphis and its Necropolis", url: "https://whc.unesco.org/en/list/86" }]
    },
    {
      title: "Abu Simbel was moved", year: "1964–1968", cat: "history",
      lat: 22.3372, lon: 31.6258, wiki: "Abu Simbel",
      text: "To save the temples of Ramesses II from the rising waters of the Aswan High Dam, the temples were cut into huge blocks and rebuilt about 65 m higher. The UNESCO-led rescue campaign later inspired the creation of the World Heritage Convention."
    },
    {
      title: "The Suez Canal opens", year: "1869", cat: "history",
      lat: 30.5852, lon: 32.2654, wiki: "Suez Canal",
      text: "Opened in November 1869, the canal links the Mediterranean and the Red Sea. It lets ships sail between Europe and Asia without going around Africa."
    },
    {
      title: "The Rosetta Stone is found", year: "1799", cat: "science",
      lat: 31.4044, lon: 30.4164, wiki: "Rosetta Stone",
      text: "French soldiers found it near the town of Rashid (Rosetta) in 1799. Because it carries the same decree in hieroglyphic, Demotic and Ancient Greek, it was key to deciphering Egyptian hieroglyphs."
    }
  ],

  /* ───────────── Peru ───────────── */
  "604": [
    {
      title: "Machu Picchu", year: "15th century", cat: "history",
      lat: -13.1631, lon: -72.545, wiki: "Machu Picchu",
      text: "This Inca citadel was built in the 15th century on a ridge 2,430 m above sea level. It became widely known internationally after Hiram Bingham's 1911 expedition, and it has been a World Heritage Site since 1983.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/274" }]
    },
    {
      title: "The Nazca Lines", year: "1994", cat: "culture",
      lat: -14.739, lon: -75.13, wiki: "Nazca Lines",
      text: "Hundreds of giant figures, including a hummingbird, a monkey and a spider, were scratched into the desert floor about 2,000 years ago. Many can only be appreciated from the air.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/700" }]
    },
    {
      title: "Lake Titicaca", year: "Today", cat: "nature",
      lat: -15.9254, lon: -69.3354, wiki: "Lake Titicaca",
      text: "Shared with Bolivia and sitting about 3,810 m above sea level, Titicaca is often called the highest navigable lake in the world. The Uros people live on floating islands made of totora reeds."
    }
  ],

  /* ───────────── China ───────────── */
  "156": [
    {
      title: "The Terracotta Army is discovered", year: "1974", cat: "history",
      lat: 34.3841, lon: 109.2785, wiki: "Terracotta Army",
      text: "In 1974, farmers digging a well near Xi'an found pieces of clay soldiers. They had discovered an army of thousands of life-size figures buried with Qin Shi Huang, the first emperor of China, around 210 BC."
    },
    {
      title: "The Great Wall", year: "1987", cat: "history",
      lat: 40.4319, lon: 116.5704, wiki: "Great Wall of China",
      text: "The Great Wall is really a series of walls built and rebuilt over some 2,000 years, and it stretches thousands of kilometres across northern China. It was inscribed as a World Heritage Site in 1987.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/438" }]
    },
    {
      title: "The Forbidden City", year: "1420", cat: "culture",
      lat: 39.9163, lon: 116.3972, wiki: "Forbidden City",
      text: "Completed in 1420, Beijing's imperial palace was home to 24 Ming and Qing emperors. It is now the Palace Museum and one of the most visited museums in the world."
    },
    {
      title: "Three Gorges Dam", year: "2012", cat: "record",
      lat: 30.8233, lon: 111.0036, wiki: "Three Gorges Dam",
      text: "This dam on the Yangtze River has been fully operational since 2012. It is the world's largest power station by installed capacity, at about 22.5 gigawatts."
    }
  ],

  /* ───────────── India ───────────── */
  "356": [
    {
      title: "The Taj Mahal", year: "1632–1653", cat: "culture",
      lat: 27.1751, lon: 78.0421, wiki: "Taj Mahal",
      text: "Mughal emperor Shah Jahan commissioned this white-marble mausoleum in Agra for his wife Mumtaz Mahal. It was inscribed as a UNESCO World Heritage Site in 1983.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/252" }]
    },
    {
      title: "One of the wettest places on Earth", year: "Today", cat: "record",
      lat: 25.2973, lon: 91.5826, wiki: "Mawsynram",
      text: "The village of Mawsynram in Meghalaya is often cited as the wettest inhabited place on Earth. It gets close to 12,000 mm of rain a year on average, most of it during the monsoon."
    },
    {
      title: "Landing near the Moon's south pole", year: "2023", cat: "science",
      lat: 13.7199, lon: 80.2304, wiki: "Chandrayaan-3",
      text: "Launched from the Satish Dhawan Space Centre at Sriharikota, Chandrayaan-3 landed on 23 August 2023. India became the first country to soft-land a spacecraft near the Moon's south pole."
    }
  ],

  /* ───────────── Italy ───────────── */
  "380": [
    {
      title: "The Colosseum opens", year: "80 AD", cat: "history",
      lat: 41.8902, lon: 12.4922, wiki: "Colosseum",
      text: "Completed under Emperor Titus in 80 AD, the Colosseum is the largest ancient amphitheatre ever built. It is estimated to have held between 50,000 and 80,000 spectators."
    },
    {
      title: "Pompeii, frozen in time", year: "79 AD", cat: "history",
      lat: 40.7489, lon: 14.4848, wiki: "Pompeii",
      text: "The eruption of Mount Vesuvius in 79 AD buried the Roman city of Pompeii under metres of ash. This preserved streets, homes and frescoes, which archaeologists are still uncovering today.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/829" }]
    },
    {
      title: "The Leaning Tower of Pisa", year: "1173", cat: "record",
      lat: 43.723, lon: 10.3966, wiki: "Leaning Tower of Pisa",
      text: "Construction started in 1173, and the tower began to lean once the work reached the second floor because the soil underneath was soft. Engineers reduced the tilt between 1990 and 2001 to keep it from falling."
    },
    {
      title: "Venice, a city on islands", year: "1987", cat: "culture",
      lat: 45.4408, lon: 12.3155, wiki: "Venice",
      text: "Venice is built on more than 100 small islands in a lagoon, linked by canals and around 400 bridges. The city and its lagoon became a World Heritage Site in 1987.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/394" }]
    }
  ],

  /* ───────────── Australia ───────────── */
  "036": [
    {
      title: "The Great Barrier Reef", year: "1981", cat: "nature",
      lat: -18.2871, lon: 147.6992, wiki: "Great Barrier Reef",
      text: "The world's largest coral reef system has more than 2,900 individual reefs and stretches over 2,300 km along Queensland. It became a World Heritage Site in 1981.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/154" }]
    },
    {
      title: "Uluru closed to climbers", year: "2019", cat: "culture",
      lat: -25.3444, lon: 131.0369, wiki: "Uluru",
      text: "Uluru is sacred to the Aṉangu people and rises about 348 m above the surrounding desert. Out of respect for its traditional owners, climbing it was permanently banned from 26 October 2019."
    },
    {
      title: "Sydney Opera House", year: "1973", cat: "culture",
      lat: -33.8568, lon: 151.2153, wiki: "Sydney Opera House",
      text: "Designed by Danish architect Jørn Utzon, the Opera House opened in 1973. In 2007 it became one of the youngest buildings ever inscribed as a World Heritage Site.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/166" }]
    }
  ],

  /* ───────────── Brazil ───────────── */
  "076": [
    {
      title: "Christ the Redeemer", year: "1931", cat: "culture",
      lat: -22.9519, lon: -43.2105, wiki: "Christ the Redeemer (statue)",
      text: "This Art Deco statue stands on top of Corcovado mountain above Rio de Janeiro. It was completed in 1931, is 30 m tall not counting its pedestal, and was named one of the New 7 Wonders of the World in 2007."
    },
    {
      title: "Iguaçu Falls", year: "1986", cat: "nature",
      lat: -25.6953, lon: -54.4367, wiki: "Iguazu Falls",
      text: "Shared with Argentina, Iguaçu is one of the largest waterfall systems on Earth, with hundreds of separate cascades. Brazil's Iguaçu National Park was inscribed as a World Heritage Site in 1986.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/355" }]
    },
    {
      title: "A capital built from scratch", year: "1960", cat: "history",
      lat: -15.7939, lon: -47.8828, wiki: "Brasília",
      text: "Brasília was planned by Lúcio Costa and Oscar Niemeyer and built in only about 41 months. It was inaugurated on 21 April 1960, when the capital moved from Rio de Janeiro."
    },
    {
      title: "The Amazon rainforest", year: "Today", cat: "nature",
      lat: -3.4653, lon: -62.2159, wiki: "Amazon rainforest",
      text: "The Amazon is the largest tropical rainforest on Earth, and about 60% of it lies in Brazil. It holds an extraordinary share of the planet's known plant and animal species."
    }
  ],

  /* ───────────── Mexico ───────────── */
  "484": [
    {
      title: "Chichén Itzá", year: "2007", cat: "history",
      lat: 20.6843, lon: -88.5678, wiki: "Chichen Itza",
      text: "This large pre-Columbian Maya city is dominated by the stepped pyramid El Castillo. At the equinoxes, shadows form a serpent that seems to slide down its staircase. It was named one of the New 7 Wonders of the World in 2007.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/483" }]
    },
    {
      title: "The crater that ended the dinosaurs", year: "66 million years ago", cat: "science",
      lat: 21.4, lon: -89.5167, wiki: "Chicxulub crater",
      text: "Buried beneath the Yucatán Peninsula is a crater about 180 km wide. It is linked to the asteroid impact that caused the mass extinction of the non-avian dinosaurs."
    },
    {
      title: "Teotihuacan", year: "1987", cat: "history",
      lat: 19.6925, lon: -98.8438, wiki: "Teotihuacan",
      text: "At its height, around the first half of the 1st millennium AD, Teotihuacan was one of the largest cities in the world. Its Pyramid of the Sun is one of the largest pyramids in Mesoamerica.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/414" }]
    }
  ],

  /* ───────────── United States ───────────── */
  "840": [
    {
      title: "The world's first national park", year: "1872", cat: "nature",
      lat: 44.428, lon: -110.5885, wiki: "Yellowstone National Park",
      text: "Yellowstone became the world's first national park on 1 March 1872. It holds about half of the world's active geysers, including Old Faithful."
    },
    {
      title: "Statue of Liberty", year: "1886", cat: "history",
      lat: 40.6892, lon: -74.0445, wiki: "Statue of Liberty",
      text: "France gave the statue to the United States as a gift, and it was dedicated on 28 October 1886. Gustave Eiffel engineered its internal iron framework.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/307" }]
    },
    {
      title: "Apollo 11 lifts off", year: "1969", cat: "science",
      lat: 28.6084, lon: -80.6043, wiki: "Apollo 11",
      text: "On 16 July 1969, Apollo 11 launched from Kennedy Space Center in Florida. Four days later, Neil Armstrong and Buzz Aldrin became the first people to walk on the Moon."
    },
    {
      title: "The Grand Canyon", year: "1979", cat: "nature",
      lat: 36.1069, lon: -112.1129, wiki: "Grand Canyon",
      text: "Carved by the Colorado River, the canyon is about 446 km long and more than 1.8 km deep in places. Its exposed rock layers record nearly two billion years of geological history.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/75" }]
    }
  ],

  /* ───────────── France ───────────── */
  "250": [
    {
      title: "The Eiffel Tower", year: "1889", cat: "record",
      lat: 48.8584, lon: 2.2945, wiki: "Eiffel Tower",
      text: "Built for the 1889 World's Fair, the tower was criticised by many artists at first. It was the tallest human-made structure in the world until the Chrysler Building was completed in 1930."
    },
    {
      title: "Lascaux cave paintings", year: "1940", cat: "history",
      lat: 45.0544, lon: 1.1683, wiki: "Lascaux",
      text: "In 1940, four teenagers stumbled on a cave in the Dordogne covered in Paleolithic paintings of horses, deer and aurochs. The paintings are around 17,000 years old."
    },
    {
      title: "Mont-Saint-Michel", year: "1979", cat: "culture",
      lat: 48.636, lon: -1.5115, wiki: "Mont-Saint-Michel",
      text: "This tidal island crowned by a medieval abbey sits in a bay with some of the strongest tides in Europe. It became a World Heritage Site in 1979.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/80" }]
    }
  ],

  /* ───────────── United Kingdom ───────────── */
  "826": [
    {
      title: "Stonehenge", year: "c. 3000–2000 BC", cat: "history",
      lat: 51.1789, lon: -1.8262, wiki: "Stonehenge",
      text: "This prehistoric monument was built in several stages over roughly a thousand years. Its stones line up with the sunrise at the summer solstice. It was inscribed as a World Heritage Site in 1986.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/373" }]
    },
    {
      title: "Where east meets west", year: "1884", cat: "science",
      lat: 51.4779, lon: -0.0015, wiki: "Royal Observatory, Greenwich",
      text: "At the 1884 International Meridian Conference, the meridian through the Royal Observatory in Greenwich was adopted as the world's prime meridian, longitude 0°."
    },
    {
      title: "Giant's Causeway", year: "1986", cat: "nature",
      lat: 55.2408, lon: -6.5116, wiki: "Giant's Causeway",
      text: "About 40,000 interlocking basalt columns, mostly hexagonal, formed when ancient lava cooled on the Northern Ireland coast. Legend says the giant Finn McCool built them.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/369" }]
    }
  ],

  /* ───────────── Greece ───────────── */
  "300": [
    {
      title: "The Parthenon", year: "438 BC", cat: "history",
      lat: 37.9715, lon: 23.7267, wiki: "Parthenon",
      text: "Dedicated to the goddess Athena, the Parthenon on the Acropolis of Athens was completed in 438 BC. It remains one of the great symbols of classical Greece and of democracy.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/404" }]
    },
    {
      title: "Birthplace of the Olympics", year: "776 BC", cat: "culture",
      lat: 37.6384, lon: 21.63, wiki: "Olympia, Greece",
      text: "By tradition, the ancient Olympic Games began at Olympia in 776 BC. The Olympic flame for every modern Games is still lit there."
    },
    {
      title: "The monasteries of Meteora", year: "1988", cat: "culture",
      lat: 39.7217, lon: 21.6306, wiki: "Meteora",
      text: "Monks began building monasteries on top of these sandstone pillars in the 14th century. For centuries, the only way up was by ladders or nets hauled up with ropes.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/455" }]
    }
  ],

  /* ───────────── Jordan ───────────── */
  "400": [
    {
      title: "Petra, the rose-red city", year: "1985", cat: "history",
      lat: 30.3285, lon: 35.4444, wiki: "Petra",
      text: "The Nabataeans carved Petra's tombs and temples straight into pink sandstone cliffs. It became a World Heritage Site in 1985 and was named one of the New 7 Wonders of the World in 2007.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/326" }]
    },
    {
      title: "The lowest land on Earth", year: "Today", cat: "record",
      lat: 31.559, lon: 35.4732, wiki: "Dead Sea",
      text: "The shores of the Dead Sea are the lowest land on Earth, more than 400 m below sea level. The water is so salty that swimmers float effortlessly."
    }
  ],

  /* ───────────── South Africa ───────────── */
  "710": [
    {
      title: "Robben Island", year: "1999", cat: "history",
      lat: -33.8076, lon: 18.3712, wiki: "Robben Island",
      text: "Nelson Mandela spent 18 of his 27 years in prison on Robben Island. The island became a World Heritage Site in 1999 as a symbol of the triumph of democracy over oppression.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/916" }]
    },
    {
      title: "The first human heart transplant", year: "1967", cat: "science",
      lat: -33.9416, lon: 18.4625, wiki: "Groote Schuur Hospital",
      text: "On 3 December 1967, surgeon Christiaan Barnard performed the world's first human-to-human heart transplant at Groote Schuur Hospital in Cape Town."
    },
    {
      title: "Cradle of Humankind", year: "1999", cat: "science",
      lat: -25.9242, lon: 27.7564, wiki: "Cradle of Humankind",
      text: "The limestone caves near Johannesburg have produced some of the world's most important hominin fossils, including 'Mrs. Ples' and 'Little Foot'."
    }
  ],

  /* ───────────── Cambodia ───────────── */
  "116": [
    {
      title: "Angkor Wat", year: "12th century", cat: "record",
      lat: 13.4125, lon: 103.867, wiki: "Angkor Wat",
      text: "Built in the early 12th century, Angkor Wat is the largest religious monument in the world by land area. It is so central to the national identity that it appears on Cambodia's flag.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/668" }]
    }
  ],

  /* ───────────── Iceland ───────────── */
  "352": [
    {
      title: "One of the oldest parliaments", year: "930 AD", cat: "history",
      lat: 64.2559, lon: -21.13, wiki: "Þingvellir",
      text: "The Althing, Iceland's parliament, was founded at Þingvellir in 930 AD. Þingvellir also lies in a rift valley where the North American and Eurasian plates pull apart.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1152" }]
    },
    {
      title: "Eyjafjallajökull grounds Europe", year: "2010", cat: "science",
      lat: 63.6314, lon: -19.6083, wiki: "2010 eruptions of Eyjafjallajökull",
      text: "In April 2010, the ash cloud from this glacier-capped volcano closed much of Europe's airspace for about a week. It was the biggest disruption to air travel since World War II at the time."
    }
  ],

  /* ───────────── Canada ───────────── */
  "124": [
    {
      title: "The highest tides in the world", year: "Today", cat: "record",
      lat: 45.3, lon: -64.95, wiki: "Bay of Fundy",
      text: "In the Bay of Fundy, the difference between high and low tide can reach about 16 m, the highest tidal range on Earth."
    },
    {
      title: "Banff, Canada's first national park", year: "1885", cat: "nature",
      lat: 51.4968, lon: -115.9281, wiki: "Banff National Park",
      text: "Banff began in 1885 as a small hot-springs reserve and is Canada's oldest national park. Today it is part of the Canadian Rocky Mountain Parks World Heritage Site.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/304" }]
    },
    {
      title: "CN Tower", year: "1976", cat: "record",
      lat: 43.6426, lon: -79.3871, wiki: "CN Tower",
      text: "At 553.3 m, Toronto's CN Tower was the world's tallest free-standing structure for 32 years after its completion in 1976."
    }
  ],

  /* ───────────── Indonesia ───────────── */
  "360": [
    {
      title: "Borobudur", year: "9th century", cat: "record",
      lat: -7.6079, lon: 110.2038, wiki: "Borobudur",
      text: "Built in the 9th century in Central Java, Borobudur is the largest Buddhist temple in the world. It has 504 Buddha statues and more than 2,600 relief panels.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/592" }]
    },
    {
      title: "Home of the Komodo dragon", year: "1991", cat: "nature",
      lat: -8.55, lon: 119.4833, wiki: "Komodo National Park",
      text: "Komodo National Park protects the Komodo dragon, the world's largest living lizard, which can grow to about 3 m long. The park became a World Heritage Site in 1991.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/609" }]
    },
    {
      title: "Krakatoa erupts", year: "1883", cat: "science",
      lat: -6.102, lon: 105.423, wiki: "1883 eruption of Krakatoa",
      text: "The 1883 eruption destroyed most of the island, and its explosions were heard thousands of kilometres away. The ash it threw into the atmosphere produced vivid red sunsets around the world."
    }
  ],

  /* ───────────── Vietnam ───────────── */
  "704": [
    {
      title: "Hạ Long Bay", year: "1994", cat: "nature",
      lat: 20.9101, lon: 107.1839, wiki: "Hạ Long Bay",
      text: "Around 1,600 limestone islands and islets rise from the emerald water of Hạ Long Bay. It was inscribed as a World Heritage Site in 1994.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/672" }]
    },
    {
      title: "Sơn Đoòng, the world's largest cave", year: "2009", cat: "record",
      lat: 17.4567, lon: 106.2875, wiki: "Sơn Đoòng cave",
      text: "A local man found its entrance in 1991, but it was only explored in 2009 by a British-Vietnamese team. Its main passage is large enough to hold a city block, and it has its own jungle and weather."
    }
  ],

  /* ───────────── Tanzania ───────────── */
  "834": [
    {
      title: "Kilimanjaro, the roof of Africa", year: "Today", cat: "nature",
      lat: -3.0674, lon: 37.3556, wiki: "Mount Kilimanjaro",
      text: "At about 5,895 m, Kilimanjaro is the highest mountain in Africa and the world's highest free-standing mountain.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/403" }]
    },
    {
      title: "The Great Migration", year: "Every year", cat: "nature",
      lat: -2.3333, lon: 34.8333, wiki: "Serengeti National Park",
      text: "Every year, more than a million wildebeest, along with zebras and gazelles, move in a great circle through the Serengeti and Kenya's Maasai Mara in search of fresh grazing.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/156" }]
    }
  ],

  /* ───────────── Norway ───────────── */
  "578": [
    {
      title: "The West Norwegian Fjords", year: "2005", cat: "nature",
      lat: 62.1015, lon: 7.0947, wiki: "Geirangerfjord",
      text: "Geirangerfjord and Nærøyfjord are among the longest and deepest fjords in the world. Both were carved by glaciers, and they were inscribed together as a World Heritage Site in 2005.",
      sources: [{ label: "UNESCO World Heritage Centre", url: "https://whc.unesco.org/en/list/1195" }]
    },
    {
      title: "The doomsday seed vault", year: "2008", cat: "science",
      lat: 78.2357, lon: 15.4913, wiki: "Svalbard Global Seed Vault",
      text: "The Svalbard Global Seed Vault opened in 2008 and is dug into an Arctic mountain on Svalbard. It stores backup copies of crop seeds from gene banks around the world."
    }
  ]
};
