
const semver = require('semver');

const r_versions_bare   = require('./r-versions-bare');
const r_release         = require('./r-release');
const r_oldrel          = require('./r-oldrel');
const r_release_tarball = require('./r-release-tarball');
const r_devel           = require('./r-devel');
const r_next            = require('./r-next');
const r_minor           = require('./r-minor');
const get_nick          = require('./get-nick');

async function resolve_no_os(version, cache = true) {
    var ver = { };

    if (version == "devel") {
        const devel = await r_devel(cache);
        ver["version"]  = devel["version"];
        ver["nickname"] = devel["nickname"];
        ver["type"]     = "devel";
        ver["URL"]      = devel["URL"];
        ver["date"]     = devel["date"];

    } else if (version == "next") {
        const next = await r_next(cache);
        ver["version"]  = next["version"];
        ver["nickname"] = next["nickname"];
        ver["type"]     = next["type"];
        ver["URL"]      = next["URL"];
        ver["date"]     = next["date"];

    } else if (version == "release") {
        const rel = await r_release_tarball(cache);
        ver["version"]  = rel["version"];
        ver["nickname"] = rel["nickname"];
        ver["type"]     = "release";
        ver["URL"]      = rel["URL"];
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
        ver["URL"]      = oldrel["URL"];
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
                ver["URL"] = "https://cran.r-project.org/src/base/R-" +
                    major + "/R-" + ver["version"] + ".tar.gz";
                found = true;
                break;
            }
        }
        if (!found) {
            throw("Cannot find R version '" + version + "'.");
        }

    } else if (semver.valid(version + ".0")) {
        const min = await r_minor(version, cache);
        ver["version"]  = min["version"];
        ver["nickname"] = min["nickname"];
        ver["type"]     = version;
        ver["URL"]      = min["URL"];
        ver["date"]     = min["date"];

    } else {
        throw("Invalid version specification: '" + version + "'.");
    }

    return ver;
}

module.exports = resolve_no_os;
