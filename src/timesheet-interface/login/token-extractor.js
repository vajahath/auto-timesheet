// module that extracts authenticity_token from the page

const cheerio = require('cheerio');
const request = require('request');
const Promise = require('bluebird');
const cache = require('../../cache');
const reqUrl = require('../../config/timesheet-config.json').timesheet.loginTokenExtractorUrl;

module.exports = () => {
	return new Promise((resolve, reject) => {
		request(reqUrl, (err, res, body) => {
			if (err) reject(err);
			else {
				let page = cheerio.load(body);
				let authenticityToken = page('#login-form input')[1].attribs.value;
				if (!authenticityToken) reject(new Error('Failed to get authenticity_token. Please rise an issue on github..'));
				else {
					cache.set('authenticityToken', authenticityToken);
					resolve(authenticityToken);
				}
			}
		});
	});
};
