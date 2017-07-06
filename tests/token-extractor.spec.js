const expect = require('chai').expect;
const getToken = require('../src/token-extractor');

describe('Testing token-extractor', () => {
	it('should return authenticity_token extracted from the page', done => {
		getToken()
			.then(token => {
				expect(token).not.to.be.null;
				expect(token).not.to.be.undefined;
				done();
			})
			.catch(err => {
				done(err);
			})
	});
});
