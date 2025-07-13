
const mycache = require('./cache');
const first_link = require('./first-link');
const r_next = require('./r-next');
const r_release = require('./r-release');
const urls = require('./urls');

const got = require('got');
const DOMParser = require('@xmldom/xmldom');

async function r_next_win(cache = true, arch = 'x86_64') {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_next_win_' + arch); }
    if (cached !== undefined) { return cached; }

    var rel = r_release(cache);
    var nxt = r_next(cache);

    var all = await Promise.all([rel, nxt]);
    var value = all[1];
    var url;
    if (arch == "x86_64") {
    url = 'https://cran.rstudio.com/bin/windows/base/R-' +
        all[1].version + all[1].type + '-win.exe';
    } else {
        const promu = got(urls.patched_win_arm64);
        const tex = await promu.text();
        const doc = new DOMParser().parseFromString(tex, 'text/html');
        const file = doc.documentElement.getElementsByTagName('a')[1].attributes['0'].nodeValue;
        url = "https://www.r-project.org/nosvn/winutf8/aarch64/prerelease/" + file;
    }
    ok = false;
    try {
        const resp = await got(url, { method: 'HEAD' });
        ok = true;
    } catch (err) { }

    if (!ok) {
        url = 'https://cran.rstudio.com/bin/windows/base/R-' +
            all[1].version + all[1].type.toLowerCase() + '-win.exe';
        try {
            const resp = await got(url, { method: 'HEAD' });
            ok = true;
        } catch (err) { }
    }

    // pathed might not be there yet, try RC
    if (!ok && all[1].type.toLowerCase() == "patched") {
        url = 'https://cran.rstudio.com/bin/windows/base/R-' +
            all[0].version + "rc" + '-win.exe';
        try {
            const resp = await got(url, { method: 'HEAD' });
            ok = true;
            value.version = all[0].version;
            value.date = null;
            value.nickname = all[0].nickname;
            value.type = "RC";
            value.url = url;
        } catch (err) {
            // skip
        }
    }

    // If the URL for next is not OK, then we serve the patched version
    if (!ok) {
        value.version = all[0].version;
        value.date = null;
        value.nickname = all[0].nickname;
        value.type = 'patched';
        var url = urls.patched_win.replace('%s', value.version + value.type);
        value.URL = url;
    } else {
        value.URL = url;
    }

    mycache.set('r_next_win', value);
    return value;
}

module.exports = r_next_win;
