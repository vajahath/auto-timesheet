const lme = require('lme');

let conf = {};

try {
	conf = require('../credentials/config');
} catch (e) {
	lme.e('Ah.. Not found credentials/config.json');
	process.exit(1);
}

module.exports = conf;
