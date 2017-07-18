#!/usr/bin/env node

const lme = require('lme');
const app = require('../periodic');
const credVerifier = require('../config/credential-verifier');

credVerifier()
    .then(() => {
        console.log('\n');
        app();
    })
    .catch(err => {
        lme.e(err);
        console.log('\n');
        process.exit(1);
    });