const swisseph = require('swisseph');
swisseph.swe_set_ephe_path('./node_modules/swisseph/ephe');


module.exports.FLAG = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

module.exports.DICT = {
  sun: swisseph.SE_SUN,
  moon: swisseph.SE_MOON,
  mean_node: swisseph.SE_MEAN_NODE,
  true_node: swisseph.SE_TRUE_NODE,
  mean_apog: swisseph.SE_MEAN_APOG,
  oscu_apog: swisseph.SE_OSCU_APOG,
  chiron: swisseph.SE_CHIRON,
}

module.exports.swisseph = swisseph;