/*eslint no-undef: 0*/
const expect = require('chai').expect;
const login = require('../../src/login');

describe('Testing integrated login', () => {
	it('should login successfully while calling the single login fn', done => {
		login().then(res => {
			expect(res.statusCode).to.equal(302);
			done();
		}).catch(err => done(err));
	});
});
