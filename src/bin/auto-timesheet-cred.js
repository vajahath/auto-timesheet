#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const editor = require('editor');
const rootPath = require('app-root-path');
const credGen = rootPath.require('src/utils/cred-template-generator');

try {
	// check if the credentials exists or not
	let cred = rootPath.require('credentials/credentials');
	openEditor()
} catch (err) {
	if (err instanceof SyntaxError) openEditor();
	// make the file with initial values
	else credGen(openEditor)
}

function openEditor() {
	return editor('credentials/credentials.json', function(code, sig) {
		console.log('You\'ve edited credentials successfully!');
		console.log('------------------------------------------------');
		console.log('run `auto-timesheet config` to configure app');
		console.log('run `auto-timesheet start` to start the app');
		console.log('------------------------------------------------enjoy');
	});
}
