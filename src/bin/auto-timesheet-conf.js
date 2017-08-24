#!/usr/bin/env node

const editor = require('editor');
const confGen = require('../config/conf-template-generator');
const chalk = require('chalk');

const configFile = require('../config/config-file-path');

try {
	// check if the conf exists or not
	require(configFile);
	console.log(chalk.gray(' > config file found'));
	openEditor();
} catch (err) {
	if (err instanceof SyntaxError) {
		console.log(chalk.red(' > syntax err found in the config file'));
		console.log(chalk.cyan(' > regenerating file'));
	} else {
		// make the file with initial values
		console.log(chalk.gray(' > Initializing credentials ...'));
	}
	confGen(configFile, openEditor);
}

function openEditor() {
	console.log(chalk.gray(' > opening editor..'));
	return editor(configFile, function(code) {
		if (code !== 0)
			throw new Error('something went wrong while saving configuration');

		console.log(chalk.green(' > You\'ve edited config successfully!'));
		console.log(
			chalk.gray('------------------------------------------------\n')
		);
		console.log(
			'run ' +
				chalk.yellow('`auto-timesheet start`') +
				' to start the app\n'
		);
	});
}
