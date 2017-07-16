const conf = require('../credentials/index');
const timesheetConf = require('./timesheet.conf');

let setupInfo = Object.assign({}, timesheetConf, conf);

module.exports = setupInfo;
