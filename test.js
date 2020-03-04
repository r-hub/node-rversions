
const test = require('ava');
const me = require('.');
const get_nick = require('./lib/get-nick');

test('r_versions', async t => {
    const result = await me.r_versions();
    t.is(result[0].version, '0.60');
    t.is(result[0].nickname, null);

    const versions = result.map(function(x) { return x.version; })
    t.true(versions.indexOf('3.6.3') > -1);
    t.is(result[versions.indexOf('2.14.0')].nickname, 'Great Pumpkin');

    const dates = result.map(function(x) { return Date.parse(x.date); })
    t.pass()
});

test('get_nick', async t => {
    // get_nick
    // We remove this from the cache, so we can test that it is downloaded
    // on demand and updated in the cache.
    delete get_nick.internals.cached['3.6.3'];
    t.is(get_nick.internals.cached['3.6.3'], undefined);
    const p362 = get_nick('3.6.2');
    const p363 = get_nick('3.6.3');
    const nicks = await Promise.all([p362, p363]);
    t.deepEqual(nicks, [ 'Dark and Stormy Night', 'Holding the Windsock' ]);
    t.is(get_nick.internals.cached['3.6.3'], 'Holding the Windsock');

    // download_nick
    const n363 = await get_nick.internals.download_nick('3.6.3');
    t.is(n363, 'Holding the Windsock');
});
