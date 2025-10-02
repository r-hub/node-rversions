
const semver = require('semver');

const r_versions_bare   = require('./r-versions-bare');
const r_devel_win       = require('./r-devel-win');
const r_next_win        = require('./r-next-win');
const r_release_win     = require('./r-release-win');
const r_oldrel          = require('./r-oldrel');
const r_minor           = require('./r-minor');
const get_nick          = require('./get-nick');
const rtools_match      = require('./rtools').rtools_match;

function win_url(version, arch) {
    if (arch == "x86_64") {
        if (semver.lt(version, "4.0.0")) {
        return(
            "https://cran-archive.r-project.org/bin/windows/base/old/" +
                version + "/R-" + version + "-win.exe"
        );
    } else {
        return(
            "https://cran.rstudio.com/bin/windows/base/old/" +
                version + "/R-" + version + "-win.exe"
        );
    }
    } else if (arch == "aarch64") {
        if (semver.lt(version, "4.4.0")) {
            throw new Error("No aarch64 Windows installers are available for R versions before 4.4.0.");
        } else {
            return("https://www.r-project.org/nosvn/winutf8/aarch64/R-4-signed/R-"+ version +"-aarch64.exe")
        }
    }
}

async function resolve_os_win(version, arch, cache) {
    arch = arch || "x86_64";
    if (arch != "x86_64" || "aarch64") {
        throw new Error("Unsupported Windows arch: '" + arch + "'.");
    }
    var ver = {};

    if (version == "devel") {
        const devel = await r_devel_win(cache, arch);
        ver["version"]  = devel["version"];
        ver["nickname"] = devel["nickname"];
        ver["type"]     = "devel";
        ver["url"]      = "https://cran.rstudio.com/bin/windows/base/R-devel-win.exe";
        ver["date"]     = devel["date"];

    } else if (version == "next") {
        const next = await r_next_win(cache, arch);
        ver["version"]  = next["version"];
        ver["nickname"] = next["nickname"];
        ver["type"]     = "next";
        ver["nexttype"] = next["type"];
        ver["url"]      = next["URL"];
        ver["date"]     = next["date"];

    } else if (version == "release") {
        const rel = await r_release_win(cache, arch);
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
        ver["url" ]     = win_url(ver["version"], arch);
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
                // TODO: url might be incorrect if there is no Windows
                // build yet, but what can you do?
                ver["url"] = win_url(ver["version"], arch);
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error("Cannot find R version '" + version + "'.");
        }

    } else if (semver.valid(version + ".0")) {
        const p1 = r_release_win(cache, arch);
        const p2 = r_minor(version, cache);
        var all = await Promise.all([p1, p2]);
        var rel = all[0];
        var min = all[1];
        // If there is no Windows built yet, then we use the latest
        // Windows build instead
        if (semver.gt(min.version, rel.version)) {
            min = all[0];
        }
        ver["version"]  = min["version"];
        ver["nickname"] = min["nickname"];
        ver["type"]     = version;
        ver["url"]      = win_url(ver["version"], arch);
        ver["date"]     = min["date"];

    } else {
        throw new Error("Invalid version specification: '" + version + "'.");
    }

    const rtools = rtools_match(ver.version, arch);
    ver["rtools"] = rtools.version;
    ver["rtools_url"] = rtools.url;

    return ver;
}

module.exports = resolve_os_win;
