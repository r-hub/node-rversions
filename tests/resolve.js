
const test = require('ava');
const srv = require('./helpers/server');

let me, mycache, linux_builds_amd64, linux_builds_arm64;

const mock = process.env.NODE_RVERSIONS_NOMOCK ? "-mock" : "";


function run() {
    test.before(async () => {
        await srv();
        me = require('..');
        linux_builds_amd64 = require('../lib/linux-builds-posit');
        linux_builds_arm64 = require('../lib/linux-builds-arm64');
        mycache = require('../lib/cache');
    });

    test('linux_builds_amd64', async t => {
        mycache.del('linux_builds_amd64');
        t.is(mycache.get('linux_builds_amd64'), undefined);
        const vers = await linux_builds_amd64(false);
        t.true(mycache.get('linux_builds_amd64').indexOf('devel') >= 0);
        t.true(vers.indexOf('devel') >= 0);
        t.true(vers.indexOf('next') >= 0);
        t.true(vers.indexOf('4.2.3') >= 0);
        const vers2 = await linux_builds_amd64();
        t.true(vers2.indexOf('devel') >= 0);
        t.true(vers2.indexOf('next') >= 0);
        t.true(vers2.indexOf('4.2.3') >= 0);
        t.true(mycache.get('linux_builds_amd64').indexOf('devel') >= 0);
        t.true(mycache.get('linux_builds_amd64').indexOf('next') >= 0);
        t.true(mycache.get('linux_builds_amd64').indexOf('4.2.3') >= 0);
    })

    test('linux_builds_arm64', async t => {
        mycache.del('linux_builds_arm64');
        const vers = await linux_builds_arm64(false);
        const tags = vers.repository.releases.nodes.map(x => {
            return x.tagName;
        });
        t.true(tags.indexOf('v4.2.3') >= 0);
        t.true(tags.indexOf('vnext') >= 0);
        t.true(tags.indexOf('vdevel') >= 0);
        const vers2 = await linux_builds_arm64();
        const tags2 = vers2.repository.releases.nodes.map(x => {
            return x.tagName;
        });
        t.true(tags2.indexOf('v4.2.3') >= 0);
        t.true(tags2.indexOf('vnext') >= 0);
        t.true(tags2.indexOf('vdevel') >= 0);
    });

    test('macos' + mock, async t => {
        mycache.del('r_devel_macos_x86_64');
        mycache.del('r_devel_macos_arm64');

        const devel = await me.resolve('devel', 'macos', 'x86_64', false);
        t.snapshot(devel);

        const devel2 = await me.resolve('devel', 'macos', undefined);
        t.snapshot(devel2);

        const devel_arm64 = await me.resolve('devel', 'macos', 'arm64');
        t.snapshot(devel_arm64);

        var next = await me.resolve('next', 'macos');
        next.url = next.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next);

        var next2 = await me.resolve('next', 'macos', 'arm64');
        next2.url = next2.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next2);

        var rel = await me.resolve('release', 'macos');
        rel.url = rel.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel);

        var rel2 = await me.resolve('release', 'macos', 'arm64');
        rel2.url = rel2.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel2);

        var oldrel = await me.resolve('oldrel', 'macos');
        t.snapshot(oldrel);

        var oldrel2 = await me.resolve('oldrel/2', 'macos');
        t.snapshot(oldrel2);

        var xver = await me.resolve('3.3.3', 'macos');
        t.snapshot(xver);

        var minor = await me.resolve('3.4', 'macos');
        t.snapshot(minor);

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

        var xver2 = await me.resolve('4.1.2', 'macos', 'arm64');
        t.snapshot(xver2);
    });

    test('win' + mock, async t => {
        const devel = await me.resolve('devel', 'win', undefined, false);
        t.snapshot(devel);

        const devel2 = await me.resolve('devel', 'win');
        t.snapshot(devel2);

        const next = await me.resolve('next', 'win');
        next.url = next.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(next);

        const rel = await me.resolve('release', 'win');
        rel.url = rel.url.replace(/:[0-9]+\//, ":<port>/");
        t.snapshot(rel);

        const oldrel = await me.resolve('oldrel', 'win');
        t.snapshot(oldrel);

        const oldrel2 = await me.resolve('oldrel/2', 'win');
        t.snapshot(oldrel2);

        const ver = await me.resolve('3.3.3', 'win');
        t.snapshot(ver);

        const ver2 = await me.resolve('4.1.2', 'win');
        t.snapshot(ver2);

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
        const devel = await me.resolve('devel', 'linux-ubuntu-22.04');
        t.snapshot(devel);

        const devel2 = await me.resolve('devel', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(devel2);

        const next = await me.resolve('next', 'linux-ubuntu-22.04');
        t.snapshot(next);

        const next2 = await me.resolve('next', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(next2);

        const rel = await me.resolve('release', 'linux-ubuntu-22.04');
        t.snapshot(rel);

        const rel2 = await me.resolve('release', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(rel2);

        const oldrel = await me.resolve('oldrel', 'linux-ubuntu-22.04');
        t.snapshot(oldrel);

        const oldrel2 = await me.resolve('oldrel/2', 'linux-ubuntu-22.04');
        t.snapshot(oldrel2);

        const oldrel3 = await me.resolve('oldrel', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(oldrel3);

        const oldrel4 = await me.resolve('oldrel/2', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(oldrel4);

        const xver = await me.resolve('4.2.2', 'linux-ubuntu-22.04');
        t.snapshot(xver);

        const xver2 = await me.resolve('4.2.2', 'linux-ubuntu-22.04', 'arm64');
        t.snapshot(xver2);

        var minor = await me.resolve('3.4', 'linux-ubuntu-22.04');
        t.snapshot(minor);

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
}

test('dummy-resolve', t => {
  t.pass();
});

module.exports = run;
