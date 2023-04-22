
const semver = require('semver');

const r_versions_bare   = require('./r-versions-bare');
const r_release         = require('./r-release');
const r_release_tarball = require('./r-release-tarball');
const r_next            = require('./r-next');
const r_devel           = require('./r-devel');

function get_release_url(version) {
    const oversion = version;
    if (!semver.valid(version)) {
        version = version + '.0';
    }
    const major = semver.major(version);

    if (oversion == "0.99") {
        return "https://cran.r-project.org/src/base/R-0/R-0.99.0a.tgz";
    } else if (oversion == "2.15.1") {
        return "https://cran.r-project.org/src/base/R-2/R-2.15.1-w.tar.gz";
    } else if (oversion == "3.2.4") {
        return "https://cran.r-project.org/src/base/R-3/R-3.2.4-revised.tar.gz";
    } else if (major == 0 || major == 1) {
        return `https://cran.r-project.org/src/base/R-${major}/R-${version}.tgz`
    } else {
        return `https://cran.r-project.org/src/base/R-${major}/R-${version}.tar.gz`
    }
}

async function available_no_os(cache = true) {
    const pver = r_versions_bare(cache);
    const prel = r_release(cache);
    const prtb = r_release_tarball(cache);
    const pnxt = r_next(cache);
    const pdev = r_devel(cache);

    var res = await Promise.all([
        /* 0 */ pver,
        /* 1 */ prel,
        /* 2 */ prtb,
        /* 3 */ pnxt,
        /* 4 */ pdev
    ]);

    var av = res[0].map(function(v) {
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

    return av
}

module.exports = available_no_os;
