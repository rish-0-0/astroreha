const swisseph = require("swisseph");
const { getValidatedBirthDetails } = require("jyotish").utils.birthDetails;
/**
 * 
 * @typedef {Object} BirthDetails
 * @property {String} dateString - Format: YYYY-MM-DD
 * @property {String} timeString - Format: HH:mm:ss
 * @property {Number} lat - Latitude
 * @property {Number} lng - Longitude
 * @property {Number} timezone - Timezone in hours. Eg: 5.5
 */

/**
 * 
 * @param {BirthDetails} birthDetails 
 */
const convertTime = (birthDetails) => {
  let utc = swisseph.swe_utc_time_zone(
    birthDetails.year,
    birthDetails.month,
    birthDetails.date,
    birthDetails.hour,
    birthDetails.min,
    birthDetails.sec,
    birthDetails.timezone
  );
  let retval = swisseph.swe_utc_to_jd(
    utc.year,
    utc.month,
    utc.day,
    utc.hour,
    utc.minute,
    utc.second,
    swisseph.SE_GREG_CAL
  );
  let et = retval.julianDayET;
  tt = retval.julianDayUT;
  return { utc, retval, et, tt };
};

/**
 * 
 * @param {BirthDetails} birthDetails birth details
 * @param {String} house_type House System. Default: "Whole Sign" = "W" 
 */

function calculateHouses(birthDetails, house_type = "W") {
  const { tt } = convertTime(getValidatedBirthDetails(birthDetails));
  return swisseph.swe_houses_ex(
    tt,
    swisseph.SEFLG_SIDEREAL,
    birthDetails.lat,
    birthDetails.lng,
    house_type
  );
}

module.exports = { calculateHouses };
