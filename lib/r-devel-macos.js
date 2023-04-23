
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');

async function r_devel_macos(cache = true, arch = "x86_64") {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_devel_macos_' + arch); }
    if (cached !== undefined) { return cached; }

    const p1 = got(urls.devel);
    const p2 = got(urls.devel_nick);

    var all = await Promise.all([p1, p2]);
    var srcver = all[0].body.trim().split(' ')[0];
    var nick = all[1].body.trim();

    const url = arch == "x86_64" ?
          "https://mac.r-project.org/high-sierra/last-success/R-devel-x86_64.pkg" :
          "https://mac.r-project.org/big-sur/last-success/R-devel-arm64.pkg";

    const value = {
        'version': srcver,
        date: null,
        'nickname': nick,
        'URL': url
    };

    mycache.set('r_devel_macos_' + arch, value);
    return value;
}

module.exports = r_devel_macos;
