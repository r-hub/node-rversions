
// This is in a separate file, so it will be run in a separate process,
// and will not interfere with the cache of the other test file(s).

const test = require('ava');
const srv = require('./helpers/server');

let me, mycache;

test.before(async () => {
    await srv();
    me = require('..');
    mycache = require('../lib/cache');
});

test('cache', async t => {
    mycache.set('foo', 'bar');
    t.is(mycache.get('foo'), 'bar');

    mycache.del('foo');
    t.is(mycache.get('foo'), undefined);
});

test('caching', async t => {
    mycache.del('r_versions');
    mycache.del('r_release');
    mycache.del('r_oldrel/1');
    mycache.del('r_release_macos_x86_64');
    mycache.del('r_release_macos_arm64');
    mycache.del('r_release_tarball');
    mycache.del('r_release_win');

    t.is(mycache.get('r_versions'), undefined);
    await me.r_versions();
    t.true(mycache.get('r_versions') !== undefined);

    t.is(mycache.get('r_release'), undefined);
    await me.r_release();
    t.true(mycache.get('r_release') !== undefined);

    t.is(mycache.get('r_oldrel/1'), undefined);
    await me.r_oldrel();
    t.true(mycache.get('r_oldrel/1') !== undefined);

    t.is(mycache.get('r_release_macos_x86_64'), undefined);
    await me.r_release_macos();
    t.true(mycache.get('r_release_macos_x86_64') !== undefined);

    t.is(mycache.get('r_release_macos_arm64'), undefined);
    await me.r_release_macos(undefined, 'arm64');
    t.true(mycache.get('r_release_macos_arm64') !== undefined);

    t.is(mycache.get('r_release_tarball'), undefined);
    await me.r_release_tarball();
    t.true(mycache.get('r_release_tarball') !== undefined);

    t.is(mycache.get('r_release_win'), undefined);
    await me.r_release_win();
    t.true(mycache.get('r_release_win') !== undefined);

    t.is(mycache.get('r_devel'), undefined);
    await me.r_devel();
    t.true(mycache.get('r_devel') !== undefined);

    t.is(mycache.get('r_next'), undefined);
    await me.r_next();
    t.true(mycache.get('r_next') !== undefined);
});
