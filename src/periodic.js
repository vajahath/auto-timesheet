// the periodic invoking function

const lme = require('lme');
const addActivity = require('./timesheet-adder');
const login = require('./login');
const timesheetInit = require('./timesheet-initializer');

module.exports = (interval) => {
	setInterval(() => {
		// get git commits <- pending

		// add to timesheet
		addActivity({
			date: '2017-07-06',
			projectId: '405',
			startTime: '10:45:00',
			endTime: '11:50:00',
			issueId: '18264',
			taskDetail: 'hello                                                                                                                    ',
		}).then(() => {
			lme.s('activity added');
		}).catch(() => {
			lme.w('couldn\'t add activity. Initialing the alternate process to add it... ;)');
			login()
				.then(() => (timesheetInit()))
				.then(() => (addActivity({
					date: '2017-07-06',
					projectId: '405',
					startTime: '10:45:00',
					endTime: '11:50:00',
					issueId: '18264',
					taskDetail: 'hello                                                                                                                    ',
				})))
				.catch(err => {
					throw err;
				});
		});

	}, interval);
};
