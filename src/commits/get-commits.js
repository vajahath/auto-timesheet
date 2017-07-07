const request = require('request');
const Promise = require('bluebird');
const cred = require('../../credentials/commit-auth');


/*

Function gets last 5 commits of a particular person.
Returns array of last 5 commits.

*/
let getCommits = function() {
	let auth = {};
	auth.user = cred.auth.user;
	auth.pass = cred.auth.pass;
	auth.sendImmediately = true;
	console.log("auth", auth);
	return new Promise((resolve, reject) => {
		request.get(cred.site, {
			'auth': auth,
			'headers': {
				'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'
			}
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
};


module.exports = getCommits;
