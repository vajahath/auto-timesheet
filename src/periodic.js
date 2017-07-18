// the periodic invoking function

const lme = require('lme');
const addActivity = require('./timesheet-interface/timesheet-adder');
const login = require('./timesheet-interface/login');
const timesheetInit = require('./timesheet-interface/timesheet-initializer');
const getCommits = require('./git-handlers');
const config = require('./config/conf-loader'); // not credentials

const {
    getDate,
    getEndTime,
    getStartTime,
    initTime
} = require('./time-handler');

module.exports = () => {
    initTime(); // initialize time

    setInterval(() => {
        // data to send
        let params = {
            date: getDate(), // '2017-07-06',
            projectId: config.projectId,
            startTime: getStartTime(), // '10:45:00',
            endTime: getEndTime(), // '11:50:00',
            issueId: null,
            taskDetail: null,
        };

        getCommits()
            // add to timesheet
            .then(data => {
                params.taskDetail = data.msg;
                params.issueId = data.issueId;

                lme.s(params);
                return addActivity(params);
            })
            .then(() => {
                lme.s('activity added');
            }).catch(() => {
                lme.w('couldn\'t add activity. Initialing the alternate process to add it... ;)');
                login()
                    .then(() => (timesheetInit()))
                    .then(() => (addActivity(params)))
                    .catch(err => {
                        throw err;
                    });
            });

    }, +config.activityInterval);
};