const conf = require('./lazy-conf-loader');
const chalk = require('chalk');
const jsonfile = require('jsonfile');
const configFilePath = require('./config-file-path');

let newConf;

if (conf['config-file-version'] === 2) {
	console.log(
		chalk.green(
			'\nYour configuration file is already in the compatible version!\n'
		)
	);
	process.exit(0);
}

// migrate from `null` to version 2
if (!conf['config-file-version']) {
	newConf = {
		'config-file-version': 2,
		projectId: conf.projectId,
		activityInterval: conf.activityInterval,
		defaultIssue: conf.defaultIssue,
		'git-service': '`github` OR `gitlab`',
		config: {
			timesheet: {
				username: conf.config.timesheet.username
			},
			github: {
				url: conf.config.git.url,
				username: conf.config.git.username,
				commitAuthorEmail: conf.config.git.commitAuthorEmail
			},
			gitlab: {
				url:
					'http://<host(eg:192.168.1.55)>/api/v4/projects/<project_id(eg: 80. look this at the settings page of your repo OR ask repo owner)>/repository/commits',
				commitAuthorEmail: '<email-of-the-committer-to-filter>',
				'PRIVATE-TOKEN':
					'<your gitlab private token. look at your profile page>'
			}
		},
		help: 'Refer docs to know more about all these fields/ rise an issue',
		issueMatchingInsensitivity: 5
	};
} else {
	console.log(
		chalk.red(
			'\nSomething went wrong. Please report this issue at https://github.com/vajahath/auto-timesheet/issues \n'
		)
	);
	console.log(
		chalk.yellow('For now, You can run ') +
			chalk.blue('`auto-timesheet reset`') +
			chalk.yellow(
				' to get a fresh start.\nAlso try updating the app with '
			) +
			chalk.blue('`npm i -g auto-timesheet`') +
			'.'
	);

	process.exit(1);
}

// write config out
module.exports = () => {
	console.log(chalk.grey('\n > Attempting to migrate ...\n'));
	jsonfile.writeFileSync(configFilePath, newConf, { spaces: 2 });
	console.log(chalk.green(' > Done!\n'));
	console.log(
		chalk.yellow(' > Now run ') +
			chalk.white('`auto-timesheet conf` ') +
			chalk.yellow(
				'to \n   see the configuration file and edit it appropriately.\n'
			)
	);
};
