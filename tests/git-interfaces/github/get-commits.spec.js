/*eslint no-undef: 0*/
const expect = require('chai').expect;
const getCommits = require('../../../src/git-interfaces/github/get-commits');

describe('Testing get commits case', function() {
	it('Getting commits', done => {
		getCommits().then(data => {
			// console.log(data.length);
			expect(data).to.be.length(5);
			done();
		}).catch(err => {
			// console.log(err);
			done(err);
		});
	});
});
