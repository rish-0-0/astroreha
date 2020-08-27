const constants = require("./constants");
const { getBirthChart, getNavamsaChart } = require("./position");
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
) {
  const person1BirthChart = getBirthChart(
    person1.dateString,
    person1.timeString,
    person1.lat,
    person1.lng,
    person1.timezone
  );
  const person2BirthChart = getBirthChart(
    person2.dateString,
    person2.timeString,
    person2.lat,
    person2.lng,
    person2.timezone
  );
  const person1NavamsaChart = getNavamsaChart(person1BirthChart);
  const person2NavamsaChart = getNavamsaChart(person2BirthChart);
  let total_score = 0;



  return total_score >= threshold;
}

module.exports = { areCompatibile };
