
const mycache = require('./cache');
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_minor(minor, cache = true) {
    let cached = undefined;
    const key = 'r_minor/' + minor;
    if (cache) { cached = mycache.get(key); }
    if (cached !== undefined) { return cached; }

    const versions = await r_versions_bare(cache);
    const version = get_version_from_minor(versions, minor);
    version.nickname = await get_nick(version.version);

    mycache.set(key, version);
    return version;
}

function get_version_from_minor(versions, minor) {
    const minors = versions.map(function(x) {
        return x.version.replace(/^([0-9]+\.[0-9]+).*$/, '$1');
    })

    // The first version that matches the minor is what we want
    for (let i = versions.length - 1; i > 0; i--) {
        if (minors[i] == minor) {
            var ans = versions[i];
            const major = ans.version.replace(/[.].*$/, "");
            ans.URL = "https://cran.rstudio.com/src/base/R-" + major +
                "/R-" + ans.version + ".tar.gz";
            return ans;
        }
    }
    throw new Error("Cannot find minor version " + minor);
}

module.exports = r_minor;

if (process.env['NODE_ENV'] === 'test') {
    r_minor.internals = {
        get_version_from_minor: get_version_from_minor
    };
}
