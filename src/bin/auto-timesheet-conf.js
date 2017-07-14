#!/usr/bin/env node

const editor = require('editor');

editor('credentials/config.json', function(code, sig) {
	console.log('done!');
	console.log('------------------------------------------------');
	console.log('run `auto-timesheet set-cred` to set credentials');
	console.log('run `auto-timesheet start` to start the app');
	console.log('-------------------------------------------enjoy');
});
