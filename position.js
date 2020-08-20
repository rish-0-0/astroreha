const { swisseph, ...constants } = require("./constants");
const ephemeris = require("ephemeris");

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

module.exports = {
  getUTCPosition,
  getJulianDay,
  getUTCFixedStarPosition,
  getAllPlanets,
};
