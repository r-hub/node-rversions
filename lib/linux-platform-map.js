
platforms = [
    {
        'id': 'ubuntu-1604',
        'aliases': [ 'ubuntu-16.04', 'xenial' ],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '16.04',
        'codename': 'Xenial Xerus',
        'docker': 'ubuntu:16.04',
        'eol': '2021-04-30',
        'ppm-binaries': true,
        'ppm-binary-url': 'xenial',
        'retired': true,
        'last-build': '4.1.2'
    },
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
        'ppm-binary-url': 'bionic',
        'retired': true,
        'last-build': '4.3.1'
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
        'ppm-binaries': true,
        'ppm-binary-url': 'focal',
        'retired': false,
        'last-build': null
    },
    {
        'id': 'ubuntu-2204',
        'aliases': ['ubuntu-22.04', 'jammy'],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '22.04',
        'codename': 'Jammy Jellyfish',
        'docker': 'ubuntu:22.04',
        'eol': '2027-04-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'jammy',
        'retired': false,
        'last-build': null
    },
    {
        'id': 'ubuntu-2404',
        'aliases': ['ubuntu-24.04', 'noble'],
        'name': 'Ubuntu',
        'url': 'https://ubuntu.com/',
        'version': '24.04',
        'codename': 'Noble Numbat',
        'docker': 'ubuntu:24.04',
        'eol': '2034-04-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'noble',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'debian-9',
        'aliases': [ 'stretch' ],
        'name': 'Debian',
        'url': 'https://www.debian.org/',
        'version': '9',
        'codename': 'stretch',
        'docker': 'debian:9',
        'eol': '2022-06-30',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': true,
        'last-build': '4.2.1'
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
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': false,
        'last-build': null
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
        'ppm-binaries': true,
        'ppm-binary-url': 'bullseye',
        'retired': false,
        'last-build': null
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
        'ppm-binaries': true,
        'ppm-binary-url': 'bookworm',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'opensuse-42',
        'alisess': [ 'opensuse-42', 'opensuse-42.3' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '42.3',
        'docker': 'opensuse:42.3',
        'eol': '2019-07-01',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse42',
        'retired': true,
        'last-build': '4.2.1'
    },
    {
        'id': 'opensuse-15',
        'alisess': [ 'opensuse-15', 'opensuse-leap-15',
                     'opensuse-15.0', 'opensuse-leap-15.0',
                     'opensuse-15.1', 'opensuse-leap-15.1' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.1',
        'docker': 'opensuse/leap:15.1',
        'eol': '2021-02-01',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse15',
        'retired': true,
        'last-build': '4.1.2'
    },
    {
        'id': 'opensuse-152',
        'alisess': [ 'opensuse-15.2', 'opensuse-leap-15.2' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.2',
        'docker': 'opensuse/leap:15.2',
        'eol': '2022-01-04',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse152',
        'retired': true,
        'last-build': '4.1.3'
    },
    {
        'id': 'opensuse-153',
        'alisess': [ 'opensuse-15.3', 'opensuse-leap-15.3' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.3',
        'docker': 'opensuse/leap:15.3',
        'eol': '2022-12-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse153',
        'returned': true,
        'last-build': '4.3.1'
    },
    {
        'id': 'opensuse-154',
        'alisess': [ 'opensuse-15.4', 'opensuse-leap-15.4' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.4',
        'docker': 'opensuse/leap:15.4',
        'eol': '2023-12-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse154',
        'retired': true,
        'last-build': '4.4.0'
    },

    {
        'id': 'opensuse-155',
        'alisess': [ 'opensuse-15.5', 'opensuse-leap-15.5' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.5',
        'docker': 'opensuse/leap:15.5',
        'eol': '2024-12-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse155',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'opensuse-156',
        'alisess': [ 'opensuse-15.6', 'opensuse-leap-15.6' ],
        'name': 'openSUSE Leap',
        'url': 'https://www.opensuse.org/',
        'version': '15.6',
        'docker': 'opensuse/leap:15.6',
        'eol': '2025-12-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'opensuse156',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'centos-6',
        'aliases': [],
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '6',
        'docker': 'centos:6',
        'eol': '2020‑11‑30',
        'aliases': ['rhel-6'],
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': true,
        'last-build': '4.0.4'
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
        'ppm-binaries': true,
        'ppm-binary-url': 'centos7',
        'retired': false,
        'last-build': null
    },
    {
        'id': 'centos-8',
        'aliases': [],
        'name': 'CentOS Linux',
        'url': 'https://www.centos.org/',
        'version': '8',
        'docker': 'centos:8',
        'eol': '2024‑05‑31',
        'ppm-binaries': true,
        'ppm-binary-url': 'centos8',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'rhel-9',
        'aliases': [ '/rhel-9[.][0-9]+/' ],
        'name': 'Red Hat Enterprise Linux',
        'url': 'https://www.redhat.com/',
        'version': '9',
        'docker': 'N/A',
        'eol': '2032-05-31',
        'ppm-binaries': true,
        'ppm-binary-url': 'rhel9',
        'retired': false,
        'last-build': null
    },

    {
        'id': 'fedora-37',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '37',
        'docker': 'fedora:37',
        'eol': '2023-11-14',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': true,
        'last-build': '4.3.2'
    },

    {
        'id': 'fedora-38',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '38',
        'docker': 'fedora:38',
        'eol': '2024-05-14',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': true,
        'last-build': '4.4.2'
    },

    {
        'id': 'fedora-39',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '39',
        'docker': 'fedora:39',
        'eol': '2024-11-12',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': false,
        'last-build': null
    },

    {
        'id': 'fedora-40',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '40',
        'docker': 'fedora:40',
        'eol': '2025-05-13',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': false,
        'last-build': null
    },

    {
        'id': 'fedora-41',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '41',
        'docker': 'fedora:41',
        'eol': '2025-11-26',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': false,
        'last-build': null
    },

    {
        'id': 'fedora-42',
        'aliases': [],
        'name': 'Fedora Linux',
        'url': 'https://fedoraproject.org/',
        'version': '42',
        'docker': 'fedora:42',
        'eol': '2026-05-13',
        'ppm-binaries': false,
        'ppm-binary-url': null,
        'retired': false,
        'last-build': null
    },

    // Distros implemented as other distros above

    {
        'id': 'sles-15',
        'aliases': [ 'sles-15' ],
        'implementation': 'opensuse-15',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15',
        'docker': 'registry.suse.com/suse/sle15:15.0',
        'eol': '2019-12-31'
    },
    {
        'id': 'sles-15.1',
        'aliases': [ 'sles-151' ],
        'implementation': 'opensuse-15',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.1',
        'docker': 'registry.suse.com/suse/sle15:15.1',
        'eol': '2021-12-31'
    },
    {
        'id': 'sles-15.2',
        'aliases': [ 'sles-152' ],
        'implementation': 'opensuse-152',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.2',
        'docker': 'registry.suse.com/suse/sle15:15.2',
        'eol': '2021-12-31'
    },
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
        'id': 'sles-15.6',
        'aliases': [ 'sles-156' ],
        'implementation': 'opensuse-156',
        'name': 'SUSE Linux Enterprise Server',
        'url': 'https://suse.com',
        'version': '15.6',
        'docker': 'registry.suse.com/bci/bci-base:15.6',
        'eol': '2025-12-31'
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
