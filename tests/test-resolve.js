
const test = require('ava');
const srv = require('./helpers/server');

let me, mycache, linux_builds_amd64, linux_builds_arm64;

test.before(async () => {
    await srv();
    me = require('..');
    linux_builds_amd64 = require('../lib/linux-builds-amd64');
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

test('macos', async t => {
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
});
