const lme = require('lme');

let conf = {};

try {
	conf = require('../credentials/conf_');
} catch (e) {
	lme.e('Ah.. Not found credentials/conf_.json');
	process.exit(1);
}

module.exports = conf;
