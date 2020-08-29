const swisseph = require("swisseph");
var pathToSwisseph = require.resolve("swisseph/package.json").split("/");
pathToSwisseph.pop();
swisseph.swe_set_ephe_path(pathToSwisseph.join("/") + "/ephe");

module.exports.FLAG = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

module.exports.DICT = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mean_node: swisseph.SE_MEAN_NODE,
  true_node: swisseph.SE_TRUE_NODE,
  mean_apog: swisseph.SE_MEAN_APOG,
  oscu_apog: swisseph.SE_OSCU_APOG,
  chiron: swisseph.SE_CHIRON,
};

module.exports.RASHIS = {
  Ar: "aries",
  Ta: "taurus",
  Ge: "gemini",
  Cn: "cancer",
  Le: "leo",
  Vi: "virgo",
  Li: "libra",
  Sc: "scorpio",
  Sg: "sagittarius",
  Cp: "capricorn",
  Aq: "aquarius",
  Pi: "pisces",
};

const RASHI_REVERSE_MAP = {
  0: "Ar",
  1: "Ta",
  2: "Ge",
  3: "Cn",
  4: "Le",
  5: "Vi",
  6: "Li",
  7: "Sc",
  8: "Sg",
  9: "Cp",
  10: "Aq",
  11: "Pi",
};

const RASHI_MAP = {
  Ar: 0,
  Ta: 1,
  Ge: 2,
  Cn: 3,
  Le: 4,
  Vi: 5,
  Li: 6,
  Sc: 7,
  Sg: 8,
  Cp: 9,
  Aq: 10,
  Pi: 11,
};

module.exports.RASHI_MAP = RASHI_MAP;

const RASHI_ARRAY = [
  "Ar",
  "Ta",
  "Ge",
  "Cn",
  "Le",
  "Vi",
  "Li",
  "Sc",
  "Sg",
  "Cp",
  "Aq",
  "Pi",
];

module.exports.RASHI_ARRAY = RASHI_ARRAY;

module.exports.NAVAMSHA_GROUPS = {
  aries: "aries",
  taurus: "capricorn",
  gemini: "libra",
  cancer: "cancer",
  leo: "aries",
  virgo: "capricorn",
  libra: "libra",
  scorpio: "cancer",
  sagittarius: "aries",
  capricorn: "capricorn",
  aquarius: "libra",
  pisces: "cancer",
};

module.exports.REVERSE_RASHIS = {
  aries: "Ar",
  taurus: "Ta",
  gemini: "Ge",
  cancer: "Cn",
  leo: "Le",
  virgo: "Vi",
  libra: "Li",
  scorpio: "Sc",
  sagittarius: "Sg",
  capricorn: "Cp",
  aquarius: "Aq",
  pisces: "Pi",
};

/**
 *
 * @param {String} rashi Rashi name
 * @param {Number} num positive number to add to the rashi
 */
module.exports.rashi_calc = (rashi, num) => {
  return RASHI_ARRAY[(RASHI_MAP[rashi] + num) % RASHI_ARRAY.length];
};

module.exports.RASHI_LORDS = {
  aries: "Ma",
  taurus: "Ve",
  gemini: "Me",
  cancer: "Mo",
  leo: "Su",
  virgo: "Me",
  libra: "Ve",
  scorpio: "Ma",
  sagittarius: "Ju",
  capricorn: "Sa",
  aquarius: "Sa",
  pisces: "Ju",
};

module.exports.PLANET_RELATIONS = {
  Su: {
    friends: ["Su", "Mo", "Ma", "Ju"],
    neutral: ["Me"],
    enemies: ["Ve", "Sa"],
  },
  Mo: {
    friends: ["Mo", "Sun", "Me"],
    neutral: ["Ma", "Ju", "Ve", "Sa"],
    enemies: [],
  },
  Ma: {
    friends: ["Ma", "Su", "Mo", "Ju"],
    neutral: ["Ve", "Sa"],
    enemies: ["Me"],
  },
  Me: {
    friends: ["Me", "Su", "Ve"],
    neutral: ["Ma", "Ju", "Sa"],
    enemies: ["Mo"],
  },
  Ju: {
    friends: ["Ju", "Su", "Mo", "Ma"],
    neutral: ["Sa"],
    enemies: ["Me", "Ve"],
  },
  Ve: {
    friends: ["Ve", "Me", "Sa"],
    neutral: ["Ma", "Ju"],
    enemies: ["Su", "Mo"],
  },
  Sa: {
    friends: ["Sa", "Me", "Ve"],
    neutral: ["Ju"],
    enemies: ["Su", "Mo", "Ma"],
  },
};

module.exports.NAKSHATRA_ANIMALS = {
  Ashwini: "Horse",
  Bharani: "Elephant",
  Krittika: "Sheep",
  Rohini: "Serpent",
  Mrigashira: "Serpent",
  Ardra: "Dog",
  Punarvasu: "Cat",
  Pushya: "Sheep",
  Ashlesha: "Cat",
  Magha: "Rat",
  "Purva Phalguni": "Rat",
  "Uttara Phalguni": "Cow",
  Hasta: "Buffalo",
  Chitra: "Tiger",
  Swati: "Buffalo",
  Vishakha: "Tiger",
  Anuradha: "Hare",
  Jyestha: "Hare",
  Mula: "Dog",
  "Purva Aashada": "Monkey",
  "Uttara Aashada": "Mongoose",
  Shravana: "Monkey",
  Dhanishta: "Lion",
  Shatabhisha: "Horse",
  "Purva Bhadrapada": "Lion",
  "Uttara Bhadrapada": "Cow",
  Revati: "Elephant",
};

module.exports.NAKSHATRA_ANIMAL_SCORE = {
  Horse: {
    Horse: 4,
  },
  Elephant: {
    Horse: 2,
    Elephant: 4,
  },
  Sheep: {
    Horse: 2,
    Elephant: 3,
    Sheep: 4,
  },
  Serpent: {
    Horse: 3,
    Elephant: 3,
    Sheep: 2,
    Serpent: 4,
  },
  Dog: {
    Horse: 2,
    Elephant: 2,
    Sheep: 1,
    Serpent: 2,
    Dog: 4,
  },
  Cat: {
    Horse: 2,
    Elephant: 2,
    Sheep: 2,
    Serpent: 1,
    Dog: 2,
    Cat: 4,
  },
  Rat: {
    Horse: 2,
    Elephant: 2,
    Sheep: 1,
    Serpent: 1,
    Dog: 1,
    Cat: 0,
    Rat: 4,
  },
  Cow: {
    Horse: 1,
    Elephant: 2,
    Sheep: 3,
    Serpent: 1,
    Dog: 2,
    Cat: 2,
    Rat: 2,
    Cow: 4,
  },
  Buffalo: {
    Horse: 0,
    Elephant: 3,
    Sheep: 3,
    Serpent: 1,
    Dog: 2,
    Cat: 2,
    Rat: 2,
    Cow: 3,
    Buffalo: 4,
  },
  Tiger: {
    Horse: 1,
    Elephant: 1,
    Sheep: 1,
    Serpent: 2,
    Dog: 1,
    Cat: 1,
    Rat: 2,
    Cow: 0,
    Buffalo: 1,
    Tiger: 4,
  },
  Hare: {
    Horse: 1,
    Elephant: 2,
    Sheep: 2,
    Serpent: 2,
    Dog: 0,
    Cat: 3,
    Rat: 2,
    Cow: 3,
    Buffalo: 2,
    Tiger: 1,
    Hare: 4,
  },
  Monkey: {
    Horse: 3,
    Elephant: 3,
    Sheep: 0,
    Serpent: 2,
    Dog: 2,
    Cat: 3,
    Rat: 2,
    Cow: 2,
    Buffalo: 2,
    Tiger: 1,
    Hare: 2,
    Monkey: 4,
  },
  Mongoose: {
    Horse: 2,
    Elephant: 2,
    Sheep: 3,
    Serpent: 0,
    Dog: 1,
    Cat: 2,
    Rat: 1,
    Cow: 2,
    Buffalo: 2,
    Tiger: 2,
    Hare: 2,
    Monkey: 3,
    Mongoose: 4,
  },
  Lion: {
    Horse: 1,
    Elephant: 0,
    Sheep: 1,
    Serpent: 2,
    Dog: 1,
    Cat: 1,
    Rat: 2,
    Cow: 1,
    Buffalo: 2,
    Tiger: 1,
    Hare: 1,
    Monkey: 2,
    Mongoose: 2,
    Lion: 4,
  },
};

module.exports.DEFAULT_THRESHOLD = 0.4;

module.exports.GOOD_HOUSES = [1, 2, 3, 4, 5, 7, 9, 10, 11];
module.exports.BAD_HOUSES = [6, 8, 12];

module.exports.OPPOSITE_SIGNS = {
  aries: "libra",
  taurus: "scorpio",
  gemini: "sagittarius",
  cancer: "capricorn",
  leo: "aquarius",
  virgo: "pisces",
  libra: "aries",
  scorpio: "taurus",
  sagittarius: "gemini",
  capricorn: "cancer",
  aquarius: "leo",
  pisces: "virgo",
};

module.exports.GOOD_CONNECTION_TYPES = [1, 3, 5, 7, 9, 11];
module.exports.BAD_CONNECTION_TYPES = [2, 4, 6, 8, 10, 12];

module.exports.MANGLIK = [1, 4, 7, 8, 12];

module.exports.swisseph = swisseph;
