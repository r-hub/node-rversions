
platforms = [
    {
        'id': 'ubuntu-1804',
        'aliases': [ 'ubuntu-18.04', 'bionic' ],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '18.04',
        'codename': 'Bionic Beaver',
        'docker': 'ubuntu:18.04',
        'eol': '2023-05-31',
        'ppm-binaries': true,

    },
    {
        'id': 'ubuntu-2004',
        'aliases': [ 'ubuntu-20.04', 'focal' ],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '20.04',
        'codename': 'Focal Fossa',
        'docker': 'ubuntu:20.04',
        'eol': '2025-05-31',
        'ppm-binaries': true
    },
    {
        'id': 'ubuntu-2204',
        'aliases': ['ubuntu-22.04', 'jammy'],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '22.04',
        'codename': 'Jammy Jellyfish',
        'docker': 'ubuntu:22.04',
        'eol': '2027-05-31',
        'ppm-binaries': true
    },

    {
        'id': 'debian-10',
        'aliases': [ 'buster' ],
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '10',
        'codename': 'buster',
        'docker': 'debian:10',
        'eol': '2024-06-30',
        'ppm-binaries': false
    },
    {
        'id': 'debian-11',
        'aliases': [ 'bullseye' ],
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '11',
        'codename': 'bullseye',
        'docker': 'debian:11',
        'eol': 'N/A',
        'ppm-binaries': false
    },
    {
        'id': 'debian-12',
        'aliases': [ 'bookworm' ],
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '12',
        'codename': 'bookworm',
        'docker': 'debian:12',
        'eol': 'N/A',
        'ppm-binaries': false
    },

    {
        'id': 'opensuse-153',
        'alisess': [ 'opensuse-15.3', 'opensuse-leap-15.3' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.3',
        'docker': 'opensuse/leap:15.3',
        'eol': '2022-12-31',
        'ppm-binaries': true
    },
    {
        'id': 'opensuse-154',
        'alisess': [ 'opensuse-15.4', 'opensuse-leap-15.4' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.4',
        'docker': 'opensuse/leap:15.4',
        'eol': '2023-12-31',
        'ppm-binaries': true
    },

    {
        'id': 'opensuse-155',
        'alisess': [ 'opensuse-15.5', 'opensuse-leap-15.5' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.5',
        'docker': 'opensuse/leap:15.5',
        'eol': '2024-12-31',
        'ppm-binaries': true
    },

    {
        'id': 'centos-7',
        'aliases': [],
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '7',
        'docker': 'centos:7',
        'eol': '2024‑06‑30',
        'aliases': ['rhel-7'],
        'ppm-binaries': true
    },
    {
        'id': 'centos-8',
        'aliases': [],
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '8',
        'docker': 'centos:8',
        'eol': '2024‑05‑31',
        'ppm-binaries': true
    },

    {
        'id': 'rhel-9',
        'aliases': [ '/rhel-9[.][0-9]+/' ],
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '9',
        'docker': 'N/A',
        'eol': '2032-05-31',
        'ppm-binaries': true
    },

    {
        'id': 'fedora-37',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '37',
        'docker': 'fedora:37',
        'eol': '2023-11-14',
        'ppm-binaries': false
    },

    {
        'id': 'fedora-38',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '38',
        'docker': 'fedora:38',
        'eol': '2024-05-14',
        'ppm-binaries': false
    },

    {
        'id': 'fedora-39',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '39',
        'docker': 'fedora:39',
        'eol': '2024-11-12',
        'ppm-binaries': false
    },

    // Distros implemented as other distros above

    {
        'id': 'sles-15.3',
        'aliases': [ 'sles-153' ],
        'implementation': 'opensuse-153',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.3',
        'docker': 'registry.suse.com/bci/bci-base:15.3',
        'eol': '2022-12-31'
    },
    {
        'id': 'sles-15.4',
        'aliases': [ 'sles-154' ],
        'implementation': 'opensuse-154',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.4',
        'docker': 'registry.suse.com/bci/bci-base:15.4',
        'eol': '2023-12-31'
    },

    {
        'id': 'sles-15.5',
        'aliases': [ 'sles-155' ],
        'implementation': 'opensuse-155',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.5',
        'docker': 'registry.suse.com/bci/bci-base:15.5',
        'eol': '2024-12-31'
    },
    {
        'id': 'rhel-7',
        'aliases': [ '/rhel-7[.][0-9]+/' ],
        'implementation': 'centos-7',
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '7',
        'docker': 'N/A',
        'eol': '2024‑06‑30'
    },
    {
        'id': 'rhel-8',
        'aliases': [ '/rhel-8[.][0-9]+/' ],
        'implementation': 'centos-8',
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '8',
        'docker': 'N/A',
        'eol': '2029‑05‑31'
    },
    {
        'id': 'almalinux-8',
        'aliases': [ '/almalinux-8[.][0-9]+/' ],
        'implementation': 'centos-8',
        'name': 'AlmaLinux',
        'url': 'https://almalinux.org/',
        'version': '8',
        'docker': 'almalinux:8',
        'eol': '2029-03-01'
    },

    {
        'id': 'almalinux-9',
        'aliases': [ '/almalinux-9[.][0-9]+/' ],
        'implementation': 'rhel-9',
        'name': 'AlmaLinux',
        'url': 'https://almalinux.org/',
        'version': '9',
        'docker': 'almalinux:9',
        'eol': '2032-05-31'
    },

    {
        'id': 'rocky-8',
        'aliases': [ '/rocky-8[.][0-9]+/' ],
        'implementation': 'centos-8',
        'name': 'Rocky Linux',
        'url': 'https://rockylinux.org/',
        'version': '8',
        'docker': 'rockylinux:8',
        'eol': '2024-05-31'
    },
    {
        'id': 'rocky-9',
        'aliases': [ '/rocky-9[.][0-9]+/' ],
        'implementation': 'rhel-9',
        'name': 'Rocky Linux',
        'url': 'https://rockylinux.org/',
        'version': '9',
        'docker': 'rockylinux:9',
        'eol': '2027-05-31'
    }
];

module.exports = platforms;
