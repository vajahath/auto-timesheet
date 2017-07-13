# Guide for Configuration

[Read this github in github](https://github.com/vajahath/auto-timesheet/blob/master/credentials/readme.md)

## Step 1: Setup credentials

Create a `credentials.json` and put the content in following format:
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

## Step 2: Review config.json
This file contains the basic configurations.

`config.json` :
```js
{
  "activityInterval": 7200000, 
  "projectId": "405", 
  "issueMatchingInsensitivity": 5,
  "defaultIssue": "auto-timesheet default"
}
```
- `activityInterval`: interval in milliseconds: Determines the frequency of timesheet adding process. (Default 7200000 (2h))
- `projectId`: Id of the project you are in to. You can get it via a simple inspection of your timesheet page. [help?]()
- `issueMatchingInsensitivity`: This is a magical quantity. You don't have to alter this normally. [Just in case if you are a geek, check [WTH is this!]() guide.
- `defaultIssue`: If the program failed to extract any issues from your commits, it uses this issue

---
**Found any issues?** please rise it as an issue on github.<br>
auto-timesheet