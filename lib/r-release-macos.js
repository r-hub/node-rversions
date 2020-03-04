
const got = require('got');

const urls = require('./urls');
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_release_macos() {
    const versions = await r_versions_bare();
    for (let i = 0; i < 3; i++) {
        const v = versions.pop();
        const url = urls.macos.replace('%s', v.version);
        try {
            const resp = await got(url, { method: 'HEAD' });
            v.nickname = await get_nick(v.version);
            v.URL = url;
            return v;
        } catch(err) { }
    }

    throw new Error("Cannot deduce version of latest macOS installer");
}

module.exports = r_release_macos;
