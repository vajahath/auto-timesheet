const lme = require('lme');

let conf = {};

try {
	conf = require('../credentials/credentials');
} catch (e) {
	lme.e('Ah.. Not found credentials/credentials.json');
	process.exit(1);
}

module.exports = conf;
