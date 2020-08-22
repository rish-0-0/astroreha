const swisseph = require("swisseph");
swisseph.swe_set_ephe_path("./node_modules/swisseph/ephe");

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

module.exports.swisseph = swisseph;
