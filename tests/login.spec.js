const expect = require('chai').expect;
const login = require('../src/login');
const conf = require('../src/conf');

describe('testing loin feature', () => {
	it('should successfully login', done => {
		login(conf.timesheet.username, conf.timesheet.password).then(res => {
			expect(res.statusCode).to.equal(302)
			expect(res).to.have.property('setCookie');
			expect(res.setCookie).not.to.be.null;
			expect(res.setCookie).not.to.be.undefined;
			done();
		}).catch(err => done(err))
	})
})
