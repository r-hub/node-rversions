
const mycache = require('./cache');
const first_link = require('./first-link');
const r_next = require('./r-next');
const r_release = require('./r-release');
const urls = require('./urls');

const got = require('got');

async function r_next_macos(cache = true, arch = 'x86_64') {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_next_macos'); }
    if (cached !== undefined) { return cached; }

    var rel = r_release(cache);
    var nxt = r_next(cache);

    var all = await Promise.all([rel, nxt]);
    var value = all[1];

    var minor = all[1].version.replace(/^([0-9]+[.][0-9]+)[.][0-9]+$/, '$1');
    var url = urls['patched_macos_' + arch].replace('%s', minor);

    var ok = false;
    try {
        const resp = await got(url, { method: 'HEAD' });
        ok = true;
    } catch (err) { }

    // If the URL for next is not OK, then we serve the patched version
    if (!ok) {
        const key = 'patched_macos_' + arch;
        var minor = all[0].version.replace(/^([0-9]+[.][0-9]+)[.][0-9]+$/, '$1');
        var url = urls[key].replace("%s", minor);
        value.version = all[0].version;
        value.date = null;
        value.nickname = all[0].nickname;
        value.type = 'patched';
        value.URL = url;
    } else {
        value.URL = url;
    }
        
    mycache.set('r_next_macos', value);
    return value;
}

module.exports = r_next_macos;
