
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const linux_builds_posit = require('./linux-builds-posit');
const linux_builds_arm64 = require('./linux-builds-arm64');
const linux_filenames = require('./linux-filenames');
const linux_map = require('./linux-platform-map');
const resolve = require('./resolve');
const regex_match_map = require('./regex-match-map');

async function available_os_linux_posit(os, cache, osdata, arch) {
    // os is canonical here already, no need to check 'implementation'
    const distro = os.split('-')[0];
    const fn = linux_filenames.posit[distro];
    const pbar = r_versions_bare(cache);
    const pbld = linux_builds_posit(cache);
    const pnxt = resolve('next', 'linux-' + os, arch, cache);
    const pdev = resolve('devel', 'linux-' + os, arch, cache);
    var res = await Promise.all([
        /* 0 */ pbar,
        /* 1 */ pbld,
        /* 2 */ pnxt,
        /* 3 */ pdev
    ]);

    var dates = {};
    res[0].map(function(v) {
        dates[v.version] = v.date;
    });

    var av = res[1].map(function(v) {
        const fno = fn
            .replaceAll("{arch}", arch)
            .replaceAll("{aarch}", arch == "amd64" ? "x86_64" : "aarch64");
        return {
            version: v,
            date: dates[v] || null,
            name: v,
            type: (v != "next" && v != "devel") ? "release" : v,
            url: "https://cdn.posit.co/r/" + os + "/pkgs/" +
                fno.replaceAll("{ver}", v)
        }
    });

    // filter for first-build
    const key = arch == "amd64" ? 'first-build' : 'aarch64-first-build';
    if (!!osdata[key]) {
        av = av.filter(x => x['version'] >= osdata[key]);
    }

    // filter for retired distros
    const key2 = arch == "amd64" ? 'last-build' : 'aarch64-last-build';
    if (!!osdata.retired) {
        av = av.filter(x => x['version'] <= osdata[key2]);
    }

    // add version number to next, devel
    for (let i = 0; i < av.length; i++) {
        if (av[i].version == 'next') {
            av[i].version = res[2].version;
            av[i].type = res[2].nexttype;
        } else if (av[i].version == 'devel') {
            av[i].version = res[3].version;
        }
    }

    return av;
}

async function available_os_linux_rhub(os, cache) {
    const distro = os.split('-')[0];
    const release = os.split('-')[1];
    const pbar = r_versions_bare(cache);
    const pbld = linux_builds_arm64(cache);
    const pnxt = resolve('next', 'linux-' + os, 'arm64', cache);
    const pdev = resolve('devel', 'linux-' + os, 'arm64', cache);
    var all = await Promise.all([
        /* 0 */ pbar,
        /* 1 */ pbld,
        /* 2 */ pnxt,
        /* 3 */ pdev
    ]);

    const rvers = all[0];
    const ratelimit = all[1].rateLimit;
    const rbuilds = all[1].repository.releases.nodes;
    const tags = rbuilds.map(t => {
        return t.tagName.replace(/^v/, "");
    });

    var dates = {};
    rvers.map(function(v) {
        dates[v.version] = v.date;
    });

    const url = linux_filenames.github[distro];
    var av = rbuilds.map(function(v) {
        const ver = v.tagName.replace(/^v/, "");
        const assets = v.releaseAssets.nodes;
        const urls = assets.map(x => { return x.downloadUrl; });
        const candurl = url
            .replaceAll('{ver}', ver)
            .replaceAll('{rel}', release)
            .replaceAll('{arch}', 'arm64')
            .replaceAll('{aarch}', 'aarch64');
        if (urls.indexOf(candurl) != -1) {
            return {
                version: ver,
                date: dates[ver] || null,
                name: ver,
                type: (ver != "next" && ver != "devel") ? "release" : ver,
                url: candurl
            };
        } else {
            return null;
        }
    });

    av = av.filter(function(x) { return x !== null; });

    // add version number to next, devel
    for (let i = 0; i < av.length; i++) {
        if (av[i].version == 'next') {
            av[i].version = all[2].version;
            av[i].type = all[2].nexttype;
        } else if (av[i].version == 'devel') {
            av[i].version = all[3].version;
        }
    }

    // sort according to version numbers, next and devel last
    av = av.sort(function(a, b) {
        a = a.version;
        b = b.version;

        if (a == b) { return 0; }

        if (semver.gt(a, b)) {
            return 1;
        } else {
            return -1;
        }
    });

    return av;
}

async function available_os_linux(os, arch, cache = true) {
    const oos = os;
    var archlc = (arch || "amd64").toLowerCase();
    if (archlc == "amd64" || archlc == "x86_64") {
        arch = "amd64";
    } else if (archlc == "arm64" || archlc == "aarch64") {
        arch = "arm64"
    } else {
        throw new Error("Unsupported Linux arch: '" + arch + "'.");
    }

    os = os.replace(/^linux-?/, "")
        .replace(/^dietlibc-/, "")
        .replace(/^gnu-/, "")
        .replace(/^musl-/, "")
        .replace(/^uclibc-/, "")
        .replace(/^unknown-/, "");

    os2 = regex_match_map(linux_map, os);
    if (os2 == undefined) {
        throw new Error("Unknown Linux distro: '" + oos + "'.");
    }

    const osdata = linux_map.find(x => x.id == os2);
    if (arch == "amd64" || osdata.aarch64 === true) {
        return available_os_linux_posit(os2, cache, osdata, arch);
    } else if (arch == "arm64") {
        return available_os_linux_rhub(os2, cache);
    }

}

module.exports = available_os_linux;
