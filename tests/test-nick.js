
const test = require('ava');
const srv = require('./helpers/server');

let me, mycache, get_nick;

test.before(async () => {
    await srv();
    me = require('..');
    get_nick = require('../lib/get-nick');
    mycache = require('../lib/cache');
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
