
x86_64 = {
    'ubuntu-1604': 'r-{}_1_amd64.deb',
    'ubuntu-1804': 'r-{}_1_amd64.deb',
    'ubuntu-2004': 'r-{}_1_amd64.deb',
    'ubuntu-2204': 'r-{}_1_amd64.deb',
    'ubuntu-2404': 'r-{}_1_amd64.deb',

    'debian-9': 'r-{}_1_amd64.deb',
    'debian-10': 'r-{}_1_amd64.deb',
    'debian-11': 'r-{}_1_amd64.deb',
    'debian-12': 'r-{}_1_amd64.deb',

    'opensuse-42': 'R-{}-1-1.x86_64.rpm',
    'opensuse-15': 'R-{}-1-1.x86_64.rpm',
    'opensuse-152': 'R-{}-1-1.x86_64.rpm',
    'opensuse-153': 'R-{}-1-1.x86_64.rpm',
    'opensuse-154': 'R-{}-1-1.x86_64.rpm',
    'opensuse-155': 'R-{}-1-1.x86_64.rpm',
    'opensuse-156': 'R-{}-1-1.x86_64.rpm',

    'centos-6': 'R-{}-1-1.x86_64.rpm',
    'centos-7': 'R-{}-1-1.x86_64.rpm',
    'centos-8': 'R-{}-1-1.x86_64.rpm',
    'rhel-9': 'R-{}-1-1.x86_64.rpm',

    'fedora-37': 'R-{}-1-1.x86_64.rpm',
    'fedora-38': 'R-{}-1-1.x86_64.rpm',
    'fedora-39': 'R-{}-1-1.x86_64.rpm',
    'fedora-40': 'R-{}-1-1.x86_64.rpm'
};

arm64 = {
    'ubuntu-1604':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-1604-{}_1_arm64.deb',
    'ubuntu-1804':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-1804-{}_1_arm64.deb',
    'ubuntu-2004':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-2004-{}_1_arm64.deb',
    'ubuntu-2204':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-2204-{}_1_arm64.deb',
    'ubuntu-2404':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-ubuntu-2404-{}_1_arm64.deb',

    'debian-9':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-9-{}_1_arm64.deb',
    'debian-10':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-10-{}_1_arm64.deb',
    'debian-11':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-11-{}_1_arm64.deb',
    'debian-12':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-debian-12-{}_1_arm64.deb',

    'opensuse-42':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-42-{}-1-1.aarch64.rpm',
    'opensuse-15':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-15-{}-1-1.aarch64.rpm',
    'opensuse-152':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-152-{}-1-1.aarch64.rpm',
    'opensuse-153':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-153-{}-1-1.aarch64.rpm',
    'opensuse-154':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-154-{}-1-1.aarch64.rpm',
    'opensuse-155':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-155-{}-1-1.aarch64.rpm',
    'opensuse-156':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-opensuse-156-{}-1-1.aarch64.rpm',

    'centos-6':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-centos-6-{}-1-1.aarch64.rpm',
    'centos-7':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-centos-7-{}-1-1.aarch64.rpm',
    'centos-8':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-centos-8-{}-1-1.aarch64.rpm',
    'rhel-9':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-rhel-9-{}-1-1.aarch64.rpm',
    'fedora-37':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-fedora-37-{}-1-1.aarch64.rpm',
    'fedora-38':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-fedora-38-{}-1-1.aarch64.rpm',
    'fedora-39':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-fedora-39-{}-1-1.aarch64.rpm',
    'fedora-40':
    'https://github.com/r-hub/R/releases/download/v{}/r-rstudio-fedora-40-{}-1-1.aarch64.rpm'
};

module.exports = { 'x86_64': x86_64, 'arm64': arm64 };
