
x86_64 = {
    'ubuntu-1804': 'r-{}_1_amd64.deb',
    'ubuntu-2004': 'r-{}_1_amd64.deb',
    'ubuntu-2204': 'r-{}_1_amd64.deb',

    'debian-10': 'r-{}_1_amd64.deb',
    'debian-11': 'r-{}_1_amd64.deb',

    'opensuse-153': 'R-{}-1-1.x86_64.rpm',
    'opensuse-154': 'R-{}-1-1.x86_64.rpm',

    'centos-7': 'R-{}-1-1.x86_64.rpm',
    'centos-8': 'R-{}-1-1.x86_64.rpm',
    'rhel-9': 'R-{}-1-1.x86_64.rpm'
};

arm64 = {
    'ubuntu-1804':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-1804-{}_1_arm64.deb',
    'ubuntu-2004':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-2004-{}_1_arm64.deb',
    'ubuntu-2204':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-2204-{}_1_arm64.deb',

    'debian-10':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-10-{}_1_arm64.deb',
    'debian-11':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-11-{}_1_arm64.deb',

    'opensuse-153':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-153-{}-1-1.aarch64.rpm',
    'opensuse-154':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-154-{}-1-1.aarch64.rpm',

    'centos-7':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-centos-7-{}-1-1.aarch64.rpm',
    'centos-8':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-centos-8-{}-1-1.aarch64.rpm',
    'rhel-9':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-rhel-9-{}-1-1.aarch64.rpm'
};

module.exports = { 'x86_64': x86_64, 'arm64': arm64 };