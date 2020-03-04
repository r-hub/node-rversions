
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_release() {
    const vers = await r_versions_bare();
    const release = vers.pop();
    release.nickname = await get_nick(release.version);
    return release;
}

module.exports = r_release;
