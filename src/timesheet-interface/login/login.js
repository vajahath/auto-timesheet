const request = require('request');
const Promise = require('bluebird');
const { updateCookies } = require('../../cookie-handler');
const reqOptions = require('../../config/timesheet-config.json').timesheet.loginRq;

module.exports = (username, password, token) => {
    return new Promise((resolve, reject) => {
        // set username and password
        reqOptions.form.username = username;
        reqOptions.form.password = password;
        reqOptions.form.authenticity_token = token;

        request(reqOptions, (err, res) => {
            if (err) return reject(err);
            if (res.statusCode !== 302) return reject('ERR occurred: This is most probably due to invalid timesheet username/password');

            updateCookies(res.headers['set-cookie']);

            resolve({
                statusCode: res.statusCode
            });
        });
    });
};