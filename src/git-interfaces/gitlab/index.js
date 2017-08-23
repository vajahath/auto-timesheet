const filterCommits = require('./filter-commits');
const tagExtractor = require('../../tag-extractor');
const loadTimesheetIssues = require('../../timesheet-interface/load-timesheet-issues');
const getClosestMatchingIssueId = require('../../levenshtein-distance');
const conf = require('../../config/conf-loader');

let timesheetIssues = [];

/**
 * This module returns a  Promise -
 * which resolves into timesheet msg, corresponding issue id
 */
module.exports = () => {
	return new Promise((resolve, reject) => {
		loadTimesheetIssues()
			.then(data => {
				timesheetIssues = data;
				return filterCommits();
			})
			.then(commits => {
				let msg = commits.join(', '); // timesheet msg
				let issue = tagExtractor(msg); // extracted issue

				// if no issues, set the default one
				if (!issue) issue = conf.defaultIssue;

				// get closeness of issues
				let issueId = getClosestMatchingIssueId(issue, timesheetIssues);
				if (
					issueId !== null // this check is necessary cz, it can return 0
				)
					return resolve({
						msg: msg,
						issueId: issueId
					});

				// else return the original issue as the plain text. it'll create a new issue at backend;
				return resolve({
					msg: msg,
					issueId: issue
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};
