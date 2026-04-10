
'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const { nock, setup, teardown } = require('./helpers');
const available = require('../lib/available');

const fix = {
    svnTags:             fs.readFileSync(path.join(__dirname, 'fixtures/svn-tags.xml'), 'utf8'),
    svnBranches:         fs.readFileSync(path.join(__dirname, 'fixtures/svn-branches.xml'), 'utf8'),
    trunkVersion:        fs.readFileSync(path.join(__dirname, 'fixtures/svn-trunk-version.txt'), 'utf8'),
    trunkVersionNick:    fs.readFileSync(path.join(__dirname, 'fixtures/svn-trunk-version-nick.txt'), 'utf8'),
    branch46Version:     fs.readFileSync(path.join(__dirname, 'fixtures/svn-branch-4-6-version.txt'), 'utf8'),
    branch46VersionNick: fs.readFileSync(path.join(__dirname, 'fixtures/svn-branch-4-6-version-nick.txt'), 'utf8'),
    positVersions:       JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/posit-versions.json'), 'utf8')),
    nick452: fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-2.txt'), 'utf8').trim(),
    nick453: fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-3.txt'), 'utf8').trim(),
    rdevelWin: fs.readFileSync(path.join(__dirname, 'fixtures/rdevel-win.html'), 'utf8'),
};

// --- Mock helpers ---------------------------------------------------------

function mockSvnTags() {
    nock('https://svn.r-project.org')
        .intercept('/R/tags/', 'PROPFIND')
        .reply(207, fix.svnTags, { 'Content-Type': 'text/xml' });
    nock('https://svn.r-project.org')
        .get('/R/tags/R-4-5-2/VERSION-NICK').reply(200, fix.nick452);
    nock('https://svn.r-project.org')
        .get('/R/tags/R-4-5-3/VERSION-NICK').reply(200, fix.nick453);
}

function mockSvnBranches() {
    nock('https://svn.r-project.org')
        .intercept('/R/branches/', 'PROPFIND')
        .reply(207, fix.svnBranches, { 'Content-Type': 'text/xml' });
}

function mockSvnTrunk() {
    nock('https://svn.r-project.org')
        .get('/R/trunk/VERSION').reply(200, fix.trunkVersion)
        .get('/R/trunk/VERSION-NICK').reply(200, fix.trunkVersionNick);
}

function mockSvnR46Branch() {
    nock('https://svn.r-project.org')
        .get('/R/branches/R-4-6-branch/VERSION').reply(200, fix.branch46Version)
        .get('/R/branches/R-4-6-branch/VERSION-NICK').reply(200, fix.branch46VersionNick);
}

function mockTarball453Head() {
    nock('https://cran.rstudio.com')
        .head('/src/base/R-4/R-4.5.3.tar.gz').reply(200);
}

function mockReleaseWinHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/windows/base/R-4.5.3-win.exe').reply(200);
}

function mockNextWinHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/windows/base/R-4.6.0beta-win.exe').reply(200);
}

function mockRdevelWin() {
    nock('https://cran.rstudio.com')
        .get('/bin/windows/base/rdevel.html').reply(200, fix.rdevelWin);
}

function mockReleaseMacHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/macosx/big-sur-x86_64/base/R-4.5.3-x86_64.pkg').reply(200);
}

function mockNextMacHead() {
    nock('https://mac.cran.dev')
        .head('/big-sur/last-success/R-4.6-branch-x86_64.pkg').reply(200);
}

function mockPositVersions() {
    nock('https://cdn.posit.co')
        .get('/r/versions.json').reply(200, fix.positVersions);
}

test.beforeEach(() => { setup(); });
test.afterEach(() => { teardown(); });

// --- OS routing -----------------------------------------------------------

test.serial('available throws for unknown OS', async t => {
    await t.throwsAsync(() => available('haiku', undefined, false), { message: /Unknown OS/ });
});

test.serial('available win alias routes to Windows handler', async t => {
    // 5 concurrent r_versions_bare calls (pver, prel, prwn, 2 inside r_next_win)
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockRdevelWin();
    mockReleaseWinHead();
    mockNextWinHead();
    const av = await available('windows', 'x86_64', false);
    t.true(Array.isArray(av));
    t.true(av.some(v => v.url.includes('windows')));
});

test.serial('available OS matching is case-insensitive', async t => {
    // Same mocks as win test
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockRdevelWin();
    mockReleaseWinHead();
    mockNextWinHead();
    const av = await available('WIN', 'x86_64', false);
    t.true(Array.isArray(av));
});

// --- No-OS ----------------------------------------------------------------

test.serial('available no-OS returns array with required fields', async t => {
    // 4 concurrent r_versions_bare calls: pver, prel, prtb (first_link), pnxt (r_release inside r_next)
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockTarball453Head();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available(undefined, undefined, false);
    t.true(Array.isArray(av));
    t.true(av.length > 10);
    for (const v of av) {
        t.not(v.version, undefined, `version missing on ${v.name}`);
        t.not(v.name, undefined, `name missing on entry`);
        t.not(v.type, undefined, `type missing on ${v.name}`);
        t.not(v.url, undefined, `url missing on ${v.name}`);
    }
});

test.serial('available no-OS last two entries are next and devel', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockTarball453Head();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available(undefined, undefined, false);
    t.is(av[av.length - 2].name, 'next');
    t.is(av[av.length - 1].name, 'devel');
    t.is(av[av.length - 2].version, '4.6.0');
    t.is(av[av.length - 1].version, '4.7.0');
});

test.serial('available no-OS release entries have tarball URLs', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockTarball453Head();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available(undefined, undefined, false);
    const rel = av.find(v => v.version === '4.5.0');
    t.is(rel.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz');
    t.is(rel.type, 'release');
    t.is(rel.name, '4.5.0');
});

// --- Windows --------------------------------------------------------------

test.serial('available mac throws for unknown arch', async t => {
    await t.throwsAsync(() => available('mac', 'mips', false), { message: /Unknown macos arch/ });
});

test.serial('available win x86_64 returns array with Windows installer URLs', async t => {
    // 5 concurrent r_versions_bare: pver, prel, prwn (first_link), 2 r_release inside r_next_win
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockRdevelWin();
    mockReleaseWinHead();
    mockNextWinHead();
    const av = await available('win', 'x86_64', false);
    t.true(Array.isArray(av));
    t.true(av.length > 5);
    // Release entries have Windows URLs
    const releases = av.filter(v => v.type === 'release');
    t.true(releases.every(v => v.url.includes('windows') || v.url.includes('github.com')));
    // Last two are next and devel
    t.is(av[av.length - 2].name, 'next');
    t.is(av[av.length - 1].name, 'devel');
    t.is(av[av.length - 2].version, '4.6.0');
    t.is(av[av.length - 1].version, '4.7.0');
    t.is(av[av.length - 1].url, 'https://cran.rstudio.com/bin/windows/base/R-devel-win.exe');
});

test.serial('available win x86_64 oldest release is 2.0.0', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockRdevelWin();
    mockReleaseWinHead();
    mockNextWinHead();
    const av = await available('win', 'x86_64', false);
    const releases = av.filter(v => v.type === 'release');
    t.is(releases[0].version, '2.0.0');
});

// --- macOS ----------------------------------------------------------------

test.serial('available mac x86_64 returns array with macOS pkg URLs', async t => {
    // 5 concurrent r_versions_bare: pver, prel, prmc (first_link), 2 r_release inside r_next_mac
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockReleaseMacHead();
    mockNextMacHead();
    const av = await available('mac', 'x86_64', false);
    t.true(Array.isArray(av));
    t.true(av.length > 5);
    // Release entries have macOS URLs
    const releases = av.filter(v => v.type === 'release');
    t.true(releases.every(v =>
        v.url.includes('macosx') || v.url.includes('cran-archive') || v.url.includes('cran.rstudio.com')
    ));
    // Last two are next and devel
    t.is(av[av.length - 2].name, 'next');
    t.is(av[av.length - 1].name, 'devel');
    t.is(av[av.length - 2].version, '4.6.0');
    t.is(av[av.length - 1].version, '4.7.0');
});

test.serial('available mac x86_64 oldest release is 2.10.0', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    mockReleaseMacHead();
    mockNextMacHead();
    const av = await available('mac', 'x86_64', false);
    const releases = av.filter(v => v.type === 'release');
    t.is(releases[0].version, '2.10.0');
});

test.serial('available mac arm64 oldest release is 4.1.0', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    // arm64 release HEAD
    nock('https://cran.rstudio.com')
        .head('/bin/macosx/big-sur-arm64/base/R-4.5.3-arm64.pkg').reply(200);
    // arm64 next HEAD (same URL as x86_64 next but for arm64)
    nock('https://mac.cran.dev')
        .head('/sonoma/last-success/R-4.6-branch-arm64.pkg').reply(200);
    const av = await available('mac', 'arm64', false);
    const releases = av.filter(v => v.type === 'release');
    t.is(releases[0].version, '4.1.0');
});

// --- Linux ----------------------------------------------------------------

test.serial('available linux throws for unknown distro', async t => {
    await t.throwsAsync(
        () => available('linux-unknownos-9000', undefined, false),
        { message: /Unknown Linux distro/ }
    );
});

test.serial('available linux ubuntu-22.04 amd64 returns array with posit URLs', async t => {
    // 2 concurrent r_versions_bare: pbar, pnxt's inner r_release
    mockSvnTags(); mockSvnTags();
    mockPositVersions();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available('linux-ubuntu-22.04', 'x86_64', false);
    t.true(Array.isArray(av));
    t.true(av.length > 5);
    // Release entries use Posit CDN
    const releases = av.filter(v => v.type === 'release');
    t.true(releases.every(v => v.url.includes('cdn.posit.co')));
    // next and devel appear with real version numbers
    const nxt = av.find(v => v.name === 'next');
    const dev = av.find(v => v.name === 'devel');
    t.is(nxt.version, '4.6.0');
    t.is(dev.version, '4.7.0');
});

test.serial('available linux ubuntu-22.04 amd64 entries have required fields', async t => {
    mockSvnTags(); mockSvnTags();
    mockPositVersions();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available('linux-ubuntu-22.04', 'x86_64', false);
    for (const v of av) {
        t.not(v.version, undefined, `version missing`);
        t.not(v.name, undefined, `name missing`);
        t.not(v.type, undefined, `type missing`);
        t.not(v.url, undefined, `url missing`);
    }
});

test.serial('available linux retired distro filters to last-build', async t => {
    // ubuntu-18.04 is retired with last-build='4.3.1'
    mockSvnTags(); mockSvnTags();
    mockPositVersions();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const av = await available('linux-ubuntu-18.04', 'x86_64', false);
    t.true(Array.isArray(av));
    t.true(av.some(v => v.version === '4.3.1'));
    // Versions after the last-build are filtered out
    t.false(av.some(v => v.version === '4.4.0'));
    t.false(av.some(v => v.version === '4.5.0'));
    // next and devel removed by retired filter
    t.false(av.some(v => v.name === 'next'));
    t.false(av.some(v => v.name === 'devel'));
});
