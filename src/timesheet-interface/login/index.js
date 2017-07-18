const loginCore = require('./login');
const getToken = require('./token-extractor');
const { username } = require('../../config/conf-loader').config.timesheet;
const cache = require('../../cache');

module.exports = () => {
    return getToken().then(token => {
        let password = cache.get('timesheetPsw');
        return loginCore(username, password, token);
    }).catch(() => {
        // console.log('--');
        // console.log(err);
    })
};