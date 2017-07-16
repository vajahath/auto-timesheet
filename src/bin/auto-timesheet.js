#!/usr/bin/env node

const program = require('commander');

program
    .version('1.0.0')
    .command('cred', 'configure stuff')
    .command('conf', 'configure stuff')
    .command('start', 'configure stuff')
    .parse(process.argv);