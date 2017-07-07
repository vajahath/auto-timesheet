const request = require('request');
const lme = require('lme');
const Promise = require('bluebird');
const { getSerializedCookies, updateCookies } = require('./cookie-handler');
const { getAuthenticityToken } = require('./token-handler');

module.exports = (stuffs) => {
	return new Promise((resolve, reject) => {
		let cookies = getSerializedCookies();
		let authenticityToken = getAuthenticityToken();

		// check if the cache is perfect
		if (!cookies || !authenticityToken)
			return reject(new Error('No enough data in cache'));

		// set cookie and tokens and other stuffs
		options.headers.Cookie = cookies;
		options.headers['X-CSRF-Token'] = authenticityToken;
		options.form = {
			"utf8": "✓",
			"authenticity_token": authenticityToken,
			"date": stuffs.date,
			"project_id": stuffs.projectId,
			"task[detail]": stuffs.taskDetail,
			"start_time": stuffs.startTime,
			"end_time": stuffs.endTime,
			"issue_id": stuffs.issueId,
			"commit": "Create",
		}

		// issue request
		// lme.s(options);
		request(options, (err, res, body) => {

			if (err || res.statusCode !== 200) {
				return reject(err ? err : new Error('status:' + res.statusCode));
			}

			updateCookies(res.headers['set-cookie']);

			return resolve(body);
		})

	})
}


let options = {
	url: 'http://projects.cubettech.com/timesheet/create',
	method: 'POST',
	headers: {
		"Accept": "*/*;q=0.5, text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6",
		"Connection": "keep-alive",
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Cookie": null,
		"Host": "projects.cubettech.com",
		"Origin": "http://projects.cubettech.com",
		"Referer": "http://projects.cubettech.com/timesheet",
		"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
		"X-CSRF-Token": null,
		"X-Requested-With": "XMLHttpRequest"
	},
	// form: {
	// 	"utf8": "✓",
	// 	"authenticity_token": 'PrU6mQuiENXP+yJLKibNx3mDTWCyUot5XmSRjGTV0Wo=',
	// 	"date": "2017-07-05",
	// 	"project_id": "405",
	// 	"task[detail]": "attaching activity logger for status change                                                                       ",
	// 	"start_time": "10:45:00",
	// 	"end_time": "11:50:00",
	// 	"issue_id": "18264",
	// 	"commit": "Create",
	// }
};
