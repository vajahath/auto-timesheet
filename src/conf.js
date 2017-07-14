const lme = require('lme');
const pull = require('app-root-path').require;

let cred = {};

try {
	cred = pull('credentials/credentials');
} catch (e) {
	lme.e('Ah.. Not found credentials/credentials.json');
	process.exit(1);
}

module.exports = cred;
