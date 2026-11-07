
const { NotFoundError } = require('./errors');
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const r_release       = require('./r-release');
const r_release_mac   = require('./r-release-macos');
const r_next_mac      = require('./r-next-macos');
const r_devel_mac     = require('./r-devel-macos');
const drop_unreleased = require('./drop-unreleased');

const { mac_url_x86_64, mac_url_arm64 } = require('./installer-urls');

function get_release_url(version, sv, arch) {
    if (arch == "x86_64") {
        return mac_url_x86_64(version, sv);
    } else {
        return mac_url_arm64(version, sv);
    }
}

async function available_os_mac(arch = "x86_64", cache = true) {
    if (arch == "aarch64") {
        arch = "arm64";
    }
    if (arch != "x86_64" && arch != "arm64") {
        throw new NotFoundError("Unknown macos arch :'" + arch + "'.");
    }

    const pver = r_versions_bare(cache);
    const prel = r_release(cache);
    const prmc = r_release_mac(cache, arch);
    const pnxt = r_next_mac(cache, arch);
    const pdev = r_devel_mac(cache, arch);

    var res = await Promise.all([
        /* 0 */ pver,
        /* 1 */ prel,
        /* 2 */ prmc,
        /* 3 */ pnxt,
        /* 4 */ pdev
    ]);

    var minver = arch == "arm64" ? "4.1.0" : "2.10.0";
    var av = res[0].filter(function(v) {
        var ver = v.version;
        if (!!v.semver) {
            ver = v.semver;
        } else if (!semver.valid(ver)) {
            ver = ver + '.0';
        }
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

module.exports = available_os_mac;
