// the periodic invoking function

const lme = require('lme');
const addActivity = require('./timesheet-interface/timesheet-adder');
const login = require('./timesheet-interface/login');
const timesheetInit = require('./timesheet-interface/timesheet-initializer');
const config = require('./config/conf-loader'); // not credentials

// identify git service
const gitService = require('./config/git-service-identifier');
// select the identified git service
const getCommits = require(`./git-interfaces/${gitService}`);

const catMe = require('cat-me');
const chalk = require('chalk');

const {
	getDate,
	getEndTime,
	getStartTime,
	initTime
} = require('./time-handler');

module.exports = () => {
	initTime(); // initialize time

	console.log(catMe('resting'));
	console.log('\n');
	console.log(
		chalk.blue('\n   +----------------------------------------------+')
	);
	console.log(
		chalk.blue('   |         AUTO-TIMESHEET HAS STARTED           |')
	);
	console.log(
		chalk.blue('   +----------------------------------------------+\n')
	);
	console.log(
		chalk.gray('First activity will be added at around ') +
			new Date(Date.now() + config.activityInterval) +
			'\n'
	);

	setInterval(() => {
		// data to send
		let params = {
			date: getDate(), // '2017-07-06',
			projectId: config.projectId,
			startTime: getStartTime(), // '10:45:00',
			endTime: getEndTime(), // '11:50:00',
			issueId: null,
			taskDetail: null
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
			})
			.catch(() => {
				lme.w(
					'couldn\'t add activity. Initialing the alternate process to add it... ;)'
				);
				login()
					.then(() => timesheetInit())
					.then(() => getCommits())
					.then(data => {
						params.taskDetail = data.msg;
						params.issueId = data.issueId;

						lme.s(params);

						console.log('---------------------------------------');
						console.log(JSON.stringify(params));

						return addActivity(params);
					})
					.then(() => {
						lme.s('activity added');
					})
					.catch(err => {
						throw err;
					});
			});
	}, +config.activityInterval);
};
