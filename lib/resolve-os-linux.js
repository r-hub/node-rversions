
const semver = require('semver');

const r_versions_bare = require('./r-versions-bare');
const r_devel = require('./r-devel');
const r_minor = require('./r-minor');
const r_next = require('./r-next');
const r_oldrel = require('./r-oldrel');
const r_release_linux_arm64 = require('./r-release-linux-arm64');
const linux_map = require('./linux-platform-map');
const linux_builds_amd64 = require('./linux-builds-amd64');
const linux_builds_arm64 = require('./linux-builds-arm64');
const linux_filenames = require('./linux-filenames');
const get_nick = require('./get-nick');
const regex_match_map = require('./regex-match-map');

async function resolve_os_linux_x86_64(version, os, cache) {
    var ver = {};
    const fn = linux_filenames.x86_64[os];

    if (version == "devel") {
        // TODO: devel is always available, but we are not always sure what
        // version of R it is. Nevertheless we take the version number
        // from SVN
        const devel = await r_devel(cache);
        ver["version"]  = devel["version"];
        ver["nickname"] = devel["nickname"];
        ver["type"]     = "devel";
        ver["url"]      =
            "https://cdn.posit.co/r/" + os + "/pkgs/" +
            fn.replace("{}", "devel");
        ver["date"]     = devel["date"];

    } else if (version == "next") {
        // TODO: next is always available, but the version number might be
        // off when R changes the 'next' version, and we don't yet have
        // the latest builds available.
        const next = await r_next(cache);
        ver["version"]  = next["version"];
        ver["nickname"] = next["nickname"];
        ver["type"]     = "next";
        ver["nexttype"] = next["type"];
        ver["url"]      =
            "https://cdn.posit.co/r/" + os + "/pkgs/" +
            fn.replace("{}", "next");
        ver["date"]     = next["date"];

    } else if (version == "release") {
        const p1 = linux_builds_amd64(cache);
        const p2 = r_versions_bare(cache);
        var all = await Promise.all([p1, p2]);
        const rbuilds = all[0];
        const rvers = all[1];
        var rver = undefined;
        for (let i = rvers.length - 1; i > 0; i--) {
            var idx = rbuilds.indexOf(rvers[i].version);
            if (idx != -1) {
                rver = rvers[i];
                break;
            }
        }
        if (rver === undefined) {
            throw new Error("Cannot find R release Linux build for arch 'x86_64'.");
        }

        ver["version"] = rver.version;
        ver["nickname"] = await get_nick(rver.version);
        ver["type"] = "release";
        ver["url"] =
            "https://cdn.posit.co/r/" + os + "/pkgs/" +
            fn.replace("{}", rver.version);
        ver["date"] = rver.date;

    } else if (version.startsWith("oldrel")) {
        var which;
        if (version == "oldrel") {
            which = 1;
        } else {
            which = parseInt(version.replace(/^oldrel\//, ""));
        }
        const oldrel = await r_oldrel(which, cache);
        ver["version"]  = oldrel["version"];
        ver["nickname"] = oldrel["nickname"];
        ver["type"]     = "oldrel/" + which;
        ver["url" ]     =
            "https://cdn.posit.co/r/" + os + "/pkgs/" +
            fn.replace("{}", ver["version"]);
        ver["date"]     = oldrel["date"];

    } else if (semver.valid(version)) {
        const all = await r_versions_bare(cache);
        var found = false;
        for (let i = 0; i < all.length; i++) {
            if (all[i].version == version) {
                ver["version"] = all[i].version;
                ver["nickname"] = await get_nick(ver["version"]);
                ver["type"] = ver["version"];
                ver["date"] = all[i].date;
                const major = ver["version"].replace(/[.].*$/, "");
                // TODO: url might be incorrect if there is no Linux
                // build yet, but what can you do?
                ver["url"] =
                    "https://cdn.posit.co/r/" + os + "/pkgs/" +
                    fn.replace("{}", ver["version"]);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("Cannot find R version '" + version + "'.");
        }

    } else if (semver.valid(version + ".0")) {
        const p1 = linux_builds_amd64(cache);
        const p2 = r_minor(version, cache);
        const p3 = r_versions_bare(cache);
        var all = await Promise.all([p1, p2, p3]);
        var builds = all[0];
        var min = all[1];
        var rvers = all[2];
        var rel = undefined;
        for (let i = builds.length; i > 0; i--) {
            if (semver.valid(builds[i])) {
                rel = builds[i];
                break;
            }
        }
        if (rel === undefined) {
            throw new Error("Could not find any Linux builds.");
        }
        // If there is no built yet, then we use the latest
        // build instead
        if (semver.gt(min.version, rel)) {
            for (let i = 0; i < rvers.length; i++) {
                if (rvers[i].version == rel) {
                    min = rvers[i];
                    break;
                }
            }
        }
        ver["version"]  = min["version"];
        ver["nickname"] = get_nick(ver["version"]);
        ver["type"]     = version;
        ver["url"]      =
            "https://cdn.posit.co/r/" + os + "/pkgs/" +
            fn.replace("{}", ver["version"]);
        ver["date"]     = min["date"];

    } else {
        throw new Error("Invalid version specification: '" + version + "'.");
    }

    return ver;
}

async function resolve_os_linux_arm64(version, os, cache) {
    var ver = {};
    const url = linux_filenames.arm64[os];

    if (version == "devel") {
        // TODO: devel is always available, but we are not always sure what
        // version of R it is. Nevertheless we take the version number
        // from SVN
        const devel = await r_devel(cache);
        ver["version"]  = devel["version"];
        ver["nickname"] = devel["nickname"];
        ver["type"]     = "devel";
        ver["url"]      = url.replace(/[{][}]/g, "devel");
        ver["date"]     = devel["date"];

    } else if (version == "next") {
        // TODO: next is always available, but the version number might be
        // off when R changes the 'next' version, and we don't yet have
        // the latest builds available.
        const next = await r_next(cache);
        ver["version"]  = next["version"];
        ver["nickname"] = next["nickname"];
        ver["type"]     = "next";
        ver["nexttype"] = next["type"];
        ver["url"]      = url.replace(/[{][}]/g, "next");
        ver["date"]     = next["date"];

    } else if (version == "release") {
        const rel = await r_release_linux_arm64(os, cache);
        ver["version"] = rel.version;
        ver["nickname"] = await get_nick(ver.version);
        ver["type"] = "release";
        ver["url"] = rel.URL;
        ver["date"] = rel.date;

    } else if (version.startsWith("oldrel")) {
        var which;
        if (version == "oldrel") {
            which = 1;
        } else {
            which = parseInt(version.replace(/^oldrel\//, ""));
        }
        const oldrel = await r_oldrel(which, cache);
        ver["version"]  = oldrel["version"];
        ver["nickname"] = oldrel["nickname"];
        ver["type"]     = "oldrel/" + which;
        ver["url" ]     = url.replace(/[{][}]/g, ver["version"]);
        ver["date"]     = oldrel["date"];

    } else if (semver.valid(version)) {
        const all = await r_versions_bare(cache);
        var found = false;
        for (let i = 0; i < all.length; i++) {
            if (all[i].version == version) {
                ver["version"] = all[i].version;
                ver["nickname"] = await get_nick(ver["version"]);
                ver["type"] = ver["version"];
                ver["date"] = all[i].date;
                const major = ver["version"].replace(/[.].*$/, "");
                // TODO: url might be incorrect if there is no Linux
                // build yet, but what can you do?
                ver["url"] = url.replace(/[{][}]/g, ver["version"]);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("Cannot find R version '" + version + "'.");
        }

    } else if (semver.valid(version + ".0")) {
        const p1 = r_release_linux_arm64(os, cache);
        const p2 = r_minor(version, cache);
        var all = await Promise.all([p1, p2]);
        var rel = all[0];
        var min = all[1];
        // If there is no Linux built yet, then we use the latest
        // Linux build instead. This is not exactly correct, and it can be
        // wrong if some older build is missing, but good enough for now.
        if (semver.gt(min.version, rel.version)) {
            min = rel;
        }
        ver["version"]  = min["version"];
        ver["nickname"] = min["nickname"];
        ver["type"]     = version;
        ver["url"]      = url.replace(/[{][}]/g, ver.version);
        ver["date"]     = min["date"];


    } else {
        throw new Error("Invalid version specification: '" + version + "'.");
    }

    return ver;
}

async function resolve_os_linux(version, os, arch, cache) {
    const oos = os;
    var archlc = (arch || "x86_64").toLowerCase();
    if (archlc == "amd64" || archlc == "x86_64") {
        arch = "x86_64";
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

    if (arch == "x86_64") {
        return resolve_os_linux_x86_64(version, os2, cache);
    } else if (arch == "arm64") {
        return resolve_os_linux_arm64(version, os2, cache);
    }
}

module.exports = resolve_os_linux;
