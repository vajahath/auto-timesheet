/*eslint no-undef: 0*/

const expect = require('chai').expect;
const getCommits = require('../../../src/git-interfaces/gitlab/get-commits');

describe('Testing get commits case - for Gitlab', function() {
	it('Getting commits', done => {
		getCommits()
			.then(data => {
				expect(data).to.be.length(5);
				done();
			})
			.catch(err => {
				done(err);
			});
	});
});
