// the periodic invoking function

const lme = require('lme');
const addActivity = require('./timesheet-adder');
const login = require('./login');
const timesheetInit = require('./timesheet-initializer');
const getCommits = require('./commits');
const config = require('../config'); // not credentials

module.exports = () => {
	setInterval(() => {
		// data to send
		let params = {
			date: '2017-07-06',
			projectId: config.projectId,
			startTime: '10:45:00',
			endTime: '11:50:00',
			issueId: null,
			taskDetail: null,
		};

		getCommits()
			// add to timesheet
			.then(data => {
				params.taskDetail = data.msg;
				params.issueId = data.issueId;

				lme.s(params);
				return addActivity(params);
			})
			.then(() => {
				lme.s('activity added');
			}).catch(() => {
				lme.w('couldn\'t add activity. Initialing the alternate process to add it... ;)');
				login()
					.then(() => (timesheetInit()))
					.then(() => (addActivity(params)))
					.catch(err => {
						throw err;
					});
			});

	}, +config.activityInterval);
};
