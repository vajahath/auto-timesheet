const { tagExtractor } = require('../../src/commits/timesheet-issue-tracker');
const expect = require('chai').expect;

describe('testing tag extractor >', () => {
	it('should successfully extract tags of sample string 1', done => {
		let s = `hello from the other side.. ti#hello hello, hhhh #tt dfhgkjdh`;
		expect(tagExtractor(s)).to.be.oneOf(['hello', 'tt']);
		done();
	})
})
