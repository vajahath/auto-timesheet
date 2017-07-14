const fs = require('fs');
const path = require('path');
const root = require('app-root-path');
const lme = require('lme');

module.exports = (callback) => {
	let credGenStream = fs.createWriteStream(path.join(root + '', 'credentials/credentials.json'))
	let templateStream = fs.createReadStream(path.join(root + '', 'credentials/credentials.template'));
	templateStream.pipe(credGenStream);

	// err handler
	templateStream.on('error', err => {
		lme.e('Something went wrong while trying to generate credential template!');
		console.log(err);
		throw err;
	})

	templateStream.on('close', () => {
		credGenStream.end();
		callback();
	});
}
