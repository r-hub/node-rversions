
const mycache = require('./cache');
const urls = require('./urls');
const r_release = require('./r-release');
const r_branches = require('./r-branches');

const got = require('got');

async function r_next(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_next'); }
    if (cached !== undefined) { return cached; }

    const rel = r_release(cache);
    const bch = r_branches(cache);

    const all = await Promise.all([rel, bch]);
    const release = all[0];
    const branches = all[1];

    // branches are sorter by date, take the last one, and check its VERSION
    const last = "R-" + branches[branches.length - 1].branch;
    const versurl = urls['branch'].replace('%s', last);
    const nickurl = urls['branch_nick'].replace('%s', last);
    try {
        const resps = await Promise.all([got(versurl), got(nickurl)]);
        const verstr = resps[0].body.trim();
        const ver = verstr.split(' ')[0].trim();
        const type = verstr.split(' ')[1].trim().toLowerCase();
        if (type == '') { throw new Error('No type'); }
        const nick = resps[1].body.trim() || null; // empty string to null

        const value = {
            'version': ver,
            date: null,
            'semver': ver,
            'nickname': nick,
            'type': type,
            'URL': 'https://cran.rstudio.com/src/base-prerelease/R-latest.tar.gz'
        }

        mycache.set('r_next', value);
        return value;

    } catch (err) {
        // No release branch, then return patched
        var value = release;
        value.date = null;
        value.type = 'patched';
        value.URL = 'https://cran.rstudio.com/src/base-prerelease/R-latest.tar.gz';
        mycache.set('r_next', value);
        return value;
    }
}

module.exports = r_next;
