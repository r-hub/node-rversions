
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
    rdevelWin: fs.readFileSync(path.join(__dirname, 'fixtures/rdevel-win.html'), 'utf8'),
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

// --- Additional Windows tests -----------------------------------------------

function mockRdevelWin() {
    nock('https://cran.rstudio.com')
        .get('/bin/windows/base/rdevel.html').reply(200, fix.rdevelWin);
}

function mockReleaseWinHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/windows/base/R-4.5.3-win.exe').reply(200);
}

function mockNextWinHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/windows/base/R-4.6.0beta-win.exe').reply(200);
}

function mockReleaseMacHead() {
    nock('https://cran.rstudio.com')
        .head('/bin/macosx/big-sur-x86_64/base/R-4.5.3-x86_64.pkg').reply(200);
}

function mockNextMacHead() {
    nock('https://mac.cran.dev')
        .head('/big-sur/last-success/R-4.6-branch-x86_64.pkg').reply(200);
}

test.serial('resolve win throws for unsupported arch', async t => {
    await t.throwsAsync(
        () => resolve('4.5.0', 'win', 'mips', false),
        { message: /Unsupported Windows arch/ }
    );
});

test.serial('resolve win arm64 alias resolves as aarch64', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'win', 'arm64', false);
    t.true(r.url.includes('aarch64'));
    t.true(r.url.includes('4.5.0'));
});

test.serial('resolve win devel returns devel installer URL', async t => {
    mockSvnTrunk();
    mockRdevelWin();
    const r = await resolve('devel', 'win', 'x86_64', false);
    t.is(r.version, '4.7.0');
    t.is(r.type, 'devel');
    t.is(r.url, 'https://cran.rstudio.com/bin/windows/base/R-devel-win.exe');
});

test.serial('resolve win release returns latest installer URL', async t => {
    mockSvnTags();
    mockReleaseWinHead();
    const r = await resolve('release', 'win', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, 'release');
    t.is(r.url, 'https://cran.rstudio.com/bin/windows/base/R-4.5.3-win.exe');
});

test.serial('resolve win next returns beta installer URL', async t => {
    // r_release is called twice concurrently (directly + inside r_next)
    mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockNextWinHead();
    const r = await resolve('next', 'win', 'x86_64', false);
    t.is(r.type, 'next');
    t.is(r.version, '4.6.0');
    t.is(r.url, 'https://cran.rstudio.com/bin/windows/base/R-4.6.0beta-win.exe');
});

test.serial('resolve win oldrel returns oldrel Windows URL', async t => {
    mockSvnTags();
    const r = await resolve('oldrel', 'win', 'x86_64', false);
    t.is(r.type, 'oldrel/1');
    t.is(r.version, '4.4.3');
    t.true(r.url.includes('windows'));
});

test.serial('resolve win minor version returns latest patch installer', async t => {
    // r_release_win and r_minor both call r_versions_bare concurrently
    mockSvnTags(); mockSvnTags();
    mockReleaseWinHead();
    const r = await resolve('4.5', 'win', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, '4.5');
    t.is(r.url, 'https://cran.rstudio.com/bin/windows/base/old/4.5.3/R-4.5.3-win.exe');
});

// --- Additional macOS tests -------------------------------------------------

test.serial('resolve mac throws for unsupported arch', async t => {
    await t.throwsAsync(
        () => resolve('4.5.0', 'mac', 'mips', false),
        { message: /Unsupported macOS arch/ }
    );
});

test.serial('resolve mac aarch64 alias resolves as arm64', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'mac', 'aarch64', false);
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/big-sur-arm64/base/R-4.5.0-arm64.pkg');
});

test.serial('resolve mac 3.2.5 returns revised package URL', async t => {
    mockSvnTags();
    const r = await resolve('3.2.5', 'mac', 'x86_64', false);
    t.is(r.url, 'https://cran-archive.r-project.org/bin/macosx/base/R-3.2.4-revised.pkg');
});

test.serial('resolve mac pre-2.10.0 throws', async t => {
    mockSvnTags();
    await t.throwsAsync(
        () => resolve('2.9.0', 'mac', 'x86_64', false),
        { message: /No macOS installers/ }
    );
});

test.serial('resolve mac pre-4.0 uses cran-archive URL', async t => {
    mockSvnTags();
    const r = await resolve('3.0.0', 'mac', 'x86_64', false);
    t.is(r.url, 'https://cran-archive.r-project.org/bin/macosx/base/R-3.0.0.pkg');
});

test.serial('resolve mac pre-4.1.0 arm64 throws', async t => {
    mockSvnTags();
    await t.throwsAsync(
        () => resolve('4.0.0', 'mac', 'arm64', false),
        { message: /No arm64 macOS/ }
    );
});

test.serial('resolve mac devel returns devel pkg URL', async t => {
    mockSvnTrunk();
    const r = await resolve('devel', 'mac', 'x86_64', false);
    t.is(r.version, '4.7.0');
    t.is(r.type, 'devel');
    t.is(r.url, 'https://mac.cran.dev/big-sur/last-success/R-4.6-branch-x86_64.pkg');
});

test.serial('resolve mac release returns latest pkg URL', async t => {
    mockSvnTags();
    mockReleaseMacHead();
    const r = await resolve('release', 'mac', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, 'release');
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.5.3-x86_64.pkg');
});

test.serial('resolve mac next returns beta pkg URL', async t => {
    // r_release is called twice concurrently (directly + inside r_next)
    mockSvnTags(); mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    mockNextMacHead();
    const r = await resolve('next', 'mac', 'x86_64', false);
    t.is(r.type, 'next');
    t.is(r.version, '4.6.0');
    t.is(r.url, 'https://mac.cran.dev/big-sur/last-success/R-4.6-branch-x86_64.pkg');
});

test.serial('resolve mac oldrel returns oldrel pkg URL', async t => {
    mockSvnTags();
    const r = await resolve('oldrel', 'mac', 'x86_64', false);
    t.is(r.type, 'oldrel/1');
    t.is(r.version, '4.4.3');
    t.true(r.url.includes('big-sur-x86_64'));
});

test.serial('resolve mac minor version returns latest patch pkg', async t => {
    // r_release_macos and r_minor both call r_versions_bare concurrently
    mockSvnTags(); mockSvnTags();
    mockReleaseMacHead();
    const r = await resolve('4.5', 'mac', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, '4.5');
    t.is(r.url, 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.5.3-x86_64.pkg');
});

// --- Additional Linux tests -------------------------------------------------

test.serial('resolve linux throws for unsupported arch', async t => {
    await t.throwsAsync(
        () => resolve('4.5.0', 'linux-ubuntu-22.04', 'mips', false),
        { message: /Unsupported Linux arch/ }
    );
});

test.serial('resolve linux arm64 throws when no aarch64 builds available', async t => {
    await t.throwsAsync(
        () => resolve('4.5.0', 'linux-ubuntu-16.04', 'arm64', false),
        { message: /No R builds available/ }
    );
});

test.serial('resolve linux aarch64 alias routes to arm64 posit URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'linux-ubuntu-22.04', 'aarch64', false);
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.5.0_1_arm64.deb');
});

test.serial('resolve linux ubuntu-24.04 arm64 sets aarch64-ppm-binaries', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'linux-ubuntu-24.04', 'arm64', false);
    t.true(r['ppm-binaries']);
});

test.serial('resolve linux ubuntu-18.04 arm64 uses rhub github URL', async t => {
    mockSvnTags();
    const r = await resolve('4.5.0', 'linux-ubuntu-18.04', 'arm64', false);
    t.true(r.url.includes('github.com'));
    t.true(r.url.includes('ubuntu-1804'));
    t.true(r.url.includes('4.5.0'));
});

test.serial('resolve linux devel returns devel posit URL', async t => {
    mockSvnTrunk();
    const r = await resolve('devel', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.version, '4.7.0');
    t.is(r.type, 'devel');
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-devel_1_amd64.deb');
});

test.serial('resolve linux next returns next posit URL', async t => {
    mockSvnTags();
    mockSvnBranches();
    mockSvnR46Branch();
    const r = await resolve('next', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.type, 'next');
    t.is(r.version, '4.6.0');
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-next_1_amd64.deb');
});

test.serial('resolve linux oldrel returns oldrel posit URL', async t => {
    mockSvnTags();
    const r = await resolve('oldrel', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.type, 'oldrel/1');
    t.is(r.version, '4.4.3');
    t.true(r.url.includes('posit.co'));
});

test.serial('resolve linux minor version amd64 returns latest patch posit URL', async t => {
    // r_minor and the direct r_versions_bare call both fetch SVN tags concurrently
    mockSvnTags(); mockSvnTags();
    mockPositVersions();
    const r = await resolve('4.5', 'linux-ubuntu-22.04', 'x86_64', false);
    t.is(r.version, '4.5.3');
    t.is(r.type, '4.5');
    t.is(r.url, 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.5.3_1_amd64.deb');
});
