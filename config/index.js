const conf = require('app-root-path').require('credentials/config.json');
const timesheetConf = require('./timesheet.conf');

let setupInfo = {};

Object.assign(setupInfo, timesheetConf, conf);

module.exports = setupInfo;
