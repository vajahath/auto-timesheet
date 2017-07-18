const request = require('request');
const Promise = require('bluebird');
const { updateAuthenticityToken } = require('../token-handler');
const { getSerializedCookies, updateCookies } = require('../cookie-handler');
const reqOptions = require('../config/timesheet-config.json').timesheet.timesheetInitRq;

module.exports = () => {
    return new Promise((resolve, reject) => {
        let cookies = getSerializedCookies();
        if (!cookies) return reject(new Error('No cookies'));

        // set cookies
        reqOptions.headers.Cookie = cookies;
        // lme.s(reqOptions);
        request(reqOptions, (err, res, body) => {
            if (err) return reject(err);
            if (res.statusCode !== 200) return reject(new Error('status: ' + res.statusCode));

            // some silly checks to confirm that it is the intended page.
            // (keys gotten from inspecting the intended page)
            if (!body.includes('accesskey') ||
                !body.includes('<option value=') ||
                !body.includes('new_user_activity')) {
                throw new Error('Looks like timesheet page can\'t load');
            }

            updateCookies(res.headers['set-cookie']);
            updateAuthenticityToken(body);

            resolve();
        });
    });
};