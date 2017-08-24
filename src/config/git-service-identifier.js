const chalk = require('chalk');
const conf = require('./conf-loader');

if (conf['git-service'] !== 'github' && conf['git-service'] !== 'gitlab') {
	console.log(
		chalk.red('\nConfig Err: ') +
			`Invalid 'git-service' field found in configuration file! (${conf[
				'git-service'
			]})`
	);
	console.log(
		'Possible values: ' +
			chalk.yellow('github') +
			', ' +
			chalk.yellow('gitlab') +
			'\n'
	);
	process.exit(1);
}

console.log(
	chalk.gray('Git-service selected: ') + chalk.yellow(conf['git-service'])
);

module.exports = conf['git-service'];
