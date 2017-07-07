const lru = require('lru-cache');

const cache = lru(100);

// some initializations
cache.set('cookies', {});

module.exports = cache;
