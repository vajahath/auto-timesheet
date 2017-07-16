/*eslint no-undef: 0*/
const expect = require('chai').expect;
const filterCommits = require('../../src/git-handlers/filter-commits');

describe('Filtering commit messages', () => {
	it('Filtering array of commit messages', done => {
		filterCommits().then(msg => {
			let length = 0;
			msg.forEach(function(m) {
				length = length + m.length;
			});
			expect(msg).to.be.length(5);
			// console.log(length);
			expect(length).to.be.at.least(120);
			done();
		}).catch(err => {
			done(err);
		});
	});
});
