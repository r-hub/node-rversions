
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

    var all = await Promise.all([rel, bch]);

    var major = all[0].version.replace(/^([0-9]+)\.[0-9]+.*$/, '$1');
    var minor = all[0].version.replace(/^[0-9]+\.([0-9]+).*$/, '$1');

    var cnd = '' + major + '-' + (Number(minor) + 1) + '-branch';

    var ok = false;
    for (let i = all[1].length - 1; i > 0; i--) {
        if (cnd == all[1][i].branch) {
            ok = true;
            break
        }
    }

    if (!ok) {
        // No release branch, then return devel
        var value = all[0];
        value.date = null;
        value.type = 'patched';
        value.url = 'https://cran.r-project.org/src/base-prerelease/R-latest.tar.gz';
        mycache.set('r_next', value);
        return value;

    } else {
        const url1 = urls["branch"].replace("%s", "R-" + cnd);
        const url2 = urls["branch_nick"].replace("%s", "R-" + cnd);
        const p1 = got(url1);
        const p2 = got(url2);
        var all = await Promise.all([p1, p2]);

        var verstr = all[0].body.trim();
        var ver = verstr.split(' ')[0];
        var type = verstr.split(' ')[1].trim();
        if (type == '') { type = null; }
        var nick = all[1].body.trim();
        if (nick == '') { nick = null; }

        const value = {
            'version': ver,
            date: null,
            'nickname': nick,
            'type': type,
            'url': 'https://cran.r-project.org/src/base-prerelease/R-latest.tar.gz'
        }

        mycache.set('r_next', value);
        return value;
    }
}

module.exports = r_next;
