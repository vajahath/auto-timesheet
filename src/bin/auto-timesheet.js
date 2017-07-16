#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.31')
    .command('cred', 'configure stuff')
    .command('conf', 'configure stuff')
    .command('start', 'configure stuff')
    .parse(process.argv);