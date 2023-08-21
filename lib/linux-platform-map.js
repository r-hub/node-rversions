
platforms = {
    'ubuntu-18.04': {
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '18.04',
        'codename': 'Bionic Beaver',
        'docker': 'ubuntu:18.04',
        'eol': '2023-05-31',
        'ppm-binaries': true
    },
    'ubuntu-20.04': {
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '20.04',
        'codename': 'Focal Fossa',
        'docker': 'ubuntu:20.04',
        'eol': '2025-05-31',
        'ppm-binaries': true
    },
    'ubuntu-22.04': {
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '22.04',
        'codename': 'Jammy Jellyfish',
        'docker': 'ubuntu:22.04',
        'eol': '2027-05-31',
        'ppm-binaries': true
    },

    'debian-10': {
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '10',
        'codename': 'buster',
        'docker': 'debian:10',
        'eol': '2024-06-30',
        'ppm-binaries': false
    },
    'debian-11': {
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '11',
        'codename': 'bullseye',
        'docker': 'debian:11',
        'eol': 'N/A',
        'ppm-binaries': false
    },
    'debian-12': {
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '12',
        'codename': 'bookworm',
        'docker': 'debian:12',
        'eol': 'N/A',
        'ppm-binaries': false
    },

    'opensuse-153': {
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.3',
        'docker': 'opensuse/leap:15.3',
        'eol': '2022-12-31',
        'ppm-binaries': true
    },
    'opensuse-154': {
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.4',
        'docker': 'opensuse/leap:15.4',
        'eol': '2023-11-31',
        'ppm-binaries': true
    },

    'centos-7': {
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '7',
        'docker': 'centos:7',
        'eol': '2024‑06‑30',
        'aliases': ['rhel-7'],
        'ppm-binaries': true
    },
    'centos-8': {
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '8',
        'docker': 'centos:8',
        'eol': '2024‑05‑31',
        'ppm-binaries': true
    },

    'rhel-9': {
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '9',
        'docker': 'N/A',
        'eol': '2032-05-31',
        'ppm-binaries': true
    },

    'fedora-37': {
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '37',
        'docker': 'fedora:37',
        'eol': '2023-11-14',
        'ppm-binaries': false
    },

    'fedora-38': {
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '38',
        'docker': 'fedora:38',
        'eol': '2024-05-14',
        'ppm-binaries': false
    },

    // Aliases

    'sles-15.3': {
        'id': 'opensuse-153',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.3',
        'docker': 'registry.suse.com/bci/bci-base:15.3',
        'eol': '2022-12-31'
    },

    'sles-15.4': {
        'id': 'opensuse-154',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.4',
        'docker': 'registry.suse.com/bci/bci-base:15.4',
        'eol': '2023-11-31'
    },

    'rhel-7': {
        'id': 'centos-7',
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '7',
        'docker': 'N/A',
        'eol': '2024‑06‑30'
    },

    'rhel-8': {
        'id': 'centos-8',
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '8',
        'docker': 'N/A',
        'eol': '2029‑05‑31'
    },

    'almalinux-8': {
        'id': 'centos-8',
        'name': 'AlmaLinux',
        'url': 'https://almalinux.org/',
        'version': '8',
        'docker': 'almalinux:8',
        'eol': '2029-03-01'
    },

    'almalinux-9': {
        'id': 'rhel-9',
        'name': 'AlmaLinux',
        'url': 'https://almalinux.org/',
        'version': '9',
        'docker': 'almalinux:9',
        'eol': '2032-05-31'
    },

    'rocky-9': {
        'id': 'rhel-9',
        'name': 'Rocky Linux',
        'url': 'https://rockylinux.org/',
        'version': '9',
        'docker': 'rockylinux:9',
        'eol': '2027-05-31'
    }
};

map = {
    'ubuntu-1804': 'ubuntu-1804',
    'ubuntu-2004': 'ubuntu-2004',
    'ubuntu-2204': 'ubuntu-2204',
    'ubuntu-18.04': 'ubuntu-1804',
    'ubuntu-20.04': 'ubuntu-2004',
    'ubuntu-22.04': 'ubuntu-2204',
    'bionic': 'ubuntu-1804',
    'focal': 'ubuntu-2004',
    'jammy': 'ubuntu-2204',

    'debian-10': 'debian-10',
    'debian-11': 'debian-11',
    'debian-12': 'debian-12',
    'buster': 'debian-10',
    'bullseye': 'debian-11',
    'bookworm': 'debian-12',

    'opensuse-153': 'opensuse-153',
    'opensuse-leap-15.3': 'opensuse-153',
    'opensuse-154': 'opensuse-154',
    'opensuse-leap-15.4': 'opensuse-154',

    'sles-153': 'opensuse-153',
    'sles-15.3': 'opensuse-153',
    'sles-154': 'opensuse-154',
    'sles-15.4': 'opensuse-154',

    'fedora-37': 'fedora-37',
    'fedora-38': 'fedora-38',

    'centos-7': 'centos-7',
    'centos-8': 'centos-8',
    'rhel-7': 'centos-7',
    '/rhel-7[.][0-9]+/': 'centos-7',
    'rhel-8': 'centos-8',
    '/rhel-8[.][0-9]+/': 'centos-8',
    'rhel-9': 'rhel-9',
    '/rhel-9[.][0-9]+/': 'rhel-9',
    'almalinux-8': 'centos-8',
    '/almalinux-8[.][0-9]+/': 'centos-8',
    'almalinux-9': 'rhel-9',
    '/almalinux-9[.][0-9]+/': 'rhel-9',
    'rocky-8': 'centos-8',
    '/rocky-8[.][0-9]+/': 'centos-8',
    'rocky-9': 'rhel-9',
    '/rocky-9[.][0-9]+/': 'rhel-9',
    // amazon?
};

module.exports = { platforms: platforms, map: map }
