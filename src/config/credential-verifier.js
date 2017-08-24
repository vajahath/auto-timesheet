const prompt = require('prompt');
const { parallel } = require('async');
const timesheetLogin = require('../timesheet-interface/login');

// identify git service
const gitService = require('./git-service-identifier');
// use the corresponding git service function for getting commits
const getCommits = require(`../git-interfaces/${gitService}/get-commits`);

const Promise = require('bluebird');
const cache = require('../cache');
const chalk = require('chalk');
const ora = require('ora');
const lme = require('lme');

prompt.message = chalk.blue('> Provide ');
prompt.delimiter = chalk.yellow(' ');

let spinner;

const schema = {
	properties: {
		timesheetPsw: {
			description: 'Timesheet password   :',
			required: true,
			hidden: true
		}
	}
};

// if the selected service is github, acquire the github password
if (gitService === 'github') {
	schema.properties.githubPsw = {
		description: 'Git-service password :',
		hidden: true,
		required: true
	};
}

module.exports = () => {
	return new Promise((resolve, reject) => {
		prompt.start();
		prompt.get(schema, function(err, result) {
			if (err) {
				console.log('cancelled');
				process.exit(0);
			}

			// spin your head
			spinner = ora(chalk.grey('Checking the pitch..')).start();

			// set cred
			cache.set('timesheetPsw', result.timesheetPsw);

			if (gitService === 'github') {
				cache.set('githubPsw', result.githubPsw);
			}

			// verify cred
			parallel([validateTimesheetCred, validateGitCred], err => {
				if (err) {
					spinner.fail(chalk.red('Bad pitch..'));
					return reject(err);
				}
				spinner.succeed(chalk.gray('alL loOks goOd!'));
				return resolve();
			});
		});
	});
};

function validateTimesheetCred(cb) {
	timesheetLogin()
		.then(res => {
			if (!res) return cb('TIMESHEET: bad credentials');
			if (res.statusCode === 302) {
				lme.s(' Validated Timesheet');
				return cb();
			}

			return cb(
				'TIMESHEET: Something went wrong, may be bad credentials'
			);
		})
		.catch(err => cb(err));
}

function validateGitCred(cb) {
	getCommits()
		.then(() => {
			lme.s(' Validated Git-service');
			return cb();
		})
		.catch(err => {
			return cb('GIT: ' + err);
		});
}
