const constants = require("./constants");
const { getNavamsaChart, getBirthChart } = require("./position");
const {
  calculateNakshatra,
  calculateNakshatraCompatibility,
} = require("./nakshatra");
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

  let D9_p1N_p2B_match = seventhHouseOfD9Check(
    person1NavamsaChart,
    person2BirthChart
  );
  if (D9_p1N_p2B_match) total_score++;

  let D9_p2N_p1B_match = seventhHouseOfD9Check(
    person2NavamsaChart,
    person1BirthChart
  );
  if (D9_p2N_p1B_match) total_score++;

  if (!total_score) return false; // Navamsa Chart condition

  total_score += oppositeSignOfBirthCheck(person1BirthChart, person2BirthChart); // 7th House Map Match?

  // Are the lords of the rising sign friends
  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.La.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.La.rashi]]
  );
  // Rising to Rising Connection
  total_score += connectionType(
    person1BirthChart.meta.La.rashi,
    person2BirthChart.meta.La.rashi
  );

  // Moon to Moon connection

  total_score += connectionType(
    person1BirthChart.meta.Mo.rashi,
    person2BirthChart.meta.Mo.rashi
  );

  // Moon's Ruling Lords Friends

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Mo.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Mo.rashi]]
  );

  // Moon conjunct or opposite sun?

  total_score += Number(
    person1BirthChart.meta.Mo.rashi === person2BirthChart.meta.Su.rashi ||
      person1BirthChart.meta.Su.rashi === person2BirthChart.meta.Mo.rashi
  );

  // Sun to Sun connection
  total_score += connectionType(
    person1BirthChart.meta.Su.rashi,
    person2BirthChart.meta.Su.rashi
  );

  // Sun Illumination one (Which house does partnet's sun fall into?)

  total_score += signInterference(person1BirthChart, person2BirthChart, "Su");

  // Sun Conjunct 7th House?

  total_score += planetConjunctHouse(
    person1BirthChart,
    person2BirthChart,
    "Su",
    7
  );

  // Venus to Venus Connection

  total_score += connectionType(
    person1BirthChart.meta.Ve.rashi,
    person2BirthChart.meta.Ve.rashi
  );

  // Are Venus Ruling Lord Friends?

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Ve.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Ve.rashi]]
  );

  // Manglik Connection

  total_score += checkManglikConnection(person1BirthChart, person2BirthChart);

  // Mars Ruling Lord friends?

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Ma.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Ma.rashi]]
  );

  // Mars to Mars Connection
  total_score += connectionType(
    person1BirthChart.meta.Ma.rashi,
    person2BirthChart.meta.Ma.rashi
  );

  // Rahu to Rahu or Ketu to Ketu Connection Correspondence
  if (
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Ra"
    ) ||
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Ke"
    )
  ) {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ra"
      ) ||
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ke"
      )
    ) {
      // Two way connection
      total_score += 2;
    } else total_score += 1; // One way connection
  } else {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ra"
      ) ||
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ke"
      )
    ) {
      total_score += 1; // One way connection
    } else {
      total_score += 0;
    }
  }
  // Saturn to Saturn Connection
  if (
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Sa"
    )
  ) {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Sa"
      )
    ) {
      // Two way connection
      total_score += 2;
    } else total_score += 1; // One way connection
  } else {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Sa"
      )
    ) {
      total_score += 1; // One way connection
    } else {
      total_score += 0; // No connection
    }
  }
  // Nakshatra Compatibility (Overall)

  const animalOfPerson1 = calculateNakshatra(person1BirthChart).animal;
  const animalOfPerson2 = calculateNakshatra(person2BirthChart).animal;

  total_score += calculateNakshatraCompatibility(
    animalOfPerson1,
    animalOfPerson2
  );

  return total_score / 30 >= threshold; // 30 is total score possible
}

/**
 * Figure out whether two people are compatible (Default threshold=0.4)
 * @param {birthDetails} person1 First Person
 * @param {birthDetails} person2 Second Person
 * @param {Number} [threshold=0.4] - Threshold above which function returns true
 * @returns {Boolean} Whether two people are compatible given threshold (Default=0.4)
 */
function getCompatibilityScore(
  person1,
  person2,
  threshold = constants.DEFAULT_THRESHOLD
) {
  const interim = [];
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

  let D9_p1N_p2B_match = seventhHouseOfD9Check(
    person1NavamsaChart,
    person2BirthChart
  );
  if (D9_p1N_p2B_match) total_score++;

  let D9_p2N_p1B_match = seventhHouseOfD9Check(
    person2NavamsaChart,
    person1BirthChart
  );
  if (D9_p2N_p1B_match) total_score++;
  interim.push({ after_score: total_score, key: "Seventh House of D9" });
  if (!total_score) return false; // Navamsa Chart condition

  total_score += oppositeSignOfBirthCheck(person1BirthChart, person2BirthChart); // 7th House Map Match?
  interim.push({ after_score: total_score, key: "7th House Matching?" });

  // Are the lords of the rising sign friends
  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.La.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.La.rashi]]
  );

  interim.push({
    after_score: total_score,
    key: "Are Lords of Rising Sign Friends?",
  });
  // Rising to Rising Connection
  total_score += connectionType(
    person1BirthChart.meta.La.rashi,
    person2BirthChart.meta.La.rashi
  );

  interim.push({
    after_score: total_score,
    key: "Rising to Rising Connection",
  });

  // Moon to Moon connection

  total_score += connectionType(
    person1BirthChart.meta.Mo.rashi,
    person2BirthChart.meta.Mo.rashi
  );
  interim.push({ after_score: total_score, key: "Moon to Moon Connection" });
  // Moon's Ruling Lords Friends

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Mo.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Mo.rashi]]
  );
  interim.push({ after_score: total_score, key: "Moon's Ruling Lord Friends" });
  // Moon conjunct or opposite sun?

  total_score += Number(
    person1BirthChart.meta.Mo.rashi === person2BirthChart.meta.Su.rashi ||
      person1BirthChart.meta.Su.rashi === person2BirthChart.meta.Mo.rashi
  );
  interim.push({
    after_score: total_score,
    key: "Moon conjunct or opposite Sun?",
  });

  // Sun to Sun connection
  total_score += connectionType(
    person1BirthChart.meta.Su.rashi,
    person2BirthChart.meta.Su.rashi
  );
  interim.push({ after_score: total_score, key: "Sun to Sun Connection" });

  // Sun Illumination one (Which house does partnet's sun fall into?)

  total_score += signInterference(person1BirthChart, person2BirthChart, "Su");
  interim.push({ after_score: total_score, key: "Sun's Illumination thing" });
  // Sun Conjunct 7th House?

  total_score += planetConjunctHouse(
    person1BirthChart,
    person2BirthChart,
    "Su",
    7
  );
  interim.push({
    after_score: total_score,
    key: "Sun conjunct seventh House?",
  });
  // Venus to Venus Connection

  total_score += connectionType(
    person1BirthChart.meta.Ve.rashi,
    person2BirthChart.meta.Ve.rashi
  );
  interim.push({ after_score: total_score, key: "Venus to Venus connection" });
  // Are Venus Ruling Lord Friends?

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Ve.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Ve.rashi]]
  );
  interim.push({
    after_score: total_score,
    key: "Are venus ruling lord friends?",
  });

  // Manglik Connection

  total_score += checkManglikConnection(person1BirthChart, person2BirthChart);
  interim.push({ after_score: total_score, key: "Manglik Connection" });
  // Mars Ruling Lord friends?

  total_score += areFriends(
    constants.RASHI_LORDS[constants.RASHIS[person1BirthChart.meta.Ma.rashi]],
    constants.RASHI_LORDS[constants.RASHIS[person2BirthChart.meta.Ma.rashi]]
  );
  interim.push({ after_score: total_score, key: "Mars Ruling Lord Friends?" });
  // Mars to Mars Connection
  total_score += connectionType(
    person1BirthChart.meta.Ma.rashi,
    person2BirthChart.meta.Ma.rashi
  );
  interim.push({ after_score: total_score, key: "Mars to Mars Connection" });
  // Rahu to Rahu or Ketu to Ketu Connection Correspondence
  if (
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Ra"
    ) ||
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Ke"
    )
  ) {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ra"
      ) ||
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ke"
      )
    ) {
      // Two way connection
      total_score += 2;
    } else total_score += 1; // One way connection
  } else {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ra"
      ) ||
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Ke"
      )
    ) {
      total_score += 1; // One way connection
    } else {
      total_score += 0;
    }
  }
  interim.push({ after_score: total_score, key: "Rahu to Rahu...." });
  // Saturn to Saturn Connection
  if (
    checkPlanetCorrespondenceOfPlanetInSecondChart(
      person1BirthChart,
      person2BirthChart,
      "Sa"
    )
  ) {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Sa"
      )
    ) {
      // Two way connection
      total_score += 2;
    } else total_score += 1; // One way connection
  } else {
    if (
      checkPlanetCorrespondenceOfPlanetInSecondChart(
        person2BirthChart,
        person1BirthChart,
        "Sa"
      )
    ) {
      total_score += 1; // One way connection
    } else {
      total_score += 0; // No connection
    }
  }
  interim.push({
    after_score: total_score,
    key: "Saturn to Saturn stuff",
  });
  // Nakshatra Compatibility (Overall)

  const animalOfPerson1 = calculateNakshatra(person1BirthChart).animal;
  const animalOfPerson2 = calculateNakshatra(person2BirthChart).animal;

  total_score += calculateNakshatraCompatibility(
    animalOfPerson1,
    animalOfPerson2
  );
  interim.push({ after_score: total_score, key: "Nakshatra stuff" });

  return { interim, total_score };
}

/**
 *
 * @param {Object} chart birthChart
 * @returns {Object} key value: house: rashi
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

function oppositeSignOfBirthCheck(birthChart1, birthChart2) {
  const firstPersonHouses = getHousesOfChart(birthChart1);
  const secondPersonHouses = getHousesOfChart(birthChart2);

  const firstPersonSeventhHouseSign = firstPersonHouses[7];
  const secondPersonSeventhHouseSign = secondPersonHouses[7];

  const rulingLordOfFirstPersonSeventhHouseSign =
    constants.RASHI_LORDS[constants.RASHIS[firstPersonSeventhHouseSign]];
  const rulingLordOfSecondPersonSeventhHouseSign =
    constants.RASHI_LORDS[constants.RASHIS[secondPersonSeventhHouseSign]];

  const signOfRulingLordOfFirstPerson =
    birthChart1.meta[rulingLordOfFirstPersonSeventhHouseSign].rashi;
  const signOfRulingLordOfSecondPerson =
    birthChart2.meta[rulingLordOfSecondPersonSeventhHouseSign].rashi;

  const oppositeSignOfRulingLordSignFirstPerson =
    constants.OPPOSITE_SIGNS[constants.RASHIS[signOfRulingLordOfFirstPerson]];
  const oppositeSignOfRulingLordSignSecondPerson =
    constants.OPPOSITE_SIGNS[constants.RASHIS[signOfRulingLordOfSecondPerson]];

  // console.log(
  //   signOfRulingLordOfSecondPerson,
  //   signOfRulingLordOfFirstPerson,
  //   oppositeSignOfRulingLordSignSecondPerson,
  //   oppositeSignOfRulingLordSignFirstPerson
  // );

  let total_score = 0;

  // First Person's rising, sun or moon signs
  if (
    constants.RASHIS[birthChart1.meta.La.rashi] ===
      oppositeSignOfRulingLordSignSecondPerson ||
    constants.RASHIS[birthChart1.meta.Su.rashi] ===
      oppositeSignOfRulingLordSignSecondPerson ||
    constants.RASHIS[birthChart1.meta.Mo.rashi] ===
      oppositeSignOfRulingLordSignSecondPerson
  ) {
    total_score += 2;
  }

  if (
    constants.RASHIS[birthChart2.meta.La.rashi] ===
      oppositeSignOfRulingLordSignFirstPerson ||
    constants.RASHIS[birthChart2.meta.Su.rashi] ===
      oppositeSignOfRulingLordSignFirstPerson ||
    constants.RASHIS[birthChart2.meta.Mo.rashi] ===
      oppositeSignOfRulingLordSignFirstPerson
  ) {
    total_score += 2;
  }

  return total_score;
}

function areFriends(planet1, planet2) {
  const isFriend = constants.PLANET_RELATIONS[planet1].friends.indexOf(planet2);
  if (isFriend) {
    return 2;
  }
  const isNeutral = constants.PLANET_RELATIONS[planet1].neutral.indexOf(
    planet2
  );
  if (isNeutral) return 1;
  return 0;
}

function connectionType(sign1, sign2) {
  const sign1_map = constants.RASHI_MAP[sign1] + 1;
  const sign2_map = constants.RASHI_MAP[sign2] + 1;
  let result;
  // Result is shortest path from sign1 to sign2
  if (sign1_map <= 7 && sign2_map >= 7) {
    result = sign2_map - (12 - sign1_map) + 1;
  } else if (sign1_map >= 7 && sign2_map <= 7) {
    result = sign1_map - (12 - sign2_map) + 1;
  } else {
    result = Math.abs(sign1_map - sign2_map) + 1;
  }
  if (constants.GOOD_CONNECTION_TYPES.indexOf(result)) {
    return 1; // point
  }
  return 0;
}

function signInterference(birthChart1, birthChart2, planet) {
  const firstPersonHouses = getHousesOfChart(birthChart1);
  const firstPersonReverseHouses = getReverseHousesOfChart(firstPersonHouses);

  const secondPersonHouses = getHousesOfChart(birthChart2);
  const secondPersonReverseHouses = getReverseHousesOfChart(secondPersonHouses);

  const firstPersonInterfereSecondPersonPlanetHouse =
    firstPersonReverseHouses[birthChart2.meta[planet].rashi]; // Interfere the planets in one other's charts
  const secondPersonInterfereFirstPersonPlanetHouse =
    secondPersonReverseHouses[birthChart1.meta[planet].rashi]; // Interfere the planets in one other's charts
  let score = 0;
  if (
    constants.GOOD_HOUSES.indexOf(
      Number(firstPersonInterfereSecondPersonPlanetHouse)
    )
  ) {
    score++;
  }

  if (
    constants.GOOD_HOUSES.indexOf(
      Number(secondPersonInterfereFirstPersonPlanetHouse)
    )
  ) {
    score++;
  }

  return score;
}

function planetConjunctHouse(birthChart1, birthChart2, planet, house) {
  const person1Houses = getHousesOfChart(birthChart1);
  const person2Houses = getHousesOfChart(birthChart2);

  const person1ReverseHouses = getReverseHousesOfChart(person1Houses);
  const person2ReverseHouses = getReverseHousesOfChart(person2Houses);

  return Number(
    person1ReverseHouses[birthChart2.meta[planet].rashi] == house ||
      person2ReverseHouses[birthChart1.meta[planet].rashi] == house
  );
}

function checkManglikConnection(birthChart1, birthChart2) {
  const person1Houses = getHousesOfChart(birthChart1);
  const person2Houses = getHousesOfChart(birthChart2);

  const person1ReverseHouses = getReverseHousesOfChart(person1Houses);
  const person2ReverseHouses = getReverseHousesOfChart(person2Houses);

  const person1MangalRashi = birthChart1.meta.Ma.rashi;
  const person2MangalRashi = birthChart2.meta.Ma.rashi;

  const person1MangalBhava = person1ReverseHouses[person1MangalRashi];
  const person2MangalBhava = person2ReverseHouses[person2MangalRashi];

  if (constants.MANGLIK.indexOf(Number(person1MangalBhava))) {
    if (constants.MANGLIK.indexOf(Number(person2MangalBhava))) {
      // Both Manglik
      return 1;
    }
    // One is Manglik
    return 0;
  } else {
    if (constants.MANGLIK.indexOf(Number(person2MangalBhava))) {
      // One is Manglik
      return 0;
    }
    // Both are Manglik
    return 1;
  }
}

function checkPlanetCorrespondenceOfPlanetInSecondChart(
  birthChart1,
  birthChart2,
  planet
) {
  const rashiOfPlanetBC1 = birthChart1.meta[planet].rashi;
  const signsInBC2 = birthChart2[constants.RASHIS[rashiOfPlanetBC1]].signs;

  if (signsInBC2.length) {
    return true;
  }
  return false;
}

module.exports = {
  areCompatibile,
  getHousesOfChart,
  seventhHouseOfD9Check,
  oppositeSignOfBirthCheck,
  areFriends,
  connectionType,
  signInterference,
  planetConjunctHouse,
  checkPlanetCorrespondenceOfPlanetInSecondChart,
  getCompatibilityScore,
  calculateNakshatra,
  calculateNakshatraCompatibility,
};
