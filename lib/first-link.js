
const got = require('got');

const urls = require('./urls');
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function first_link(what, errmsg) {
    const versions = await r_versions_bare();
    const len = versions.length;
    for (let i = 0; i < 3; i++) {
        const v = versions[len - 1 - i];
        const url = urls[what].replaceAll('%s', v.version);
        try {
            // No retry: a failure just means we try the next version, and a
            // got 11 retry timer can throw where no catch can reach it.
            const resp = await got(url, { method: 'HEAD', retry: 0 });
            v.nickname = await get_nick(v.version);
            v.URL = url;
            return v;
        } catch(err) { }
    }

    throw new Error(errmsg);
}

module.exports = first_link;
