/**
 * Rashi is defined as the Moon Sign of the Birth Chart
 * @param {Object} birthChart
 */
function getRashi(birthChart) {
  return birthChart.meta.Mo.rashi;
}

module.exports = { getRashi };
