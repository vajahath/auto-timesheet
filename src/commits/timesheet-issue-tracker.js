function tagExtractor(msg) {

	let issue;
	issue = msg.match(/\#\w\w+\b/g);
	let random = getRandomInt(0, issue.length - 1);
	let tag = issue[random];
	tag = tag.replace('#', '');
	return tag;

}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = tagExtractor
