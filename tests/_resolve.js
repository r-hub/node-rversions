
const test = require('ava');
const srv = require('./helpers/server');
const load_fixtures = require('./helpers/load-fixtures');

let me, mycache;

const mock = process.env.NODE_RVERSIONS_NOMOCK ? "" : "-mock";

function run() {
    test.before(async () => {
        // mock server
        await srv();

        // avoid multiple GH queries, get the data once and store it
        mycache = require('../lib/cache');
        let fixtures = await load_fixtures(mycache);

        // tested module
        me = require('..');
    });

    test('linux_builds_amd64', async t => {
        let linux_builds_amd64 = require('../lib/linux-builds-posit');
        // at the beginning it is already cached from test.before
        let amd64 = mycache.get('linux_builds_amd64');
        t.true(amd64.indexOf('devel') >= 0);
        const vers = await linux_builds_amd64();
        t.true(vers.indexOf('devel') >= 0);
        t.true(vers.indexOf('next') >= 0);
        t.true(vers.indexOf('4.2.3') >= 0);

        // if not set, then undefined
        mycache.del('linux_builds_amd64');
        t.is(mycache.get('linux_builds_amd64'), undefined);
        mycache.set('linux_builds_amd64', amd64);
    })

    test('linux_builds_arm64', async t => {
        // at the beginning it is already cached from test.before
        const vers = mycache.get("linux_builds_arm64");
        const tags = vers.repository.releases.nodes.map(x => {
            return x.tagName;
        });
        t.true(tags.indexOf('v4.2.3') >= 0);
        t.true(tags.indexOf('vnext') >= 0);
        t.true(tags.indexOf('vdevel') >= 0);
    });

    test('macos' + mock, async t => {
        mycache.del('r_devel_macos_x86_64');
        mycache.del('r_devel_macos_arm64');

        // 1
        const devel = await me.resolve('devel', 'macos', 'x86_64', false);
        t.snapshot(devel);

        // 2
        const devel2 = await me.resolve('devel', 'macos', undefined);
        t.snapshot(devel2);

        // 3
        const devel_arm64 = await me.resolve('devel', 'macos', 'arm64');
        t.snapshot(devel_arm64);

        // 4
        var next = await me.resolve('next', 'macos');
        next.url = next.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next);

        // 5
        var next2 = await me.resolve('next', 'macos', 'arm64');
        next2.url = next2.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next2);

        // 6
        var rel = await me.resolve('release', 'macos');
        rel.url = rel.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel);

        // 7
        var rel2 = await me.resolve('release', 'macos', 'arm64');
        rel2.url = rel2.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel2);

        // 8
        var oldrel = await me.resolve('oldrel', 'macos');
        t.snapshot(oldrel);

        // 9
        var oldrel = await me.resolve('oldrel', 'macos', 'arm64');
        t.snapshot(oldrel);

        // 10
        var oldrel2 = await me.resolve('oldrel/2', 'macos');
        t.snapshot(oldrel2);

        // 11
        var oldrel2 = await me.resolve('oldrel/2', 'macos', 'arm64');
        t.snapshot(oldrel2);

        // 12
        var xver = await me.resolve('3.3.3', 'macos');
        t.snapshot(xver);

        // 13
        var minor = await me.resolve('3.4', 'macos');
        t.snapshot(minor);

        // 14
        var v325 = await me.resolve('3.2.5', 'macos');
        t.snapshot(v325);

        await t.throwsAsync(async () => {
        await me.resolve('2.9.0', 'macos');
        }, { message: "No macOS installers are available for R versions before 2.10.0." });

        await t.throwsAsync(async () => {
        await me.resolve('4.0.5', 'macos', 'arm64');
        }, { message: "No arm64 macOS installers are available for R versions before 4.1.0." });

        await t.throwsAsync(async() => {
            await me.resolve('release', 'macos', 'foo');
        }, { message: "Unsupported macOS arch: 'foo'." });

        await t.throwsAsync(async() => {
            await me.resolve('4.0.6', 'macos');
        }, { message: "Cannot find R version '4.0.6'." });

        await t.throwsAsync(async() => {
            await me.resolve('foobar', 'macos');
        }, { message: "Invalid version specification: 'foobar'." });

        // 15
        var xver2 = await me.resolve('4.1.2', 'macos', 'arm64');
        t.snapshot(xver2);
    });

    async function test_all(t, os, arch) {
        const devel = await me.resolve('devel', os, arch);
        t.snapshot(devel, 'devel ' + os + ' ' + arch);

        const next = await me.resolve('next', os, arch);
        t.snapshot(next, 'next ' + os + ' ' + arch);

        const rel = await me.resolve('release', os, arch);
        t.snapshot(rel, 'release ' + os + ' ' + arch);

        const oldrel = await me.resolve('oldrel', os, arch);
        t.snapshot(oldrel, 'oldrel ' + os + ' ' + arch);

        const oldrel2 = await me.resolve('oldrel/2', os, arch);
        t.snapshot(oldrel2, 'oldrel/2 ' + os + ' ' + arch);

        const xver = await me.resolve('4.2.2', os, arch);
        t.snapshot(xver, '4.2.2 ' + os + ' ' + arch);

        var minor = await me.resolve('3.4', os, arch);
        t.snapshot(minor, '3.4 ' + os + ' ' + arch);

        var avail = await me.available(os, arch);
        avail = avail.slice(0, 3).concat(avail.slice(-3));
        t.snapshot(avail, 'available ' + os + ' ' + arch);
    }

    test('ubuntu-16.04' + mock, async t => {
        await test_all(t, 'linux-ubuntu-16.04', 'amd64');
        await t.throwsAsync(async() => {
            await me.resolve('release', 'linux-ubuntu-16.04', 'arm64');
        }, { message: "No R builds available for ubuntu-1604 aarch64." });
    })

    test('ubuntu-18.04' + mock, async t => {
        await test_all(t, 'linux-ubuntu-18.04', 'amd64');
        await test_all(t, 'linux-ubuntu-18.04', 'arm64');
    })

    test('ubuntu-20.04' + mock, async t => {
        await test_all(t, 'linux-ubuntu-20.04', 'amd64');
        await test_all(t, 'linux-ubuntu-20.04', 'arm64');
    })

    test('ubuntu-22.04' + mock, async t => {
        await test_all(t, 'linux-ubuntu-22.04', 'amd64');
        await test_all(t, 'linux-ubuntu-22.04', 'arm64');
    })

    test('ubuntu-24.04' + mock, async t => {
        await test_all(t, 'linux-ubuntu-24.04', 'amd64');
        await test_all(t, 'linux-ubuntu-24.04', 'arm64');
    })

    test('debian-9' + mock, async t => {
        await test_all(t, 'linux-debian-9', 'amd64');
        await test_all(t, 'linux-debian-9', 'arm64');
    })

    test('debian-10' + mock, async t => {
        await test_all(t, 'linux-debian-10', 'amd64');
        await test_all(t, 'linux-debian-10', 'arm64');
    })

    test('debian-11' + mock, async t => {
        await test_all(t, 'linux-debian-11', 'amd64');
        await test_all(t, 'linux-debian-11', 'arm64');
    })

    test('debian-12' + mock, async t => {
        await test_all(t, 'linux-debian-12', 'amd64');
        await test_all(t, 'linux-debian-12', 'arm64');
    })

    // TODO: opensuse-42
    // TODO: opensuse-15
    // TODO: opensuse-152
    // TODO: opensuse-153
    // TODO: opensuse-154
    // TODO: opensuse-155

    test('opensuse-156' + mock, async t => {
        await test_all(t, 'linux-opensuse-156', 'amd64');
        await test_all(t, 'linux-opensuse-156', 'arm64');
    })

    // TODO: centos-6

    test('centos-7' + mock, async t => {
        await test_all(t, 'linux-centos-7', 'amd64');
        await test_all(t, 'linux-centos-7', 'arm64');
    })

    test('centos-8' + mock, async t => {
        await test_all(t, 'linux-centos-8', 'amd64');
        await test_all(t, 'linux-centos-8', 'arm64');
    })

    test('rhel-9' + mock, async t => {
        await test_all(t, 'linux-rhel-9', 'amd64');
        await test_all(t, 'linux-rhel-9', 'arm64');
    })

    test('rhel-10' + mock, async t => {
        await test_all(t, 'linux-rhel-10', 'amd64');
        await test_all(t, 'linux-rhel-10', 'arm64');
    })

    // TODO: fedora-37
    // TODO: fedora-38
    // TODO: fedora-39
    // TODO: fedora-40

    test('fedora-41' + mock, async t => {
        await test_all(t, 'linux-fedora-41', 'amd64');
        await test_all(t, 'linux-fedora-41', 'arm64');
    })

    test('fedora-42' + mock, async t => {
        await test_all(t, 'linux-fedora-42', 'amd64');
        await test_all(t, 'linux-fedora-42', 'arm64');
    })

    test('win' + mock, async t => {
        // 1
        const devel = await me.resolve('devel', 'win', undefined, false);
        t.snapshot(devel);

        // 2
        const devel2 = await me.resolve('devel', 'win');
        t.snapshot(devel2);

        // 3
        const next = await me.resolve('next', 'win');
        next.url = next.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next);

        // 4
        const rel = await me.resolve('release', 'win');
        rel.url = rel.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel);

        // 5
        const oldrel = await me.resolve('oldrel', 'win');
        t.snapshot(oldrel);

        // 6
        const oldrel2 = await me.resolve('oldrel/2', 'win');
        t.snapshot(oldrel2);

        // 7
        const ver = await me.resolve('3.3.3', 'win');
        t.snapshot(ver);

        // 8
        const ver2 = await me.resolve('4.1.2', 'win');
        t.snapshot(ver2);

        // 9
        var minor = await me.resolve('3.4', 'win');
        t.snapshot(minor);

        await t.throwsAsync(async() => {
            await me.resolve('release', 'win', 'foo');
        }, { message: "Unsupported Windows arch: 'foo'." });

        await t.throwsAsync(async() => {
            await me.resolve('4.0.6', 'win');
        }, { message: "Cannot find R version '4.0.6'." });

        await t.throwsAsync(async() => {
            await me.resolve('foobar', 'win');
        }, { message: "Invalid version specification: 'foobar'." });
    });

    test('linux' + mock, async t => {
        // 1
        const devel = await me.resolve('devel', 'linux-ubuntu-22.04');
        t.snapshot(devel);

        // 2
        const devel2 = await me.resolve('devel', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(devel2);

        // 3
        const next = await me.resolve('next', 'linux-ubuntu-22.04');
        t.snapshot(next);

        // 4
        const next2 = await me.resolve('next', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(next2);

        // 5
        const rel = await me.resolve('release', 'linux-ubuntu-22.04');
        t.snapshot(rel);

        // 6
        const rel2 = await me.resolve('release', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(rel2);

        // 7
        const oldrel = await me.resolve('oldrel', 'linux-ubuntu-22.04');
        t.snapshot(oldrel);

        // 8
        const oldrel2 = await me.resolve('oldrel/2', 'linux-ubuntu-22.04');
        t.snapshot(oldrel2);

        // 9
        const oldrel3 = await me.resolve('oldrel', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(oldrel3);

        // 10
        const oldrel4 = await me.resolve('oldrel/2', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(oldrel4);

        // 11
        const xver = await me.resolve('4.2.2', 'linux-ubuntu-22.04');
        t.snapshot(xver);

        // 12
        const xver2 = await me.resolve('4.2.2', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(xver2);

        // 13
        var minor = await me.resolve('3.4', 'linux-ubuntu-22.04');
        t.snapshot(minor);

        // 14
        var minor2 = await me.resolve('3.4', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(minor2);

        await t.throwsAsync(async() => {
            await me.resolve('4.0.6', 'linux-ubuntu-22.04');
        }, { message: "Cannot find R version '4.0.6'." });

        await t.throwsAsync(async() => {
            await me.resolve('4.0.6', 'linux-ubuntu-22.04', 'arm64');
        }, { message: "Cannot find R version '4.0.6'." });

        await t.throwsAsync(async() => {
            await me.resolve('foobar', 'linux-ubuntu-22.04');
        }, { message: "Invalid version specification: 'foobar'." });

        await t.throwsAsync(async() => {
            await me.resolve('foobar', 'linux-ubuntu-22.04', 'arm64');
        }, { message: "Invalid version specification: 'foobar'." });

        await t.throwsAsync(async() => {
            await me.resolve('4.2.3', 'linux-ubuntu-22.04', 'foo');
        }, { message: 'Unsupported Linux arch: \'foo\'.' });

        await t.throwsAsync(async() => {
            await me.resolve('4.2.3', 'linux-foobar');
        }, { message: 'Unknown Linux distro: \'linux-foobar\'.' });
    })

    test('no-os' + mock, async t => {
        const devel = await me.resolve('devel', undefined, undefined, false);
        t.snapshot(devel);

        const devel2 = await me.resolve('devel');
        t.snapshot(devel2);

        const next = await me.resolve('next');
        next.url = next.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next);

        const rel = await me.resolve('release');
        rel.url = rel.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel);

        const oldrel = await me.resolve('oldrel');
        t.snapshot(oldrel);

        const oldrel2 = await me.resolve('oldrel/2');
        t.snapshot(oldrel2);

        const ver = await me.resolve('3.3.3');
        t.snapshot(ver);

        const ver2 = await me.resolve('4.1.2');
        t.snapshot(ver2);

        var minor = await me.resolve('3.4');
        t.snapshot(minor);

        await t.throwsAsync(async() => {
            await me.resolve('4.0.6');
        }, { message: "Cannot find R version '4.0.6'." });

        await t.throwsAsync(async() => {
            await me.resolve('foobar');
        }, { message: "Invalid version specification: 'foobar'." });
    });

    test('available-os-linux' + mock, async t => {
        const available_os_linux = require('../lib/available-os-linux');
        await t.throwsAsync(async() => {
            await available_os_linux('linux-ubuntu-22.04', 'foobar');
        }, { message: "Unsupported Linux arch: 'foobar'."});
        await t.throwsAsync(async() => {
            await available_os_linux('linux-foobar', 'amd64');
        }, { message: "Unknown Linux distro: 'linux-foobar'."});
        // default arch is amd64
        let res = await available_os_linux('linux-ubuntu-24.04');
        t.true(res[0].url.indexOf('amd64') >= 0);
    })
}

test('dummy-resolve', t => {
  t.pass();
});

module.exports = run;
