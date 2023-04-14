
const test = require('ava');
const srv = require('./helpers/server');

let me, mycache;

test.before(async () => {
    await srv();
    me = require('..');
    mycache = require('../lib/cache');
});

test('r_versions', async t => {
    var vers = await me.r_versions();
    t.snapshot(vers[0]);
    t.snapshot(vers.slice(-1)[0]);
});
