
const lodash = require('lodash');

const cache = { };
const valid = parseInt(
    process.env.R_VERSIONS_CACHE_LIMIT  ||
    5 * 60 * 1000    // five minutes in ms
);

function cache_get(key) {
    const record = cache[key];
    if (record === undefined) { return undefined; }
    const now = new Date();
    if (now - record.timestamp > valid) {
        delete cache[key];
        return undefined;
    }
    return lodash.cloneDeep(record.value);
}

function cache_set(key, value, now) {
    if (value === undefined) {
        delete cache[key];
    } else {
        if (now === undefined) { now = new Date(); }
        cache[key] = { value: value, timestamp: now };
    }
}

module.exports = {
    set: cache_set,
    get: cache_get,
    del: cache_set              // this is the same, we just omit 'value'
};
