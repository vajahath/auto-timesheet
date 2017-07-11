/*eslint no-undef:0*/
const login = require('../../src/login');
const loadIssues = require('../../src/commits/load-timesheet-issues');
const timesheetInit = require('../../src/timesheet-initializer');

describe('testing issue loader for timesheet', () => {
	it('should successfully login', done => {
		login()
			.then(() => done())
			.catch(err => done(err));
	});

	it('successfully initialize timesheet', done => {
		timesheetInit()
			.then(() => done())
			.catch(err => done(err));
	});

	it('should load issues for project', done => {
		loadIssues()
			.then(() => {
				return done();
			})
			.catch(err => (done(err)));
	});
});
