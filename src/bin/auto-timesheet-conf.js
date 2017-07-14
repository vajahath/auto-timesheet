#!/usr/bin/env node

const editor = require('editor');

editor('credentials/config.json', function(code) {
	if (code !== 0) throw new Error('something went wrong while saving configuration');

	console.log('done!');
	console.log('------------------------------------------------');
	console.log('run `auto-timesheet set-cred` to set credentials');
	console.log('run `auto-timesheet start` to start the app');
	console.log('------------------------------------------------enjoy');
});
