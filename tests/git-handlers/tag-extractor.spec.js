/*eslint no-undef:0 */

const expect = require('chai').expect;
const tagExtractor = require('../../src/git-handlers/tag-extractor');

describe('testing tag extractor >', () => {
    it('should successfully extract tags of sample string 1', done => {
        let s = 'hello from the other side.. ti#hello hello, hhhh #tt dfhgkjdh';
        expect(tagExtractor(s)).to.be.oneOf(['hello', 'tt']);
        done();
    });

    it('should successfully extract tags of sample string 2', done => {
        let s = 'hello from the other side.. ti#hello., hello';
        expect(tagExtractor(s)).to.equal('hello');
        done();
    });
    it('should return null if nothing found', done => {
        let s = 'hello from the other side.. hello., hello';
        expect(tagExtractor(s)).to.be.null;
        done();
    });
});