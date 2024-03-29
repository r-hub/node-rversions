
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const r_release       = require('./r-release');
const r_release_win   = require('./r-release-win');
const r_next_win      = require('./r-next-win');
const r_devel_win     = require('./r-devel-win');

function get_release_url(version) {
    if (version == "2.0.0") {
        return "https://cran-archive.r-project.org/bin/windows/base/old/2.0.0/rw2000.exe";
    } else if (version == "2.0.1") {
        return "https://cran-archive.r-project.org/bin/windows/base/old/2.0.1/rw2001.exe";
    } else if (version == "2.1.0") {
        return "https://cran-archive.r-project.org/bin/windows/base/old/2.1.0/rw2010.exe";
    } else if (version == "2.1.1") {
        return "https://cran-archive.r-project.org/bin/windows/base/old/2.1.1/rw2011.exe";
    } else if (semver.lt(version, "2.11.0")) {
        return `https://cran-archive.r-project.org/bin/windows/base/old/${version}/R-${version}-win32.exe`;
    } else if (semver.lt(version, "2.12.0")) {
        return `https://cran-archive.r-project.org/bin/windows/base/old/${version}/R-${version}-win64.exe`;
    } else if (version == "3.2.4") {
        return "https://cran-archive.r-project.org/bin/windows/base/old/3.2.4/R-3.2.4revised-win.exe";
    } else if (semver.lt(version, "4.0.0")) {
        return `https://cran-archive.r-project.org/bin/windows/base/old/${version}/R-${version}-win.exe`
    } else {
        return `https://cran.rstudio.com/bin/windows/base/old/${version}/R-${version}-win.exe`
    }
}

async function available_os_win(cache = true) {
    const pver = r_versions_bare(cache);
    const prel = r_release(cache);
    const prwn = r_release_win(cache);
    const pnxt = r_next_win(cache);
    const pdev = r_devel_win(cache);

    var res = await Promise.all([
        /* 0 */ pver,
        /* 1 */ prel,
        /* 2 */ prwn,
        /* 3 */ pnxt,
        /* 4 */ pdev
    ]);

    // Only versions from 2.0.0
    var av = res[0].filter(function(v) {
        var ver = v.version;
        if (!semver.valid(ver)) {
            ver = ver + '.0';
        }
        return semver.gte(ver, "2.0.0");
    });

    av = av.map(function(v) {
        v.name = v.version;
        v.type = "release";
        v.url = get_release_url(v.version);
        return v;
    })

    // if the last release does not have a tarball yet, we drop it
    if (res[1].version != res[2].version) {
        av = av.filter(function(v) { return v.version != res[1].version; });
    }

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
