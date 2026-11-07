
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const r_release       = require('./r-release');
const r_release_win   = require('./r-release-win');
const r_next_win      = require('./r-next-win');
const r_devel_win     = require('./r-devel-win');
const drop_unreleased = require('./drop-unreleased');

const { win_url_x86_64, win_url_aarch64 } = require('./installer-urls');

function get_release_url(version, sv, arch = "x86_64") {
    if (arch == "x86_64") {
        return win_url_x86_64(version, sv);
    } else {
        return win_url_aarch64(version, sv);
    }
}

async function available_os_win(arch = "x86_64", cache = true) {
    const pver = r_versions_bare(cache);
    const prel = r_release(cache);
    const prwn = r_release_win(cache, arch);
    const pnxt = r_next_win(cache, arch);
    const pdev = r_devel_win(cache, arch);

    var res = await Promise.all([
        /* 0 */ pver,
        /* 1 */ prel,
        /* 2 */ prwn,
        /* 3 */ pnxt,
        /* 4 */ pdev
    ]);

    // Only versions from 2.0.0 (4.4 for aarch64)
    var av = res[0].filter(function(v) {
        var ver = v.version;
        if (!!v.semver) {
            ver = v.semver;
        } else if (!semver.valid(ver)) {
            ver = ver + '.0';
        }
        var minver = arch == "aarch64" ? "4.4.0" : "2.0.0";
        return semver.gte(ver, minver);
    });

    av = av.map(function(v) {
        v.name = v.version;
        v.type = "release";
        v.url = get_release_url(v.version, v.semver, arch);
        return v;
    })

    // if the last release does not have a tarball yet, we drop it
    av = drop_unreleased(av, res[1], res[2]);

    // add next
    const nxt = {
        version: res[3].version,
        date: res[3].date,
        name: 'next',
        type: res[3].type,
        url: res[3].URL
    };
    av.push(nxt);

    // add devel
    const dev = {
        version: res[4].version,
        date: res[4].date,
        name: 'devel',
        type: 'devel',
        url: res[4].URL
    };
    av.push(dev);

    return av;
}

module.exports = available_os_win;
