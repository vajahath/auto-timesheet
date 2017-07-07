// update cached cookies from response header
const cookieParser = require('cookie');
const cache = require('./cache');
const lme = require('lme');

function updateCookies(resSetCookie) {
	// if no cookies stay cool :)
	if (!resSetCookie) return;

	// update cookies
	let currentCookies = cache.get('cookies');
	resSetCookie.forEach(stuff => {
		// parse
		let parsedCookies = cookieParser.parse(stuff);
		// update
		Object.keys(parsedCookies).forEach(key => {
			currentCookies[key] = parsedCookies[key]
		})
	})
	cache.set('cookies', currentCookies);
}

function getSerializedCookies() {
	let storedCookies = cache.get('cookies');
	let serializedCookies = '';

	Object.keys(storedCookies).forEach(cookie => {
		serializedCookies += cookieParser.serialize(cookie, storedCookies[cookie]) + '; ';
	})
	return serializedCookies;
}

module.exports = {
	updateCookies,
	getSerializedCookies
}
