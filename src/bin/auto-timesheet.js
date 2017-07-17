#!/usr/bin/env node

const program = require('commander');
const version = require('../../package.json').version;

program
    .version(version)
    .command('conf', 'configure stuff')
    .command('start', 'start application')
    .parse(process.argv);