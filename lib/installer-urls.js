
// Download URLs for released R versions. Source tarballs, macOS and
// Windows installers are all on the GitHub releases of r-hub/R, under the
// same file names that CRAN used.

const semver = require('semver');

const GH_RELEASES = "https://github.com/r-hub/R/releases/download/";

function to_semver(version, sv) {
    if (sv) return sv;
    if (semver.valid(version)) return version;
    return semver.valid(semver.coerce(version));
}

// Most tags are v<version>, but for 0.64-1.4 they use the full semver,
// e.g. v1.0.0 for R 1.0.
function gh_tag(version, sv) {
    sv = to_semver(version, sv);
    if (semver.gte(sv, "0.64.0")) {
        return "v" + sv;
    } else {
        return "v" + version;
    }
}

function gh_url(version, sv, file) {
    return GH_RELEASES + gh_tag(version, sv) + "/" + file;
}

function tarball_url(version, sv) {
    sv = to_semver(version, sv);
    const major = semver.major(sv);

    if (version == "0.0") {
        return "https://r-historic.r-pkg.org/R-unix-src.tar.gz";
    } else if (version == "0.10" || version == "0.11") {
        return `https://r-historic.r-pkg.org/R-${version}alpha.tgz`;
    } else if (semver.lte(sv, "0.16.1")) {
        return `https://r-historic.r-pkg.org/R-${version}alpha.tar.gz`;
    } else if (version == "0.99") {
        return gh_url(version, sv, "R-0.99.0a.tgz");
    } else if (semver.lte(sv, "0.50.4")) {
        return gh_url(version, sv, `R-${version}.tgz`);
    } else if (major == 0 || major == 1) {
        return gh_url(version, sv, `R-${sv}.tgz`);
    } else if (version == "2.15.1") {
        return gh_url(version, sv, "R-2.15.1-w.tar.gz");
    } else if (version == "3.2.4") {
        return gh_url(version, sv, "R-3.2.4-revised.tar.gz");
    } else {
        return gh_url(version, sv, `R-${version}.tar.gz`);
    }
}

function mac_url_x86_64(version, sv) {
    sv = to_semver(version, sv);
    if (version == "2.15.1") {
        return gh_url(version, sv, "R-2.15.1-signed.pkg");
    } else if (semver.lt(sv, "3.1.0")) {
        return gh_url(version, sv, `R-${version}.pkg`);
    } else if (semver.lt(sv, "3.2.0")) {
        return gh_url(version, sv, `R-${version}-mavericks.pkg`);
    } else if (version == "3.2.4" || version == "3.2.5") {
        // There is no 3.2.5 macOS installer, it is the same as 3.2.4-revised
        return GH_RELEASES + "v3.2.4/R-3.2.4-revised.pkg";
    } else if (semver.lte(sv, "4.2.3")) {
        return gh_url(version, sv, `R-${version}.pkg`);
    } else {
        return gh_url(version, sv, `R-${version}-x86_64.pkg`);
    }
}

function mac_url_arm64(version, sv) {
    return gh_url(version, sv, `R-${version}-arm64.pkg`);
}

function win_url_x86_64(version, sv) {
    sv = to_semver(version, sv);
    if (version == "2.0.0") {
        return gh_url(version, sv, "rw2000.exe");
    } else if (version == "2.0.1") {
        return gh_url(version, sv, "rw2001.exe");
    } else if (version == "2.1.0") {
        return gh_url(version, sv, "rw2010.exe");
    } else if (version == "2.1.1") {
        return gh_url(version, sv, "rw2011.exe");
    } else if (semver.lt(sv, "2.11.0")) {
        return gh_url(version, sv, `R-${version}-win32.exe`);
    } else if (semver.lt(sv, "2.12.0")) {
        return gh_url(version, sv, `R-${version}-win64.exe`);
    } else if (version == "3.2.4") {
        return GH_RELEASES + "v3.2.4-1/R-3.2.4revised-win.exe";
    } else {
        return gh_url(version, sv, `R-${version}-win.exe`);
    }
}

function win_url_aarch64(version, sv) {
    return gh_url(version, sv, `R-${version}-aarch64.exe`);
}

module.exports = {
    gh_tag,
    tarball_url,
    mac_url_x86_64,
    mac_url_arm64,
    win_url_x86_64,
    win_url_aarch64
};
