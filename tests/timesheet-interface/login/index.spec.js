/*eslint no-undef: 0*/
const expect = require('chai').expect;
const pull = require('app-root-path').require;
const login = pull('src/timesheet-interface/login');

describe('Testing integrated login', () => {
	it('should login successfully while calling the single login fn', done => {
		login().then(res => {
			expect(res.statusCode).to.equal(302);
			done();
		}).catch(err => done(err));
	});
});
