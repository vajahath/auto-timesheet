const fs = require('fs');
const path = require('path');
const lme = require('lme');

module.exports = (callback) => {

	console.log(path.join(__dirname, '../../credentials/credentials.json'));

	let credGenStream = fs.createWriteStream(path.join(__dirname, '/../../credentials/credentials.json'));
	let templateStream = fs.createReadStream(path.join(__dirname, '/../../credentials/credentials.template'));
	templateStream.pipe(credGenStream);

	// err handler
	templateStream.on('error', err => {
		lme.e('Something went wrong while trying to generate credential template!');
		console.log(err);
		throw err;
	});

	templateStream.on('close', () => {
		credGenStream.end();
		callback();
	});
};
