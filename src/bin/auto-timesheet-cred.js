#!/usr/bin/env node

const editor = require('editor');
const credGen = require('../utils/cred-template-generator');

try {
    // check if the credentials exists or not
    require('../../credentials/credentials.json');
    openEditor();
} catch (err) {
    if (err instanceof SyntaxError) openEditor();
    // make the file with initial values
    else credGen(openEditor);
}

function openEditor() {
    return editor('credentials/credentials.json', function(code) {
        if (code !== 0) throw new Error('something went wrong while saving configuration');

        console.log('You\'ve edited credentials successfully!');
        console.log('------------------------------------------------');
        console.log('run `auto-timesheet config` to configure app');
        console.log('run `auto-timesheet start` to start the app');
        console.log('------------------------------------------------enjoy');
    });
}