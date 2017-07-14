#!/usr/bin/env node

const program = require('commander');
const cv = require('../utils/current-version');

let v = cv();

program
	.version(v)
	.command('cred', 'configure stuff')
	.command('conf', 'configure stuff')
	.command('start', 'configure stuff')
	.parse(process.argv);
