const cheerio = require('cheerio');
const cache = require('./cache');

function updateAuthenticityToken(body) {
    let page = cheerio.load(body);
    let token = page('input[name="authenticity_token"]').val();
    if (!token) throw new Error('failed to update authenticity_token');

    cache.set('authenticityToken', token);
}

function getAuthenticityToken() {
    return cache.get('authenticityToken');
}

module.exports = {
    getAuthenticityToken,
    updateAuthenticityToken
};