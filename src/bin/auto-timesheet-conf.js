#!/usr/bin/env node

const path = require('path');
const editor = require('editor');
const confGen = require('../config/conf-template-generator');
const home = require('user-home');

const configFile = path.join(home, '/.auto-timesheet.config.json');

try {
    // check if the conf exists or not
    require(configFile);
    console.log('config file found: opening editor..');
    openEditor();
} catch (err) {
    if (err instanceof SyntaxError) {
        console.log('syntax err found in the config file > regenerating ...');
    }
    // make the file with initial values
    else {
        console.log('Initializing credentials ...');
    }
    confGen(configFile, openEditor);
}

function openEditor() {
    console.log('opening editor');
    return editor(configFile, function(code) {
        if (code !== 0) throw new Error('something went wrong while saving configuration');

        console.log('You\'ve edited config successfully!');
        console.log('------------------------------------------------');
        console.log('run `auto-timesheet start` to start the app');
        console.log('------------------------------------------------enjoy');
    });
}