
const test = require('ava');
const srv = require('./server');

let me, mycache, get_nick;

test.before(async () => {
    await srv();
    me = require('../..');
    get_nick = require('../../lib/get-nick');
    mycache = require('../../lib/cache');
});

function run(dummy = '') {
    test('r_versions' + dummy, async t => {
        // We run it twice, the second result comes from the cache
        for (let i = 0; i < 2; i++) {
            const result = await me.r_versions();
            t.is(result[0].version, '0.60');
            t.is(result[0].nickname, null);

            const versions = result.map(function(x) { return x.version; })
            t.true(versions.indexOf('3.6.3') > -1);
            t.is(result[versions.indexOf('2.14.0')].nickname, 'Great Pumpkin');

            const dates = result.map(function(x) { return Date.parse(x.date); })
            t.pass()
        }
    });

    test('r_release' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_release();
            t.deepEqual(
                Object.keys(result).sort(),
                ['date', 'nickname', 'semver', 'version']
            );
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            Date.parse(result.date);
            t.pass()
            t.is(result.nickname, await get_nick(result.version));
        }
    });

    test('r_oldrel' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const vers = await Promise.all([me.r_release(), me.r_oldrel()]);
            const rm = vers[0].version.replace(/^[0-9]+\.([0-9]+).*$/, '$1');
            const om = vers[1].version.replace(/^[0-9]+\.([0-9]+).*$/, '$1');
            t.is(Number(rm) - 1, Number(om));
        }
    });

    test('r_release_macos' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_release_macos();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            Date.parse(result.date);
            t.pass()
            t.is(result.nickname, await get_nick(result.version));
        }
    });

    test('r_release_tarball' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_release_tarball();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            Date.parse(result.date);
            t.pass()
            t.is(result.nickname, await get_nick(result.version));
        }
    });

    test('r_release_win' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_release_win();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            Date.parse(result.date);
            t.pass()
            t.is(result.nickname, await get_nick(result.version));
        }
    });

    test('r_devel' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_devel();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            t.pass()
            t.is(typeof result.nickname, 'string');
        }
    });

    test('r_next' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_next();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'type', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            t.pass()
            t.true(
                result.nickname === null ||
                    typeof result.nickname == 'string'
            );
        }
    });

    test('r_next_win' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_next_win();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'type', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            t.pass()
            t.true(
                result.nickname === null ||
                    typeof result.nickname == 'string'
            );
        }
    });

    test('r_next_macos' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_next_macos();
            t.deepEqual(
                Object.keys(result).sort(),
                ['URL', 'date', 'nickname', 'semver', 'type', 'version']
            )
            t.true(/^[0-9]+\.[0-9]+\.[0-9]+$/.test(result.version));
            t.pass()
            t.true(
                result.nickname === null ||
                    typeof result.nickname == 'string'
            );
        }
    });

    test('r-minor' + dummy, async t => {
        for (let i = 0; i < 2; i++) {
            const result = await me.r_minor('3.6');
            t.deepEqual(
                result,
                {
                    'URL': 'https://cran.rstudio.com/src/base/R-3/R-3.6.3.tar.gz',
                    'version': '3.6.3',
                    'date': '2020-02-29T08:05:16.744223Z',
		    'semver': '3.6.3',
                    'nickname': 'Holding the Windsock'
                }
            );
        }
        await t.throwsAsync(async () => {
	    await me.r_minor('3.7');
	}, { message: 'Cannot find minor version 3.7' });
    });
}

module.exports = run;
