const request = require('request');
const Promise = require('bluebird');
const { updateAuthenticityToken } = require('./token-handler');
const { getSerializedCookies, updateCookies } = require('./cookie-handler');

module.exports = () => {
	return new Promise((resolve, reject) => {
		let cookies = getSerializedCookies();
		if (!cookies) return reject(new Error('No cookies'));

		// set cookies
		options.headers.Cookie = cookies;
		// lme.s(options);
		request(options, (err, res, body) => {
			if (err) return reject(err);
			if (res.statusCode !== 200) return reject(new Error('status: ' + res.statusCode));

			// some silly checks to confirm that it is the intended page.
			// (keys gotten from inspecting the intended page)
			if (!body.includes('accesskey') ||
				!body.includes('<option value=') ||
				!body.includes('new_user_activity')) {
				throw new Error('Looks like timesheet page can\'t load');
			}

			updateCookies(res.headers['set-cookie']);
			updateAuthenticityToken(body);

			resolve();
		});
	});
};

let options = {
	url: 'http://projects.cubettech.com/timesheet',
	method: 'GET',
	headers: {
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'Accept-Encoding': 'gzip, deflate, sdch',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
		'Connection': 'keep-alive',
		'Cookie': null, // will set dynamically
		'Host': 'projects.cubettech.com',
		'Referer': 'http://projects.cubettech.com/',
		'Upgrade-Insecure-Requests': '1',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'
	}
};
