/*eslint no-undef: 0*/

const serializeErr = require('serialize-error');
const login = require('../../src/timesheet-interface/login');
const addActivity = require('../../src/timesheet-interface/timesheet-adder');
const timesheetInit = require('../../src/timesheet-interface/timesheet-initializer');

describe('testing add activity feature', () => {
    it('should successfully login', done => {
        login()
            .then(() => done())
            .catch(err => done(err));
    });

    it('successfully initialize timesheet', done => {
        timesheetInit()
            .then(() => done())
            .catch(err => done(err));
    });

    it('successfully add an activity: (in fact unsuccessful cz "You  cannot enter a past date"', done => {
        addActivity({
            date: '2017-07-06',
            projectId: '405',
            startTime: '10:45:00',
            endTime: '11:50:00',
            issueId: '18264',
            taskDetail: 'hello                                                                                                                    ',
        }).then(() => {
            done(new Error('passing on bad data'));
        }).catch(err => {
            if (JSON.stringify(serializeErr(err)).includes('You  cannot enter a past date')) return done();
            done(err);
        });
    });
});