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
		console.log(
			chalk.gray('try running ') +
				chalk.yellow('auto-timesheet conf') +
				chalk.gray(' again')
		);
	} else {
		lme.e('couldnt find config file.');
		console.log(
			chalk.gray('try running ') + chalk.yellow('auto-timesheet conf')
		);
	}
	process.exit(1);
}

if (!conf['config-file-version'] || conf['config-file-version'] !== 2) {
	console.log(
		chalk.red(
			'\nThe current config file version is incompatible with this version of app.'
		)
	);
	console.log(
		chalk.gray('\nRun ') +
			chalk.yellow('`auto-timesheet migrate` ') +
			chalk.grey(
				'to fix this by \nmigrating your current config into new config.\nyou can always edit configuration by running '
			) +
			chalk.yellow('`auto-timesheet conf`.\n')
	);
	process.exit(1);
}

module.exports = conf;
