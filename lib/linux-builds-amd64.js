
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');

async function linux_builds_amd64(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('linux_builds_amd64'); }
    if (cached !== undefined) { return cached; }

    var resp = await got(urls.linux_builds_amd64).json();
    const value = resp.r_versions;

    mycache.set('linux_builds_amd64', value);
    return value;
}

module.exports = linux_builds_amd64;
