const request = require('request');
const Promise = require('bluebird');
const cred = require('../../credentials/commit-auth');


/*

Function gets last 5 commits of a particular person.
Returns array of last 5 commits.

*/
let getCommits = function() {
	return new Promise((resolve, reject) => {
		request.get(cred.site, {
			'auth': cred.auth,
			'headers': cred.header
		}, (err, res, body) => {
			if (err) {
				return reject(err);
			}
			let commits = JSON.parse(body);
			let lastCommits = [];

			commits.forEach((committed) => {

				if (lastCommits.length < 5 && committed.commit.author.name === 'lakshmipriyamukundan') {
					lastCommits.push(committed);
				} else {
					return;
				}

			});

			return resolve(lastCommits);

		});
	});
}


module.exports = getCommits
