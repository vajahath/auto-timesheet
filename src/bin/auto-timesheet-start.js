#!/usr/bin/env node

const lme = require('lme');
const app = require('../periodic');
const credVerifier = require('../config/credential-verifier');
const checkUpdates = require('../updates');

credVerifier()
    .then(() => {
        lme.d('auto-timesheet starting...');
        checkUpdates();
        app();
    })
    .catch(err => {
        lme.e(err);
        process.exit(1);
    });