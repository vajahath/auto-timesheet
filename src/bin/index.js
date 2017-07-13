#!/usr/bin/env node

const program = require('commander');
const cv = require('current-version');

program
	.version(cv().version)
	.command('config', 'configure stuff')
	.command('start', 'configure stuff')
	.parse(process.argv);
