
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');
const DOMParser = require('@xmldom/xmldom');

async function r_devel_win(cache = true, arch = "x86_64") {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_devel_win_' + arch); }
    if (cached !== undefined) { return cached; }

    const p1 = got(urls.devel);
    const p2 = got(urls.devel_nick);
    const p3 = got(urls.devel_win);

    var all = await Promise.all([p1, p2, p3]);
    var srcver = all[0].body.trim().split(' ')[0];
    var nick = all[1].body.trim();
    var binver;
    // In case the format of the web page changes, we fall back to the
    // version number in SVN.
    try {
        binver = all[2].body
            .match(/^.*which will eventually become\sR-([0-9.]+)[)].*$/m)[1];
    } catch (err) {
        binver = srcver;
    };
    var file;
    if (arch == "aarch64") {
        const promu = got(urls.devel_win_arm64);
        const tex = await promu.text();
        const doc = new DOMParser().parseFromString(tex, 'text/html');
        file = doc.documentElement.getElementsByTagName('a')[1].attributes['0'].nodeValue;
    }
    const url = arch == "x86_64" ?
    "https://cran.rstudio.com/bin/windows/base/R-devel-win.exe":
    "https://www.r-project.org/nosvn/winutf8/aarch64/prerelease/" + file;
    const value = {
        'version': binver,
        date: null,
        'nickname': nick,
        'URL': url
    };

    mycache.set('r_devel_win_' + arch, value);
    return value;
}

module.exports = r_devel_win;
