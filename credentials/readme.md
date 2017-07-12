# content of this dir

create a `config.json` and put the content in following format:
```json
{
	"timesheet": {
		"username": "<timesheet-username>",
		"password": "<timesheet-password>"
	},
	"git": {
		"url": "https://api.github.com/repos/:author/:repo/commits",
		"username": "<github-username>",
		"password": "<github-password>",
		"commitAuthorEmail": "<email-of-the-author-to-filter>"
	}
}
```

**Found any issues?** please rise it as an issue on github.