const { swisseph, ...constants } = require("./constants");
const ephemeris = require("ephemeris");
const jyotish = require("jyotish");
const { calculateHouses } = require("./houses");

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
function getAllGrahas(dateString, timeString, lat, lng, timezone) {
  console.log(calculateHouses({ dateString, timeString, lat, lng, timezone }));
  return jyotish.grahas.getGrahasPosition(
    { dateString, timeString, lat, lng, timezone },
    { zodiacType: "S", houseType: "W" }
  );
}

module.exports = {
  getUTCPosition,
  getJulianDay,
  getUTCFixedStarPosition,
  getAllPlanets,
  getAllGrahas,
};
