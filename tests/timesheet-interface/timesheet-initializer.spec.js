/*eslint no-undef: 0*/

const pull = require('app-root-path').require;
const timesheetInit = pull('src/timesheet-interface/timesheet-initializer');
const login = pull('src/timesheet-interface/login');

describe('testing timesheet initializer', () => {
	it('should resolve successfully', done => {
		login()
			.then(() => (timesheetInit()))
			.then(() => done())
			.catch(err => done(err));
	});
});
