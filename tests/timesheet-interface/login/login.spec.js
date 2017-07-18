/*eslint no-undef: 0*/

const expect = require('chai').expect;
const login = require('../../../src/timesheet-interface/login/login');
const conf = require('../../../src/config/conf-loader');
const getToken = require('../../../src/timesheet-interface/login/token-extractor');

describe('testing loin feature', () => {
    it('should successfully login', done => {
        getToken().then(token => {
            return login(conf.config.timesheet.username, conf.config.timesheet.password, token);
        }).then(res => {
            expect(res.statusCode).to.equal(302);
            done();
        }).catch(err => done(err));
    });
    it('should un-successfully login for bad username/password', done => {
        getToken().then(token => {
            return login(conf.timesheet.username, 'conf.timesheet.password', token);
        }).then(() => {
            done(new Error('logged in with unsuccessful username/password'));
        }).catch(() => done()); // error is the new sexy !!
    });
});