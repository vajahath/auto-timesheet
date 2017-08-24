const path = require('path');
const home = require('user-home');
const fileName = require('./internals.json').configFileName;

const configFile = path.join(home, fileName);

module.exports = configFile;
