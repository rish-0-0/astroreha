// There are 3 levels of accuracy (also called ephemeris)
/*
  Moshier: 0.1 arcsec
  Swiss Ephemeris: 0.001 arcsec (requires 90MB of data)
  JPL NASA: almost accurate (nothing higher than this): 2.9GB of Data

  Lol, we don't need no data

*/

const { getUTCPosition } = require("./position");

if (require.main == module) {
  console.log(getUTCPosition("moon", new Date()));
}
