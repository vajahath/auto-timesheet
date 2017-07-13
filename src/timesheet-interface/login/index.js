const loginCore = require('./login');
const getToken = require('./token-extractor');
const pull = require('app-root-path').require;
const { username, password } = pull('src/conf').timesheet;

module.exports = () => {
	return getToken().then(token => {
		return loginCore(username, password, token);
	});
};
