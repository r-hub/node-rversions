
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_versions() {
    const ver = await r_versions_bare();
    return Promise.all(ver.map(async function(x) {
        x.nickname = await get_nick(x.version);
        return x;
    }))
}

module.exports = r_versions;
