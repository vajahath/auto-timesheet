const pull = require('app-root-path').require;
const cache = pull('src/cache');

function getDate() {
	let now = new Date();
	let date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

	// for handling test case
	if (process.env.NODE_ENV === 'test') return '2017-07-06';

	return date;
}

function initTime() {
	let now = new Date();
	let time = `${now.getHours()}:${now.getMinutes()}:00`;
	cache.set('startTime', time);
}

function getStartTime() {
	let startTime = cache.get('startTime');
	if (startTime) return startTime;
	throw new Error('N');
}

function getEndTime() {
	let now = new Date();
	let endTime = `${now.getHours()}:${now.getMinutes()}:00`;
	cache.set('startTime', endTime);
	return endTime;
}

module.exports = {
	getDate,
	initTime,
	getStartTime,
	getEndTime
};
