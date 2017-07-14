const defaultConf = require('./defaults/config');
const conf = require('./config');

let effectiveConf = Object.assign({}, defaultConf, conf);

module.exports = effectiveConf;
