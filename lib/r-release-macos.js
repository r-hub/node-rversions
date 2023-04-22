
const mycache = require('./cache');
const first_link = require('./first-link');

async function r_release_macos(cache = true, arch = "x86_64") {
    let cached = undefined;
    const key = 'r_release_macos_' + arch;
    if (cache) { cached = mycache.get(key); }
    if (cached !== undefined) { return cached; }

    const value = await first_link(
        'macos2_' + arch,
        'Cannot deduce version of latest macOS installer'
    );

    mycache.set(key, value);
    return value;
}

module.exports = r_release_macos;
