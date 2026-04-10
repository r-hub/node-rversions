
'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const { nock, setup, teardown } = require('./helpers');
const r_versions = require('../lib/r-versions');

const svnTagsFixture = fs.readFileSync(
    path.join(__dirname, 'fixtures/svn-tags.xml'),
    'utf8'
);

// Versions not yet in get-nick.js's local cache need their own mocks.
// These fixture files were downloaded from the real SVN server.
const nickFixtures = {
    '4.5.2': fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-2.txt'), 'utf8').trim(),
    '4.5.3': fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-3.txt'), 'utf8').trim(),
};

function mockSvnTags() {
    nock('https://svn.r-project.org')
        .intercept('/R/tags/', 'PROPFIND')
        .reply(207, svnTagsFixture, { 'Content-Type': 'text/xml' });

    for (const [ver, nick] of Object.entries(nickFixtures)) {
        nock('https://svn.r-project.org')
            .get(`/R/tags/R-${ver.replace(/\./g, '-')}/VERSION-NICK`)
            .reply(200, nick);
    }
}

test.beforeEach(() => { setup(); });
test.afterEach(() => { teardown(); });

test('r_versions returns an array', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    t.true(Array.isArray(versions));
    t.true(versions.length > 0);
});

test('r_versions objects have version, date, semver, nickname fields', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    for (const v of versions) {
        t.true('version' in v, `version field missing on ${v.version}`);
        t.true('date' in v, `date field missing on ${v.version}`);
        t.true('semver' in v, `semver field missing on ${v.version}`);
        t.true('nickname' in v, `nickname field missing on ${v.version}`);
    }
});

test('r_versions includes historic releases', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    const v = versions.find(v => v.version === '0.0');
    t.truthy(v);
    t.is(v.date, '1995-06-20T00:00:00.000000Z');
});

test('r_versions includes versions from SVN', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    t.truthy(versions.find(v => v.version === '4.5.0'));
    t.truthy(versions.find(v => v.version === '4.5.1'));
});

test('r_versions are sorted by date ascending', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    for (let i = 1; i < versions.length; i++) {
        t.true(
            versions[i - 1].date <= versions[i].date,
            `${versions[i - 1].version} (${versions[i - 1].date}) should come before ` +
            `${versions[i].version} (${versions[i].date})`
        );
    }
});

test('r_versions populates nickname for known versions', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    const cases = [
        ['4.5.0', 'How About a Twenty-Six'],
        ['4.5.1', 'Great Square Root'],
        ['4.5.2', '[Not] Part in a Rumble'],
        ['4.5.3', 'Reassured Reassurer'],
    ];
    for (const [ver, nick] of cases) {
        const v = versions.find(v => v.version === ver);
        t.is(v.nickname, nick, `nickname for ${ver}`);
    }
});

test('r_versions sets nickname to null for old versions without one', async t => {
    mockSvnTags();
    const versions = await r_versions(false);
    const v = versions.find(v => v.version === '0.0');
    t.is(v.nickname, null);
});

test('r_versions caches results on second call', async t => {
    mockSvnTags(); // registered for first call only
    await r_versions(false); // populates cache
    // second call must use cache — nock would throw on an unexpected request
    const versions2 = await r_versions(true);
    t.true(Array.isArray(versions2));
});

test('r_versions cache=false re-fetches from network', async t => {
    mockSvnTags();
    await r_versions(false);
    // second call with cache=false needs a second interceptor
    mockSvnTags();
    const versions2 = await r_versions(false);
    t.true(Array.isArray(versions2));
});
