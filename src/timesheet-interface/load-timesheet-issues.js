const request = require('request');
const Promise = require('bluebird');
const pull = require('app-root-path').require;
const { getSerializedCookies, updateCookies } = pull('src/cookie-handler');
const { getAuthenticityToken } = pull('src/token-handler');
const conf = pull('config');

module.exports = () => {
	return new Promise((resolve, reject) => {
		let cookies = getSerializedCookies();
		let authenticityToken = getAuthenticityToken();

		if (!cookies || !authenticityToken)
			return reject(new Error('No enough data in cache'));

		// set cookies and token
		options.headers.Cookie = cookies;
		options.headers['X-CSRF-Token'] = authenticityToken;
		options.form = {
			project: conf.projectId
		};

		request(options, (err, res, body) => {
			if (err) return reject(err);
			if (res.statusCode !== 200) return reject(new Error('status: ' + res.statusCode));

			updateCookies(res.headers['set-cookie']);

			body = JSON.parse(body);

			resolve(body);
		});
	});
};

let options = {
	url: 'http://projects.cubettech.com/timesheet/loadIssues',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
		'Connection': 'keep-alive',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': null, // will set this dynamically
		'Host': 'projects.cubettech.com',
		'Origin': 'http://projects.cubettech.com',
		'Referer': 'http://projects.cubettech.com/timesheet',
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36',
		'X-CSRF-Token': null, // will set this dynamically
		'X-Requested-With': 'XMLHttpRequest',
	}
};
