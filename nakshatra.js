const constants = require("./constants");
/**
 * Nakshatra is defined as position of moon in birthchart, also associated to a Lord and an Animal
 * @param {Object} birthChart birthchart obtained from getBirthChart function
 */
function calculateNakshatra(birthChart) {
  return {
    ...birthChart.meta.Mo.nakshatra,
    animal: constants.NAKSHATRA_ANIMALS[birthChart.meta.Mo.nakshatra.name],
  };
}

function calculateNakshatraCompatibility(animal1, animal2) {
  return (
    constants.NAKSHATRA_ANIMAL_SCORE[animal1][animal2] ||
    constants.NAKSHATRA_ANIMAL_SCORE[animal2][animal1]
  );
}

module.exports = { calculateNakshatra, calculateNakshatraCompatibility };
