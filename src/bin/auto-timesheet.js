#!/usr/bin/env node

const program = require('commander');
const getVersion = require('installed-version');

program
	.version(getVersion('auto-timesheet'))
	.command('cred', 'set credentials')
	.command('conf', 'configure stuff')
	.command('start', 'start application')
	.parse(process.argv);
