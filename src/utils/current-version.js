const cv = require('current-version');

module.exports = () => {
	let v = cv()
	return v;
};
