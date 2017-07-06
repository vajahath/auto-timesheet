const expect = require('chai').expect;
const login = require('../../src/login');

describe('Testing integrated login', () => {
	it('should login successfully while calling the single login fn', done => {
		login().then(res => {
			expect(res.statusCode).to.equal(302)
			expect(res).to.have.property('setCookie');
			expect(res.setCookie).not.to.be.null;
			expect(res.setCookie).not.to.be.undefined;
			expect(res.setCookie).to.be.string;
			done();
		}).catch(err => done(err));
	})
})
