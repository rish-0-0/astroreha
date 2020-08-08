const swisseph = require("swisseph");
const constants = require("./constants");

/**
 *
 * @param {String} star eg: 'sun', 'moon'
 * @param {Date} date Date when to calculate position
 */
function getUTCPosition(star, date) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const jul_day = swisseph.swe_julday(
    year,
    month,
    day,
    hour,
    swisseph.SE_GREG_CAL
  );

  return swisseph.swe_calc_ut(jul_day, constants.DICT[star], constants.FLAG);
}

module.exports = { getUTCPosition };