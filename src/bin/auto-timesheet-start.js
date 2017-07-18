#!/usr/bin/env node

const lme = require('lme');
const app = require('../periodic');
const credVerifier = require('../config/credential-verifier');


credVerifier()
    .then(() => {
        lme.s('auto-timesheet starting...');
        app();
    })
    .catch(err => {
        lme.e(err);
        process.exit(1);
    });