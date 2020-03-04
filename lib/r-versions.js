
const mycache = require('./cache');
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_versions(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_versions'); }
    if (cached !== undefined) { return cached; }
    const ver = await r_versions_bare(cache);
    return Promise.all(ver.map(async function(x) {
        x.nickname = await get_nick(x.version);
        if (cache) { mycache.set('r_versions', x); }
        return x;
    }))
}

module.exports = r_versions;
