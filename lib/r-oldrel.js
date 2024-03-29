
const mycache = require('./cache');
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_oldrel(which = 1, cache = true) {
    let cached = undefined;
    const key = 'r_oldrel/' + which;
    if (cache) { cached = mycache.get(key); }
    if (cached !== undefined) { return cached; }

    const versions = await r_versions_bare(cache);
    const oldrel = get_oldrel(versions, which);
    oldrel.nickname = await get_nick(oldrel.version);
    const major = oldrel.version.replace(/[.].*$/, "");
    oldrel.URL = "https://cran.rstudio.com/src/base/R-" + major +
        "/R-" + oldrel.version + ".tar.gz";

    mycache.set(key, oldrel);
    return oldrel;
}

function get_oldrel(versions, which = 1) {
    const minors = versions.map(function(x) {
        return x.version.replace(/^([0-9]+\.[0-9]+).*$/, '$1');
    })

    // The first older version that has a different major.minor version
    // is r-oldrel
    var which2 = which;
    var rlsminor = Number(minors.pop());
    for (let i = versions.length - 2; i > 0; i--) {
        if (Number(minors[i]) != rlsminor) {
            which2--;
            rlsminor = Number(minors[i]);
        }
        if (which2 == 0) return(versions[i]);
    }
    throw new Error("Cannot decude r-oldrel version");
}

module.exports = r_oldrel;

if (process.env['NODE_ENV'] === 'test') {
    r_oldrel.internals = {
        get_oldrel: get_oldrel
    };
}
