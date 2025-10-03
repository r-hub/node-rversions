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
    });

    test('available-no-os' + mock, async t => {
        const available_no_os = require('../lib/available-no-os');
        let res = await available_no_os();
        res = res.slice(0, 3).concat(res.slice(-3));
        t.snapshot(res);
    });

    test('available-os-mac' + mock, async t => {
        const available_os_mac = require('../lib/available-os-mac');
        let x86_64 = await available_os_mac('x86_64', false);
        function redact_port(versions) {
            return versions.map(v => {
                v.url = v.url.replace(/:[0-9]+\//, ":<port>/")
                return v;
            })
        }
        let x86_64_def = await available_os_mac();
        t.deepEqual(x86_64, x86_64_def);

        x86_64 = redact_port(x86_64.slice(0, 3).concat(x86_64.slice(-3)));
        t.snapshot(x86_64);

        let arm64 = await available_os_mac('arm64', false);
        arm64 = redact_port(arm64.slice(0, 3).concat(arm64.slice(-3)));
        t.snapshot(arm64);

        await t.throwsAsync(async() => {
            await available_os_mac('foobar');
        }, { message: "Unknown macos arch :'foobar'."});
    });

    test('available-os-win' + mock, async t => {
        const available_os_win = require('../lib/available-os-win');
        let res = await available_os_win();
        res = res.slice(0, 3).concat(res.slice(-3));
        t.snapshot(res);
    });

    test('available' + mock, async t => {
        const available_no_os = require('../lib/available-no-os');
        let res = await me.available();
        let res2 = await available_no_os();
        t.deepEqual(res, res2);

        const available_os_linux = require('../lib/available-os-linux');
        let linux = await me.available('linux-ubuntu-22.04');
        let linux2 = await available_os_linux('linux-ubuntu-22.04');
        t.deepEqual(linux, linux2);

        const available_os_mac = require('../lib/available-os-mac');
        let mac = await me.available('macos');
        let mac2 = await available_os_mac();
        t.deepEqual(mac, mac2);

        const available_os_win = require('../lib/available-os-win');
        let win = await me.available('windows');
        let win2 = await available_os_win();
        t.deepEqual(win, win2);

        await t.throwsAsync(async() => {
            await me.available('foobar');
        }, { message: "Unknown OS: 'foobar'."});
    });
}

module.exports = run;
