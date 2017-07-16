const levenshtein = require('fast-levenshtein');
const conf = require('../config');

/**
 * Function to get matchness of key wrt pool object
 * if close enough, returns the corresponding issue-id
 * else if not close enough, returns null;
 */
module.exports = (key, pool) => {
    // distance store
    let distances = [];

    // sorted whitespace removed lowercased key text;
    key = key.toLowerCase().replace(/ /g, '').split('').sort().join('');

    pool.forEach(issue => {
        // sorted whitespace removed lowercased issue text;
        let subject = issue.issue.subject.toLowerCase().replace(/ /g, '').split('').sort().join('');
        distances.push(levenshtein.get(key, subject));
    });
    let minDist = Math.min(...distances);

    // if there is no required matchness return null
    if (minDist > +conf.issueMatchingInsensitivity)
        return null;

    // else get corresponding issue id;
    let idxOfMin = distances.indexOf(minDist);
    let issueId = pool[idxOfMin].issue.id;

    return issueId;
};