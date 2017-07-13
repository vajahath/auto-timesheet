const request = require('request');
const Promise = require('bluebird');
const pull = require('app-root-path').require;
const cred = pull('src/conf').git;

/*
 * Function gets last 5 commits of a particular person.
 * Returns array of last 5 commits.
 * 
 * Function returns a Promise which resolves into
 * a particular user's last 5 commits
 */
const getCommits = () => {
	let auth = {
		user: cred.username,
		pass: cred.password,
		sendImmediately: true
	};
	return new Promise((resolve, reject) => {
		request.get(cred.url, {
			'auth': auth,
			'headers': {
				'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36'
			}
		}, (err, res, body) => {
			if (err) return reject(err);
			let commits = JSON.parse(body);

			// filter last 5 commits of a specific person
			let lastCommits = [];
			commits.forEach((committed) => {
				if (lastCommits.length < 5 && committed.commit.author.email === cred.commitAuthorEmail) {
					lastCommits.push(committed);
				} else return;
			});

			return resolve(lastCommits);

		});
	});
};


module.exports = getCommits;
