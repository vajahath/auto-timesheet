const Promise = require('bluebird');
const getCommits = require('../git-interfaces/github/get-commits');

/*
 * Function filters commit messages.
 * Adds space in the absence of 120 characters.
 * Returns array of messages
 */
const filterCommits = () => {
	let commitMsg = [];
	let length = 0;
	return new Promise((resolve, reject) => {
		getCommits().then(data => {
			data.forEach((data) => {

				data.commit.message = data.commit.message.replace(/\n/g, ' - ');
				data.commit.message = data.commit.message.replace(/\t/g, '    ');

				length = length + data.commit.message.length;

				commitMsg.push(data.commit.message);
			});

			if (length < 120) {
				length = 120 - length;
				commitMsg.push(new Array(length).join(' '));
			}
			return resolve(commitMsg);
		}).catch(err => {
			// console.log(err);
			return reject(err);
		});

	});

};


module.exports = filterCommits;
