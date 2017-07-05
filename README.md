# auto-timesheet
Add redmine timesheet automatically and periodically.

[![Gitter chat](https://badges.gitter.im/npm-sqlify/gitter.png)](https://gitter.im/auto-timesheet/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

> package is in beta

![](https://cdn.dribbble.com/users/92827/screenshots/2652793/lab-icon.png)

# Draft

Ok, so as per the inspection ultimately we want to mack a browser request.

here is the proposed checklist:
- [x] initial prototype for adding entry in timesheet.
- [ ] inspect login process and mock it with program
- [ ] mock the timesheet adding process via program
- [ ] automatically detect issues and attach it

## How to get started with this?
*(this will be changed/simplified in future releases)*

- Clone this repo
- `npm install` or `yarn install`
- Make `./credentials/config.json` with the following content. (remember to put any credentials at `./credentials` folder which will be ignored by Git)
```json
{
    "Cookie": <value>,
    "X-CSRF-Token": <value>,
    "authenticity_token": <value>
}
```
> **Tip:** Inspect the timesheet-adding-request done from your browser to get the values of those `<value>`s.
- adjust values of `start_time`, `end_time`,`task[detail]`, `project_id` etc. in `./src/index.js` to add them.
- run `npm start`.

## Found any issues?
rise an issue.

# Licence
MIT &copy; [Vajahath Ahmed](https://twitter.com/vajahath7)
