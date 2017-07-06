const request = require('request');
const lme = require('lme');
const Promise = require('bluebird');
const cookieParse = require('cookieparser').parse;

module.exports = (username, password, token) => {
	return new Promise((resolve, reject) => {
		// set username and password
		options.form.username = username;
		options.form.password = password;
		options.form.authenticity_token = token;

		request(options, (err, res, body) => {
			if (err) reject(err);
			if (res.statusCode !== 302) reject(new Error('This is most probably due to invalid username/password'));

			let cook = 'autologin=' +
				cookieParse(res.headers['set-cookie'][0]).autologin +
				'; in_search=false; _redmine_session=' +
				cookieParse(res.headers['set-cookie'][1])._redmine_session + ';'

			resolve({
				statusCode: res.statusCode,
				setCookie: cook
			})
		})
	})
}


let options = {
	url: 'http://projects.cubettech.com/login',
	method: 'POST',
	headers: {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6",
		"Cache-Control": "max-age=0",
		"Connection": "keep-alive",
		"Content-Type": "application/x-www-form-urlencoded",
		"Host": "projects.cubettech.com",
		"Origin": "http://projects.cubettech.com",
		"Referer": "http://projects.cubettech.com/login?back_url=http%3A%2F%2Fprojects.cubettech.com%2F",
		"Upgrade-Insecure-Requests": "1",
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36"
	},
	form: {
		"utf8": "✓",
		"back_url": "http://projects.cubettech.com/",
		// "authenticity_token":"<token>"
		// "username": "",
		// "password": "",
		"autologin": 1,
		"login": "Login »"
	}
};
