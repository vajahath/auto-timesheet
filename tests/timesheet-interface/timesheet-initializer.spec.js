/*eslint no-undef: 0*/

const timesheetInit = require('../../src/timesheet-interface/timesheet-initializer');
const login = require('../../src/timesheet-interface/login');

describe('testing timesheet initializer', () => {
	it('should resolve successfully', done => {
		login()
			.then(() => (timesheetInit()))
			.then(() => done())
			.catch(err => done(err));
	});
});
