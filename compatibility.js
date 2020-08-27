const constants = require("./constants");
/**
 * @typedef {Object} birthDetails
 * @property {String} dateString - Format: YYYY-MM-DD
 * @property {String} timeString - Format: HH:MM:SS
 * @property {Number} lat - Latitude
 * @property {Number} lng - Longitude
 * @property {Number} timezone - Timezone in hours, eg: 5.5
 */

/**
 *
 * @param {birthDetails} person1 First Person
 * @param {birthDetails} person2 Second Person
 * @param {Number} [threshold=0.4] - Threshold above which function returns true
 * @returns {Boolean} Whether two people are compatible given threshold
 */
function areCompatibile(
  person1,
  person2,
  threshold = constants.DEFAULT_THRESHOLD
) {}

module.exports = { areCompatibile };
