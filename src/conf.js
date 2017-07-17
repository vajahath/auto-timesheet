const lme = require('lme');

let cred = {};

try {
	cred = require('../credentials/credentials');
} catch (e) {
	lme.e('Ah.. Not found credentials/credentials.json');
	process.exit(1);
}

module.exports = cred;
