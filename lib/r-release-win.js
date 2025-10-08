
const mycache = require('./cache');
const first_link = require('./first-link');

async function r_release_win(cache = true, arch = 'x86_64') {
    if (arch == "arm64") {
        arch = "aarch64";
    }
    let cached = undefined;
    if (cache) { cached = mycache.get('r_release_win_' + arch); }
    if (cached !== undefined) { return cached; }

    if (arch != 'x86_64' && arch != 'aarch64') {
        throw new Error("Unsupported Windows arch: '" + arch + "'.");
    }

    const value = await first_link(
        arch == 'x86_64' ? 'win' : 'win_arm64',
        'Cannot deduce version of latest Windows installer'
    );

    mycache.set('r_release_win_' + arch, value);
    return value;
}

module.exports = r_release_win;
