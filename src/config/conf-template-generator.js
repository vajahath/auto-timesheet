const jsonfile = require('jsonfile');
const lme = require('lme');
const template = require('./template.json');

module.exports = (configFile, callback) => {

	jsonfile.writeFile(configFile, template, { spaces: 2 }, err => {
		if (err) {
			lme.e('Something went wrong while trying to generate credential template!');
			console.log(err);
			throw err;
		}
		callback();
	});

};
