// There are 3 levels of accuracy (also called ephemeris)
/*
  Moshier: 0.1 arcsec
  Swiss Ephemeris: 0.001 arcsec (requires 90MB of data)
  JPL NASA: almost accurate (nothing higher than this): 2.9GB of Data
  House System: Whole Sign 'W' (Wikipedia) default could be Equal 'E'

*/
const positioner = require("./position");
const {
  getUTCPosition,
  getUTCFixedStarPosition,
  getAllPlanets,
  getBirthChart,
} = positioner;

if (require.main == module) {
  // console.log(getUTCPosition("moon", new Date()));
  // console.log(getUTCFixedStarPosition("Aldebaran", new Date()));
  // console.log(
  //   getAllPlanets(
  //     new Date("2015-08-10T17:09:01.000+08:00").toDateString(),
  //     10.0014,
  //     53.5653,
  //     0
  //   )
  // );

  console.log(getBirthChart("1990-07-04", "10:12:00", 29.7604, -95.3698, -5)); // Sophie
  // console.log(getBirthChart("1999-05-22", "08:00:00", 28.6139, 77.209, 5.5)); // Rishabh
}

module.exports = positioner;
