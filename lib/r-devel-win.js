
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');

async function r_devel_win(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_devel_win'); }
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

    const value = {
        'version': binver,
        date: null,
        'nickname': nick,
        'URL': "https://cloud.r-project.org/bin/windows/base/R-devel-win.exe"
    };

    mycache.set('r_devel_win', value);
    return value;
}

module.exports = r_devel_win;
