const loginCore = require('./login');
const getToken = require('./token-extractor');
const { username, password } = require('../conf').timesheet;

module.exports = () => {
	return getToken().then(token => {
		return loginCore(username, password, token);
	});
};
