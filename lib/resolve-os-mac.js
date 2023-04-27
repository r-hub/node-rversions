
const semver = require('semver');

const r_versions_bare   = require('./r-versions-bare');
const r_next_macos = require('./r-next-macos');
const r_release_macos = require('./r-release-macos');
const r_minor = require('./r-minor');
const get_nick = require('./get-nick');
const r_devel_macos = require('./r-devel-macos');
const r_oldrel = require('./r-oldrel');

function mac_url(version, arch) {
    if (arch == "x86_64") {
        if (version == "3.2.5") {
            return "https://cran-archive.r-project.org/bin/macosx/base/R-3.2.4-revised.pkg";

        } else if (semver.lt(version, "2.10.0")) {
            throw new Error("No macOS installers are available for R versions before 2.10.0.");

        } else if (semver.lt(version, "4.0.0")) {
            return "https://cran-archive.r-project.org/bin/macosx/base/R-" + version + ".pkg";
        } else if (semver.lt(version, "4.3.0")) {
            return "https://cloud.r-project.org/bin/macosx/base/R-" + version + ".pkg";
        } else {
            return "https://cran.r-project.org/bin/macosx/big-sur-x86_64/base/R-" + version + "-x86_64.pkg";
        }

    } else if (arch == "arm64") {
        if (semver.lt(version, "4.1.0")) {
            throw new Error("No arm64 macOS installers are available for R versions before 4.1.0.");
        }
        return "https://cloud.r-project.org/bin/macosx/big-sur-arm64/base/R-" + version + "-arm64.pkg";
    }
}

async function resolve_os_mac(version, arch, cache) {
    var archlc = (arch || "x86_64").toLowerCase();
    if (archlc == "amd64" || archlc == "x86_64") {
        arch = "x86_64";
    } else if (archlc == "arm64" || archlc == "aarch64") {
        arch = "arm64";
    } else {
        throw new Error("Unsupported macOS arch: '" + arch + "'.");
    }

    var ver = { };

    if (version == "devel") {
        const devel = await r_devel_macos(cache, arch);
        ver["version"]  = devel["version"];
        ver["nickname"] = devel["nickname"];
        ver["type"]     = "devel";
        ver["url"]      = devel["URL"];
        ver["date"]     = devel["date"];

    } else if (version == "next") {
        const next = await r_next_macos(cache, arch);
        ver["version"]  = next["version"];
        ver["nickname"] = next["nickname"];
        ver["type"]     = "next";
        ver["nexttype"] = next["type"];
        ver["url"]      = next["URL"];
        ver["date"]     = next["date"];

    } else if (version == "release") {
        const rel = await r_release_macos(cache, arch);
        ver["version"]  = rel["version"];
        ver["nickname"] = rel["nickname"];
        ver["type"]     = "release";
        ver["url"]      = rel["URL"];
        ver["date"]     = rel["date"];

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
        ver["url" ]     = mac_url(ver["version"], arch);
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
                // TODO: url might be incorrect if there is no macOS
                // build yet, but what can you do?
                ver["url"] = mac_url(ver["version"], arch);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("Cannot find R version '" + version + "'.");
        }

    } else if (semver.valid(version + ".0")) {
        const p1 = r_release_macos(cache);
        const p2 = r_minor(version, cache);
        var all = await Promise.all([p1, p2]);
        var rel = all[0];
        var min = all[1];
        // If there is no macOS built yet, then we use the latest
        // macOS build instead
        if (semver.gt(min.version, rel.version)) {
            min = rel;
        }
        ver["version"]  = min["version"];
        ver["nickname"] = min["nickname"];
        ver["type"]     = version;
        ver["url"]      = mac_url(ver["version"], arch);
        ver["date"]     = min["date"];

    } else {
        throw new Error("Invalid version specification: '" + version + "'.");
    }

    return ver;
}

module.exports = resolve_os_mac;
