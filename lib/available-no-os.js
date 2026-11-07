
const semver = require('semver');

const r_versions_bare   = require('./r-versions-bare');
const r_release         = require('./r-release');
const r_release_tarball = require('./r-release-tarball');
const r_next            = require('./r-next');
const r_devel           = require('./r-devel');
const drop_unreleased   = require('./drop-unreleased');

const get_release_url = require('./installer-urls').tarball_url;

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
        v.url = get_release_url(v.version, v.semver);
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

    return av
}

module.exports = available_no_os;
