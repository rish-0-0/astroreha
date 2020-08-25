const { swisseph, ...constants } = require("./constants");
const ephemeris = require("ephemeris");
const jyotish = require("jyotish");
const { calculateHouses } = require("./houses");
const grahas = require("jyotish/src/grahas");

/**
 *
 * @param {String} star eg: 'sun', 'moon'
 * @param {Date} date Date when to calculate position
 */
function getUTCPosition(star, date) {
  return swisseph.swe_calc_ut(
    getJulianDay(date),
    constants.DICT[star],
    swisseph.SEFLG_EQUATORIAL | swisseph.SEFLG_MOSEPH // Equatorial Coordinates
  );
}

/**
 *
 * @param {String} fixedStar fixed star's name
 * @param {Date} date date
 */
function getUTCFixedStarPosition(fixedStar, date) {
  return swisseph.swe_fixstar_ut(fixedStar, getJulianDay(date), constants.FLAG);
}

/**
 *
 * @param {Date} date local date, will be converted to UTC.
 */
function getJulianDay(date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  return swisseph.swe_julday(year, month, day, hour, swisseph.SE_GREG_CAL);
}

/**
 *
 * @param {String} dateString local datetime object string
 * @param {Number} longitude longitude of the place
 * @param {Number} latitude latitude of the place
 * @param {Number} height altitude of the place
 */

function getAllPlanets(dateString, longitude, latitude, height) {
  return ephemeris.getAllPlanets(
    new Date(dateString),
    longitude,
    latitude,
    height
  );
}

/*
  Grahas: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu
  Ayanamsha in use is Lahiri (most common)
*/

/**
 * @param {String} dateString format YYYY-MM-DD
 * @param {String} timeString format HH:MM:SS
 * @param {Number} lat latitude
 * @param {Number} lng longitude
 * @param {Number} timezone timezone in hours
 */
function getBirthChart(dateString, timeString, lat, lng, timezone) {
  // console.log(calculateHouses({ dateString, timeString, lat, lng, timezone }));
  const grahaPositions = jyotish.grahas.getGrahasPosition(
    { dateString, timeString, lat, lng, timezone },
    { zodiacType: "S", houseType: "W" }
  );

  const birthChart = {
    aries: {
      rashi: "aries",
      signs: [],
    },
    taurus: {
      rashi: "taurus",
      signs: [],
    },
    gemini: {
      rashi: "gemini",
      signs: [],
    },
    cancer: {
      rashi: "cancer",
      signs: [],
    },
    leo: {
      rashi: "leo",
      signs: [],
    },
    virgo: {
      rashi: "virgo",
      signs: [],
    },
    libra: {
      rashi: "libra",
      signs: [],
    },
    scorpio: {
      rashi: "scorpio",
      signs: [],
    },
    sagittarius: {
      rashi: "sagittarius",
      signs: [],
    },
    capricorn: {
      rashi: "capricorn",
      signs: [],
    },
    aquarius: {
      rashi: "aquarius",
      signs: [],
    },
    pisces: {
      rashi: "pisces",
      signs: [],
    },
  };

  Object.values(grahaPositions).map((graha) => {
    birthChart[constants.RASHIS[graha.rashi]].signs.push({
      graha: graha.graha,
      nakshatra: graha.nakshatra,
      longitude: graha.longitude,
      isRetrograde: graha.isRetrograde,
    });
  });

  return birthChart;
}

/**
 *
 * @param {Object} birthChart birthchart obtained from getBirthChart function
 */

function getNavamsaChart(birthChart) {
  const navamsaChart = {
    aries: {
      rashi: "aries",
      signs: [],
    },
    taurus: {
      rashi: "taurus",
      signs: [],
    },
    gemini: {
      rashi: "gemini",
      signs: [],
    },
    cancer: {
      rashi: "cancer",
      signs: [],
    },
    leo: {
      rashi: "leo",
      signs: [],
    },
    virgo: {
      rashi: "virgo",
      signs: [],
    },
    libra: {
      rashi: "libra",
      signs: [],
    },
    scorpio: {
      rashi: "scorpio",
      signs: [],
    },
    sagittarius: {
      rashi: "sagittarius",
      signs: [],
    },
    capricorn: {
      rashi: "capricorn",
      signs: [],
    },
    aquarius: {
      rashi: "aquarius",
      signs: [],
    },
    pisces: {
      rashi: "pisces",
      signs: [],
    },
  };
  Object.values(birthChart).map((rashi) => {
    rashi.signs.map((graha) => {
      const longitudeMod30 = graha.longitude % 30; // Remainder with 30 (Whole Sign only, as each Bhava is 30degrees)
      const navamsa = longitudeMod30 / (10 / 3); // (30/9) as it's navamsa (9th division)
      const navamsa_floor = Math.floor(navamsa);
      const new_rashi = constants.rashi_calc(
        constants.REVERSE_RASHIS[constants.NAVAMSHA_GROUPS[rashi.rashi]],
        navamsa_floor
      );
      navamsaChart[constants.RASHIS[new_rashi]].signs.push(graha);
    });
  });

  return navamsaChart;
}

module.exports = {
  getUTCPosition,
  getJulianDay,
  getUTCFixedStarPosition,
  getAllPlanets,
  getBirthChart,
  getNavamsaChart,
};
