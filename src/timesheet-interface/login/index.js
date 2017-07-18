const loginCore = require('./login');
const getToken = require('./token-extractor');
const timesheet = require('../../config/conf-loader').config.timesheet;
const cache = require('../../cache');

module.exports = () => {
	return getToken().then(token => {
		let password = process.env.NODE_ENV === 'test' ? timesheet.password : cache.get('timesheetPsw');
		return loginCore(timesheet.username, password, token);
	}).catch(() => {
		// console.log('--');
		// console.log(err);
	});
};
