/*eslint no-undef: 0*/

const expect = require('chai').expect;
const pull = require('app-root-path').require;
const login = pull('src/timesheet-interface/login/login');
const conf = pull('src/conf');
const getToken = pull('src/timesheet-interface/login/token-extractor');

describe('testing loin feature', () => {
	it('should successfully login', done => {
		getToken().then(token => {
			return login(conf.timesheet.username, conf.timesheet.password, token);
		}).then(res => {
			expect(res.statusCode).to.equal(302);
			done();
		}).catch(err => done(err));
	});
	it('should un-successfully login for bad username/password', done => {
		getToken().then(token => {
			return login(conf.timesheet.username, 'conf.timesheet.password', token);
		}).then(() => {
			done(new Error('logged in with unsuccessful username/password'));
		}).catch(() => done()); // error is the new sexy !!
	});
});