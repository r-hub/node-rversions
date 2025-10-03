
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const r_release       = require('./r-release');
const r_release_mac   = require('./r-release-macos');
const r_next_mac      = require('./r-next-macos');
const r_devel_mac     = require('./r-devel-macos');
const drop_unreleased = require('./drop-unreleased');

function get_release_url_x86_64(version) {
    if (semver.lt(version, "2.15.1")) {
        return `https://cran-archive.r-project.org/bin/macosx/base/R-${version}.pkg`;
    } else if (version == "2.15.1") {
        return "https://cran-archive.r-project.org/bin/macosx/base/R-2.15.1-signed.pkg";
    } else if (semver.lt(version, "3.1.0")) {
        return `https://cran-archive.r-project.org/bin/macosx/base/R-${version}.pkg`;
    } else if (semver.lt(version, "3.2.0")) {
        return `https://cran-archive.r-project.org/bin/macosx/base/R-${version}-mavericks.pkg`;
    } else if (version == "3.2.4") {
        return "https://cran-archive.r-project.org/bin/macosx/base/R-3.2.4-revised.pkg";
    } else if (semver.lte(version, "3.3.3")) {
        return `https://cran-archive.r-project.org/bin/macosx/base/R-${version}.pkg`;
    } else if (semver.lte(version, "3.6.3")) {
        return `https://cran-archive.r-project.org/bin/macosx/el-capitan/base/R-${version}.pkg`;
    } else if (semver.lte(version, "4.2.3")) {
        return `https://cran.rstudio.com/bin/macosx/base/R-${version}.pkg`;
    } else {
        return `https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-${version}-x86_64.pkg`;
    }
}

function get_release_url_arm64(version) {
    return `https://cran.rstudio.com/bin/macosx/big-sur-arm64/base/R-${version}-arm64.pkg`;
}

function get_release_url(version, arch) {
    if (arch == "x86_64") {
        return get_release_url_x86_64(version);
    } else {
        return get_release_url_arm64(version);
    }
}

async function available_os_mac(arch = "x86_64", cache = true) {
    if (arch != "x86_64" && arch != "arm64") {
        throw new Error("Unknown macos arch :'" + arch + "'.");
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
        if (!semver.valid(ver)) {
            ver = ver + '.0';
        }
        return semver.gte(ver, minver);
    });

    av = av.map(function(v) {
        v.name = v.version;
        v.type = "release";
        v.url = get_release_url(v.version, arch);
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
