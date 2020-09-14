// There are 3 levels of accuracy (also called ephemeris)
/*
  Moshier: 0.1 arcsec
  Swiss Ephemeris: 0.001 arcsec (requires 90MB of data)
  JPL NASA: almost accurate (nothing higher than this): 2.9GB of Data
  House System: Whole Sign 'W' (Wikipedia) default could be Equal 'E'

*/
const positioner = require("./position");
const compatibility = require("./compatibility");
// const {
//   getUTCPosition,
//   getUTCFixedStarPosition,
//   getAllPlanets,
//   // getBirthChart,
//   nakshatras,
//   rashis,
//   getNavamsaChart,
// } = positioner;

/**
 *
 * @param {Object} obj object to print
 */

function print(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

if (require.main == module) {
  // console.log(getUTCPosition("moon", new Date()));
  // console.log(getUTCFixedStarPosition("Aldebaran", new Date()));
  // print(
  //   getAllPlanets(
  //     new Date("2015-08-10T17:09:01.000+08:00").toDateString(),
  //     10.0014,
  //     53.5653,
  //     0
  //   )
  // );

  // // console.log(getBirthChart("1990-07-04", "10:12:00", 29.7604, -95.3698, -5)); // Sophie
  // const birthChart = getBirthChart(
  //   "1999-05-22",
  //   "08:00:00",
  //   28.6139,
  //   77.209,
  //   5.5
  // ); // Sophie
  // // print(birthChart.meta.La);
  // const sophieNavamsaChart = getNavamsaChart(birthChart);
  // // print(sophieNavamsaChart.meta.La);
  // // print(compatibility.getHousesOfChart(sophieNavamsaChart));
  const birthChart = positioner.getBirthChart(
    "1990-07-04",
    "10:12:00",
    29.7604,
    -95.3698,
    -5
  ); // Rishabh
  // print(birthChart.meta.La);
  // print(compatibility.getHousesOfChart(birthChart));
  // console.log(rashis.getRashi(birthChart));
  // console.log(compatibility.oppositeSignOfBirthCheck(birthChart, birthChartRishabh));
  print(positioner.getNavamsaChart(birthChart)); // Rishabh
  // console.log(nakshatras.calculateNakshatraCompatibility("Cat", "Hare"));
  // console.log(positioner.whichNavamsa(30*1+12+10/60));
}

module.exports = { compatibility, positioner };
