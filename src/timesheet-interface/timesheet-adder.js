const request = require('request');
const Promise = require('bluebird');
const pull = require('app-root-path').require;
const { getSerializedCookies, updateCookies } = pull('src/cookie-handler');
const { getAuthenticityToken } = pull('src/token-handler');
const reqOptions = pull('config').timesheet.addTimesheetActivityRq;

module.exports = (stuffs) => {
	return new Promise((resolve, reject) => {
		let cookies = getSerializedCookies();
		let authenticityToken = getAuthenticityToken();

		// check if the cache is perfect
		if (!cookies || !authenticityToken)
			return reject(new Error('No enough data in cache'));

		// set cookie and tokens and other stuffs
		reqOptions.headers.Cookie = cookies;
		reqOptions.headers['X-CSRF-Token'] = authenticityToken;
		reqOptions.form = {
			'utf8': '✓',
			'authenticity_token': authenticityToken,
			'date': stuffs.date,
			'project_id': stuffs.projectId,
			'task[detail]': stuffs.taskDetail,
			'start_time': stuffs.startTime,
			'end_time': stuffs.endTime,
			'issue_id': stuffs.issueId,
			'commit': 'Create',
		};

		// issue request
		// lme.s(reqOptions);
		request(reqOptions, (err, res, body) => {

			if (err || res.statusCode !== 200) {
				return reject(err ? err : new Error('status:' + res.statusCode));
			}
			updateCookies(res.headers['set-cookie']);

			if (body.includes('Time sheet has been added successfully')) return resolve();
			else return reject(new Error('something went wrong while trying to add activity: ' + body));
		});

	});
};
