const prompt = require('prompt');
const { parallel } = require('async');
const timesheetLogin = require('../timesheet-interface/login');
const getCommits = require('../git-interfaces/github/get-commits');
const Promise = require('bluebird');
const cache = require('../cache');
const chalk = require('chalk');

prompt.message = chalk.blue('> Provide ');
prompt.delimiter = chalk.yellow(' ');

const schema = {
    properties: {
        timesheetPsw: {
            description: 'Timesheet password   :',
            required: true,
            hidden: true,
        },
        gitPsw: {
            description: 'Git-service password :',
            hidden: true,
            required: true
        }
    }
};

module.exports = () => {
    return new Promise((resolve, reject) => {
        prompt.start();
        prompt.get(schema, function(err, result) {
            if (err) {
                console.log('cancelled');
                process.exit(0)
            }

            // set cred
            cache.set('timesheetPsw', result.timesheetPsw);
            cache.set('gitPsw', result.gitPsw);

            // verify cred
            parallel([validateTimesheetCred, validateGitCred], err => {
                if (err) {
                    return reject(err);
                }
                console.log('success!');
                return resolve();
            })
        });

    })
}

function validateTimesheetCred(cb) {
    timesheetLogin()
        .then(res => {
            if (!res) return cb('TIMESHEET: bad credentials');
            if (res.statusCode === 302) {
                console.log('validated timesheet');
                return cb();
            }

            return cb('TIMESHEET: Something went wrong, may be bad credentials');
        })
        .catch(err => (cb(err)));
}

function validateGitCred(cb) {
    getCommits()
        .then(data => {
            console.log('validating git');
            return cb();
        })
        .catch(err => {
            return cb('GIT: ' + err);
        });
}