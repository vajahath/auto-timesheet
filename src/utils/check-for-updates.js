const updateAvailable = require('update-available');
const chalk = require('chalk');
const catMe = require('cat-me');
const lme = require('lme');

module.exports = (callback) => {
	updateAvailable()
		.then(result => {
			if (result.updateAvailable) {
				catMe('approaching');
				console.log(chalk.yellow.bold('"OMG!! You\'ve an update available !!"'));
				console.log(chalk.gray(`( v${result.currentVersion} -> v${result.latestVersion} )`));
				console.log(chalk.gray('to update, run ') + chalk.green.bold('npm install -g auto-timesheet'));
			}
			callback();
		})
		.catch(err => {
			lme.e('something went wrong while tried to check for updates..');
			console.log('if you are frequently seeing this, consider reporting this \nas an issue along with the err msg at github.com/vajahath/auto-timesheet');
			console.log(err);
		});
};
