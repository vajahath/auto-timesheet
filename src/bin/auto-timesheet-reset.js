#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const configPath = require('../config/config-file-path');

fs.unlinkSync(configPath);

console.log(chalk.green('\nReset complete.\n'));
