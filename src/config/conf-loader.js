const userHome = require('user-home');
const path = require('path');
const fileName = require('../config/internals.json').configFileName;

const file = path.join(userHome, fileName);

let conf = {};

try {
    console.log('loading conf');
    conf = require(file);
} catch (err) {
    if (err instanceof SyntaxError) {
        console.log('Syntax err found in conf file');
        console.log('try running `auto-timesheet conf` again');
    } else {
        console.log('couldnt find config file.')
        console.log('try running `auto-timesheet conf`');
    }
    process.exit(1);
}

module.exports = conf;