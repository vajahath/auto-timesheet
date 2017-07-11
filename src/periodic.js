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
			issueId: '18264', // pending
			taskDetail: null, // join commits to form a message
		};

		getCommits()
			// add to timesheet
			.then(msg => {
				params.taskDetail = msg.join(', ');
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
