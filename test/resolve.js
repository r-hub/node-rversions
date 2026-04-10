
'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const { nock, setup, teardown } = require('./helpers');
const resolve = require('../lib/resolve');

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
};

// --- Mock helpers ---------------------------------------------------------
// Each call registers fresh nock interceptors (consumed once per request).

function mockSvnTags() {
    nock('https://svn.r-project.org')
        .intercept('/R/tags/', 'PROPFIND')
        .reply(207, fix.svnTags, { 'Content-Type': 'text/xml' });
    // 4.5.2 and 4.5.3 are not yet in get-nick.js's local cache
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

function mockPositVersions() {
    nock('https://cdn.posit.co')
        .get('/r/versions.json').reply(200, fix.positVersions);
}

function mockTarball453Head() {
    nock('https://cran.rstudio.com')
        .head('/src/base/R-4/R-4.5.3.tar.gz').reply(200);
}

test.beforeEach(() => { setup(); });
test.afterEach(() => { teardown(); });

// --- OS routing -----------------------------------------------------------

test.serial('resolve throws for unknown OS', async t => {
    await t.throwsAsync(() => resolve('4.5.0', 'haiku'), { message: /Unknown OS/ });
});

test.serial('resolve routes win to Windows resolver', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'win', undefined, false);
    t.true(r.url.includes('windows'));
});

test.serial('resolve routes windows alias to Windows resolver', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'windows', undefined, false);
    t.true(r.url.includes('windows'));
});

test.serial('resolve OS matching is case-insensitive', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'WIN', undefined, false);
    t.true(r.url.includes('windows'));
});

test.serial('resolve routes mac to macOS resolver', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'mac', undefined, false);
    t.true(r.url.includes('macosx') || r.url.includes('macos'));
});

test.serial('resolve routes linux-* to Linux resolver', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'linux-ubuntu-22.04', undefined, false);
    t.true(r.url.includes('posit.co'));
});

test.serial('resolve with no OS resolves without OS-specific URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', undefined, undefined, false);
    t.is(r.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz');
});

// --- No-OS: version strings -----------------------------------------------

test.serial('resolve no-OS specific version returns tarball URL and metadata', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', undefined, undefined, false);
    t.is(r.version, '4.5.0');
    t.is(r.type, '4.5.0');
    t.is(r.nickname, 'How About a Twenty-Six');
    t.is(r.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz');
});

test.serial('resolve no-OS minor version returns latest patch release', async t => {
    mockSvnTags();
    const r = await resolve('4.5', undefined, undefined, false);
    t.is(r.version, '4.5.3');
    t.is(r.type, '4.5');
    t.is(r.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.3.tar.gz');
});

test.serial('resolve no-OS release returns latest release tarball', async t => {
    mockSvnTags();
    mockTarball453Head();
    const r = await resolve('release', undefined, undefined, false);
    t.is(r.version, '4.5.3');
    t.is(r.type, 'release');
    t.is(r.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.3.tar.gz');
});

test.serial('resolve no-OS devel returns devel version info', async t => {
    mockSvnTrunk();
    const r = await resolve('devel', undefined, undefined, false);
    t.is(r.version, '4.7.0');
    t.is(r.type, 'devel');
    t.is(r.nickname, 'Unsuffered Consequences');
    t.is(r.url, 'https://cran.rstudio.com/src/base-prerelease/R-devel.tar.gz');
});

test.serial('resolve no-OS next returns latest branch version', async t => {
    mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    const r = await resolve('next', undefined, undefined, false);
    t.is(r.version, '4.6.0');
    t.is(r.nickname, 'Because it was There');
    t.truthy(r.url);
});

test.serial('resolve no-OS oldrel returns oldrel/1', async t => {
    mockSvnTags();
    const r = await resolve('oldrel', undefined, undefined, false);
    t.is(r.type, 'oldrel/1');
    t.is(r.version, '4.4.3');
});

test.serial('resolve no-OS oldrel/2 returns oldrel/2', async t => {
    mockSvnTags();
    const r = await resolve('oldrel/2', undefined, undefined, false);
    t.is(r.type, 'oldrel/2');
    t.is(r.version, '4.3.3');
});

test.serial('resolve no-OS throws for version not in the list', async t => {
    mockSvnTags();
    await t.throwsAsync(() => resolve('9.9.9', undefined, undefined, false), { message: /Cannot find/ });
});

test.serial('resolve no-OS throws for invalid version string', async t => {
    await t.throwsAsync(() => resolve('notaversion', undefined, undefined, false), { message: /Invalid version/ });
});

// --- Windows --------------------------------------------------------------

test.serial('resolve win x86_64 returns Windows installer URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'win', 'x86_64', false);
    t.is(r.version, '4.5.0');
    t.is(r.url, 'https://cran.rstudio.com/bin/windows/base/old/4.5.0/R-4.5.0-win.exe');
});

test.serial('resolve win pre-4.0 uses cran-archive URL', async t => {
    mockSvnTags();
    const r = await resolve('3.5.0', 'win', 'x86_64', false);
    t.is(r.url, 'https://cran-archive.r-project.org/bin/windows/base/old/3.5.0/R-3.5.0-win.exe');
});

test.serial('resolve win aarch64 returns GitHub arm64 installer URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'win', 'aarch64', false);
    t.is(r.url, 'https://github.com/r-hub/R/releases/download/v4.5.0/R-4.5.0-aarch64.exe');
});

test.serial('resolve win includes rtools and rtools_url fields', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'win', 'x86_64', false);
    t.truthy(r.rtools);
    t.truthy(r.rtools_url);
});

test.serial('resolve win aarch64 throws for versions before 4.4.0', async t => {
    mockSvnTags();
    await t.throwsAsync(
        () => resolve('4.3.0', 'win', 'aarch64', false),
        { message: /No aarch64 Windows/ }
    );
});

// --- macOS ----------------------------------------------------------------

test.serial('resolve mac x86_64 returns big-sur URL for 4.3+', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'mac', 'x86_64', false);
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.5.0-x86_64.pkg');
});

test.serial('resolve mac arm64 returns arm64 URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'mac', 'arm64', false);
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/big-sur-arm64/base/R-4.5.0-arm64.pkg');
});

test.serial('resolve mac x86_64 uses pre-4.3 URL format for older versions', async t => {
    mockSvnTags();
    const r = await resolve('4.2.0', 'mac', 'x86_64', false);
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/base/R-4.2.0.pkg');
});

// --- Linux ----------------------------------------------------------------

test.serial('resolve linux ubuntu-22.04 returns Posit amd64 deb URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.5.0_1_amd64.deb');
});

test.serial('resolve linux release returns latest Posit build', async t => {
    mockSvnTags();
    mockPositVersions();
    const r = await resolve('release', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, 'release');
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.5.3_1_amd64.deb');
});

test.serial('resolve linux throws for unknown distro', async t => {
    await t.throwsAsync(
        () => resolve('4.5.0', 'linux-unknownos-9000', undefined, false),
        { message: /Unknown Linux distro/ }
    );
});
