/* this can't be run with mocha - so placed here and run with node*/

const periodic = require('../src/periodic');
const lme = require('lme');

lme.line('--');
lme.w('\nTesting periodic function. It won\'t stop until you press Ctrl+C\n');
lme.line('--');


periodic(11000);
