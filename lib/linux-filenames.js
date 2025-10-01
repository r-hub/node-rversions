
posit = {
    'ubuntu': 'r-{ver}_1_{arch}.deb',
    'debian': 'r-{ver}_1_{arch}.deb',
    'opensuse': 'R-{ver}-1-1.{aarch}.rpm',
    'centos': 'R-{ver}-1-1.{aarch}.rpm',
    'rhel':   'R-{ver}-1-1.{aarch}.rpm',
    'fedora': 'R-{ver}-1-1.{aarch}.rpm',
};

github = {
    'ubuntu':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-ubuntu-{rel}-{ver}_1_{arch}.deb',
    'debian':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-debian-{rel}-{ver}_1_{arch}.deb',
    'opensuse':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-opensuse-{rel}-{ver}_1_{aarch}.rpm',
    'centos':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-centos-{rel}-{ver}-1-1.{aarch}.rpm',
    'rhel':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-rhel-{rel}-{ver}-1-1.{aarch}.rpm',
    'fedora':
        'https://github.com/r-hub/R/releases/download/v{ver}/r-rstudio-fedora-{rel}-{ver}-1-1.{aarch}.rpm',
};

module.exports = { 'posit': posit, 'github': github };
