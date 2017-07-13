const conf = require('./config');
const timesheetConf = require('./timesheet.conf');

let setupInfo = {};

Object.assign(setupInfo, timesheetConf, conf);

module.exports = setupInfo;
