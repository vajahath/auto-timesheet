# auto-timesheet
Add redmine timesheet automatically and periodically.

[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/auto-timesheet/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> package is in beta

![](https://cdn.dribbble.com/users/92827/screenshots/2652793/lab-icon.png)

# Draft

Ok, so as per the inspection ultimately we want to mack a browser request.

here is the proposed checklist:
- [x] initial prototype for adding entry in timesheet.
- [x] inspect login process and mock it with program
- [x] mock the timesheet adding process via program
- [ ] automatically detect issues and attach it
- [ ] fetch commits from github and use it as messages
## How to get started with this?
*(this will be changed/simplified in future releases)*

- Clone this repo
- `npm install` or `yarn install`
- Make `./credentials/config.json` with the following content. (remember to put any credentials at `./credentials` folder which will be ignored by Git)
```json
{
	"timesheet": {
		"username": "<your-username-for-timesheet>",
		"password": "<your-password-for-timesheet>"
	}
}

```
- adjust values of `start_time`, `end_time`,`task[detail]`, `project_id` etc. in `./src/timesheet-adder.js` to add them.
- to test `npm test`.

## Found any issues?
rise an issue.

# Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
