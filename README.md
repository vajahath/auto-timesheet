# auto-timesheet
Add redmine timesheet automatically and periodically.

[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/auto-timesheet/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> package is in beta

![](https://cdn.dribbble.com/users/92827/screenshots/2652793/lab-icon.png)

# Draft

here is the proposed checklist:
- [x] initial prototype for adding entry in timesheet.
- [x] inspect login process and mock it with program
- [x] mock the timesheet adding process via program
- [x] fetch commits from github
- [x] make periodic function
- [x] integrate the entire workflow into the periodic function
- [x] use those commits as messages
- [x] automatically detect issues and attach it
- [ ] add start-time, end-time & date in the request programmatically.
- [ ] export the entire app into a cli
## How to get started with this?
*(this will be changed/simplified in future releases)*

- Clone this repo
- `npm install` or `yarn install`
- Make `./credentials/config.json` with the following content. (remember to put any credentials at `./credentials` folder which will be ignored by Git)
```json
{
	"timesheet": {
		"username": "<username>",
		"password": "<password>"
	},
	"git": {
		"url": "https://api.github.com/repos/:author/:repo/commits",
		"username": "<github-username>",
		"password": "<github-password>",
		"commitAuthorEmail": "<email-of-the-committer-to-be-filtered>"
	}
}

```
- adjust values of `start_time`, `end_time`,`date` etc. in `./src/periodic.js` to add them.
- add required values (including `projectId`) at `./config/config.json`
- to test `npm test`.

## Found any issues?
rise an issue.

# Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
