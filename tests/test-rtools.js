
const test = require('ava');
const srv = require('./helpers/server');

let me, rtools;

test.before(async() => {
    await srv();
    me = require('..');
    rtools = require('../lib/rtools');
});

test('rtools_versions', async t => {
    t.snapshot(me.rtools_versions());
});

test('rtools_match', async t => {
    var rvers = [
        '2.4.0',
        '2.5.0',
        '2.6.0',
        '2.7.0',
        '2.8.0',
        '2.9.0',
        '2.10.0',
        '2.11.0',
        '2.12.0',
        '2.13.0',
        '2.14.1',
        '2.14.2',
        '2.15.1',
        '2.15.2',
        '3.0.0',
        '3.1.0',
        '3.2.0',
        '3.3.0',
        '3.4.0',
        '3.5.0',
        '3.6.0',
        '4.0.0',
        '4.1.0',
        '4.2.0',
        '4.3.0',
        '4.4.0'
    ];

    rvers = rvers.map(v => { return [v, rtools.rtools_match(v).version]; });
    t.snapshot(rvers);
});
