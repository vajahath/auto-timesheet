const userHome = require('user-home');
const path = require('path');
const fileName = require('../config/internals.json').configFileName;
const chalk = require('chalk');
const lme = require('lme');

const file = path.join(userHome, fileName);

let conf = {};

try {
	console.log(chalk.gray('Loading Formation..'));
	conf = require(file);
	console.log(chalk.gray('Positioning Players..\nDone!'));

} catch (err) {
	if (err instanceof SyntaxError) {
		lme.e('Syntax err found in conf file');
		console.log(chalk.gray('try running ') + chalk.yellow('auto-timesheet conf') + chalk.gray(' again'));
	} else {
		lme.e('couldnt find config file.');
		console.log(chalk.gray('try running ') + chalk.yellow('auto-timesheet conf'));
	}
	process.exit(1);
}

module.exports = conf;
