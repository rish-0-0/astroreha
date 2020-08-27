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
 * Figure out whether two people are compatible (Default threshold=0.4)
 * @param {birthDetails} person1 First Person
 * @param {birthDetails} person2 Second Person
 * @param {Number} [threshold=0.4] - Threshold above which function returns true
 * @returns {Boolean} Whether two people are compatible given threshold (Default=0.4)
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

  const person1BirthChartHouses = getHousesOfChart(person1BirthChart);
  const person2BirthChartHouses = getHousesOfChart(person2BirthChart);

  const person1NavamsaChartHouses = getHousesOfChart(person1NavamsaChart);
  const person2NavamsaChartHouses = getHousesOfChart(person2NavamsaChart);
  let total_score = 0;

  let D9_p1N_p2B_match = seventhHouseOfD9Check(person1NavamsaChart, person2BirthChart);
  if (D9_p1N_p2B_match) total_score++;

  let D9_p2N_p1B_match = seventhHouseOfD9Check(person2NavamsaChart, person1BirthChart);
  if (D9_p2N_p1B_match) total_score++;

  if (!total_score) return false; // Navamsa Chart condition

  return total_score / 30 >= threshold; // 30 is total score possible
}

/**
 *
 * @param {Object} chart birthChart
 * @returns {Object} key value: rashi: house
 */
function getHousesOfChart(chart) {
  const ascendantRashi = chart.meta.La.rashi;
  // const getAscendantRashiCode = constants.REVERSE_RASHIS[ascendantRashi];
  const getAscendantRashiOriginalIndex = constants.RASHI_MAP[ascendantRashi];
  const houses = {};
  var j = 0;
  for (var i = getAscendantRashiOriginalIndex; i < 12; ++i) {
    houses[j + 1] = constants.RASHI_ARRAY[i];
    ++j;
  }
  j = 0;
  if (getAscendantRashiOriginalIndex) {
    for (var i = getAscendantRashiOriginalIndex - 1; i >= 0; i--) {
      houses[12 - j] = constants.RASHI_ARRAY[i];
      ++j;
    }
  }

  return houses;
}

function getReverseHousesOfChart(houses) {
  const reverseHouses = {};

  Object.keys(houses).map((it) => (reverseHouses[houses[it]] = it));

  return reverseHouses;
}

function seventhHouseOfD9Check(navamsaChart1, birthChart2) {
  const firstPersonGetHouses = getHousesOfChart(navamsaChart1);
  const seventhHouseRashi = firstPersonGetHouses[7];
  const convertRashiCodeToReadable = constants.RASHIS[seventhHouseRashi];
  const getRashiLordOfSeventhHouse =
    constants.RASHI_LORDS[convertRashiCodeToReadable];
  const whereD9SeventhHouseRashiLordSits =
    navamsaChart1.meta[getRashiLordOfSeventhHouse].rashi;

  const secondPersonGetHouses = getHousesOfChart(birthChart2);
  const secondPersonGetRashis = getReverseHousesOfChart(secondPersonGetHouses);
  const firstPersonsD9LordHouseNumberInSecondPersonsBirthChart =
    secondPersonGetRashis[whereD9SeventhHouseRashiLordSits];


  return (
    constants.GOOD_HOUSES.indexOf(
      Number(firstPersonsD9LordHouseNumberInSecondPersonsBirthChart)
    ) > 0
  );
}

module.exports = { areCompatibile, getHousesOfChart, seventhHouseOfD9Check };
