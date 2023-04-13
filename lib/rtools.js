
const semver = require('semver');

rtools_versions = [
    {
        version: "26",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools26.exe",
        first: "2.0.0",
        last: "2.6.2"
    },
    {
        version: "27",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools27.exe",
        first: "2.6.0",
        last: "2.7.2"
    },
    {
        version: "28",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools28.exe",
        first: "2.7.0",
        last: "2.8.1"
    },
    {
        version: "29",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools29.exe",
        first: "2.8.0",
        last: "2.9.2"
    },
    {
        version: "210",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools210.exe",
        first: "2.9.0",
        last: "2.10.1"
    },
    {
        version: "211",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools211.exe",
        first: "2.10.0",
        last: "2.11.1"
    },
    {
        version: "212",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools212.exe",
        first: "2.12.0",
        last: "2.12.2"
    },
    {
        version: "213",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools213.exe",
        first: "2.13.0",
        last: "2.13.2"
    },
    {
        version: "214",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools214.exe",
        first: "2.13.0",
        last: "2.14.2"
    },
    {
        version: "215",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools215.exe",
        first: "2.14.2",
        last: "2.15.1"
    },
    {
        version: "30",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools30.exe",
        first: "2.15.2",
        last: "3.0.3"
    },
    {
        version: "31",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools31.exe",
        first: "3.0.0",
        last: "3.1.3"
    },
    {
        version: "32",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools32.exe",
        first: "3.1.0",
        last: "3.2.5"
    },
    {
        version: "33",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools33.exe",
        first: "3.2.0",
        last: "3.3.3"
    },
    {
        version: "34",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools34.exe",
        first: "3.3.0",
        last: "3.6.3"
    },
    {
        version: "35",
        url: "https://cran.r-project.org/bin/windows/Rtools/Rtools35.exe",
        first: "3.3.0",
        last: "3.6.3"
    },
    {
        version: "40",
        url: "https://cran.r-project.org/bin/windows/Rtools/rtools40-x86_64.exe",
        first: "4.0.0",
        last: "4.2.100"
    },
    {
        version: "42",
        url: "https://github.com/r-hub/rtools42/releases/download/latest/rtools42.exe",
        first: "4.2.0",
        last: "4.2.100"
    },
    {
        version: "43",
        url: "https://github.com/r-hub/rtools43/releases/download/latest/rtools43.exe",
        first: "4.3.0",
        last: "100.0.0"
    }
]

rtools_versions_version = rtools_versions.map(x => { return x.version; });

function find_rtools_record(version) {
    const idx = rtools_versions_version.indexOf(version);
    if (idx == -1) {
        throw "Unknown rtools version: '" + version + "'";
    }
    return rtools_versions[idx];
}

function rtools_match(version) {
    var ver, url;
    if (semver.lt(version, "2.6.0")) {
        ver = "26";
    } else if (semver.lt(version, "2.7.0")) {
        ver = "27";
    } else if (semver.lt(version, "2.8.0")) {
        ver = "28";
    } else if (semver.lt(version, "2.9.0")) {
        ver = "29";
    } else if (semver.lt(version, "2.10.0")) {
        ver = "210";
    } else if (semver.lt(version, "2.12.0")) {
        ver = "211";
    } else if (semver.lt(version, "2.13.0")) {
        ver = "212";
    } else if (semver.lte(version, "2.14.1")) {
        ver = "214";
    } else if (semver.lte(version, "2.15.1")) {
        ver = "215";
    } else if (semver.lt(version, "3.0.0")) {
        ver = "30";
    } else if (semver.lt(version, "3.1.0")) {
        ver = "31";
    } else if (semver.lt(version, "3.2.0")) {
        ver = "32";
    } else if (semver.lt(version, "3.3.0")) {
        ver = "33";
    } else if (semver.lt(version, "4.0.0")) {
        ver = "35";
    } else if (semver.lt(version, "4.3.0")) {
        ver = "40";
    } else {
        ver = "43";
    }

    return find_rtools_record(ver);
}

module.exports = {
    rtools_versions: rtools_versions,
    rtools_match: rtools_match
};
