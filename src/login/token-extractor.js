// module that extracts authenticity_token from the page

const cheerio = require('cheerio');
const request = require('request');
const Promise = require('bluebird');
const cache = require('../cache');

module.exports = () => {
	return new Promise((resolve, reject) => {
		request('http://projects.cubettech.com/login?back_url=http%3A%2F%2Fprojects.cubettech.com%2F', (err, res, body) => {
			if (err) reject(err);
			else {
				let page = cheerio.load(body);
				let authenticityToken = page('#login-form input')[1].attribs.value;
				if (!authenticityToken) reject(new Error('Failed to get authenticity_token. Please rise an issue on github..'))
				else {
					cache.set('authenticityToken', authenticityToken);
					resolve(authenticityToken);
				}
			}
		})
	})
}
