const request = require('request');
const Promise = require('bluebird');
const { getSerializedCookies, updateCookies } = require('../cookie-handler');
const { getAuthenticityToken } = require('../token-handler');
const conf = require('../../config');
const reqOptions = require('../../config').timesheet.loadIssuesRq;

module.exports = () => {
    return new Promise((resolve, reject) => {
        let cookies = getSerializedCookies();
        let authenticityToken = getAuthenticityToken();

        if (!cookies || !authenticityToken)
            return reject(new Error('No enough data in cache'));

        // set cookies and token
        reqOptions.headers.Cookie = cookies;
        reqOptions.headers['X-CSRF-Token'] = authenticityToken;
        reqOptions.form = {
            project: conf.projectId
        };

        request(reqOptions, (err, res, body) => {
            if (err) return reject(err);
            if (res.statusCode !== 200) return reject(new Error('status: ' + res.statusCode));

            updateCookies(res.headers['set-cookie']);

            body = JSON.parse(body);

            resolve(body);
        });
    });
};