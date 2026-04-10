
'use strict';

const test = require('ava');
const { rtools_match, rtools_versions, rtools_versions_aarch64 } = require('../lib/rtools');

// --- rtools_versions exports -----------------------------------------------

test('rtools_versions is an array of objects with version, url, first, last', t => {
    t.true(Array.isArray(rtools_versions));
    t.true(rtools_versions.length > 0);
    for (const r of rtools_versions) {
        t.truthy(r.version);
        t.truthy(r.url);
        t.truthy(r.first);
        t.truthy(r.last);
    }
});

test('rtools_versions_aarch64 is an array with aarch64 URLs', t => {
    t.true(Array.isArray(rtools_versions_aarch64));
    t.true(rtools_versions_aarch64.length > 0);
    t.true(rtools_versions_aarch64.every(r => r.url.includes('aarch64')));
});

// --- rtools_match: R version → Rtools version -----------------------------

const cases_x86_64 = [
    // [R version, expected Rtools version, URL substring]
    ['2.0.0',  '26',  'Rtools26'],
    ['2.5.3',  '26',  'Rtools26'],
    ['2.6.0',  '27',  'Rtools27'],
    ['2.6.2',  '27',  'Rtools27'],
    ['2.7.0',  '28',  'Rtools28'],
    ['2.7.2',  '28',  'Rtools28'],
    ['2.8.0',  '29',  'Rtools29'],
    ['2.8.1',  '29',  'Rtools29'],
    ['2.9.0',  '210', 'Rtools210'],
    ['2.9.2',  '210', 'Rtools210'],
    ['2.10.0', '211', 'Rtools211'],
    ['2.11.1', '211', 'Rtools211'],
    ['2.12.0', '212', 'Rtools212'],
    ['2.12.2', '212', 'Rtools212'],
    ['2.13.0', '214', 'Rtools214'],
    ['2.14.1', '214', 'Rtools214'],
    ['2.14.2', '215', 'Rtools215'],
    ['2.15.1', '215', 'Rtools215'],
    ['2.15.2', '30',  'Rtools30'],
    ['2.15.3', '30',  'Rtools30'],
    ['3.0.0',  '31',  'Rtools31'],
    ['3.0.3',  '31',  'Rtools31'],
    ['3.1.0',  '32',  'Rtools32'],
    ['3.1.3',  '32',  'Rtools32'],
    ['3.2.0',  '33',  'Rtools33'],
    ['3.2.5',  '33',  'Rtools33'],
    ['3.3.0',  '35',  'Rtools35'],
    ['3.6.3',  '35',  'Rtools35'],
    ['4.0.0',  '40',  'rtools40'],
    ['4.1.3',  '40',  'rtools40'],
    ['4.2.0',  '42',  'rtools42'],
    ['4.2.3',  '42',  'rtools42'],
    ['4.3.0',  '43',  'rtools43'],
    ['4.3.3',  '43',  'rtools43'],
    ['4.4.0',  '44',  'rtools44'],
    ['4.4.3',  '44',  'rtools44'],
    ['4.5.0',  '45',  'rtools45'],
    ['4.5.3',  '45',  'rtools45'],
    ['10.0.0', '45',  'rtools45'],
];

for (const [rver, rtver, urlpart] of cases_x86_64) {
    test(`rtools_match ${rver} x86_64 → Rtools ${rtver}`, t => {
        const r = rtools_match(rver, 'x86_64');
        t.is(r.version, rtver);
        t.true(r.url.includes(urlpart));
        t.truthy(r.first);
        t.truthy(r.last);
    });
}

// --- rtools_match: aarch64 ------------------------------------------------

test('rtools_match 4.4.0 aarch64 returns aarch64 URL', t => {
    const r = rtools_match('4.4.0', 'aarch64');
    t.is(r.version, '44');
    t.true(r.url.includes('aarch64'));
    t.true(r.url.includes('rtools44'));
});

test('rtools_match 4.5.0 aarch64 returns aarch64 URL', t => {
    const r = rtools_match('4.5.0', 'aarch64');
    t.is(r.version, '45');
    t.true(r.url.includes('aarch64'));
    t.true(r.url.includes('rtools45'));
});

// --- rtools_match: default arch is x86_64 ---------------------------------

test('rtools_match uses x86_64 as default arch', t => {
    const withArch = rtools_match('4.5.0', 'x86_64');
    const withDefault = rtools_match('4.5.0');
    t.is(withDefault.version, withArch.version);
    t.is(withDefault.url, withArch.url);
});
