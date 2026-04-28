
'use strict';

const fs = require('fs');
const path = require('path');
const test = require('ava');
const { nock, setup, teardown } = require('./helpers');
const { cmdAvailable, cmdResolve, cmdRtoolsVersions, cmdLinuxDistros } = require('../lib/cli');

const fix = {
    svnTags:             fs.readFileSync(path.join(__dirname, 'fixtures/svn-tags.xml'), 'utf8'),
    svnBranches:         fs.readFileSync(path.join(__dirname, 'fixtures/svn-branches.xml'), 'utf8'),
    trunkVersion:        fs.readFileSync(path.join(__dirname, 'fixtures/svn-trunk-version.txt'), 'utf8'),
    trunkVersionNick:    fs.readFileSync(path.join(__dirname, 'fixtures/svn-trunk-version-nick.txt'), 'utf8'),
    branch46Version:     fs.readFileSync(path.join(__dirname, 'fixtures/svn-branch-4-6-version.txt'), 'utf8'),
    branch46VersionNick: fs.readFileSync(path.join(__dirname, 'fixtures/svn-branch-4-6-version-nick.txt'), 'utf8'),
    nick452: fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-2.txt'), 'utf8').trim(),
    nick453: fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-5-3.txt'), 'utf8').trim(),
    nick460: fs.readFileSync(path.join(__dirname, 'fixtures/version-nick-4-6-0.txt'), 'utf8').trim(),
    rdevelWin: fs.readFileSync(path.join(__dirname, 'fixtures/rdevel-win.html'), 'utf8'),
    positVersions: JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/posit-versions.json'), 'utf8')),
};

function makeOut() {
    const lines = [];
    return { out: { log: s => lines.push(s) }, lines };
}

function mockSvnTags() {
    nock('https://svn.r-project.org')
        .intercept('/R/tags/', 'PROPFIND')
        .reply(207, fix.svnTags, { 'Content-Type': 'text/xml' });
    nock('https://svn.r-project.org')
        .get('/R/tags/R-4-5-2/VERSION-NICK').reply(200, fix.nick452);
    nock('https://svn.r-project.org')
        .get('/R/tags/R-4-5-3/VERSION-NICK').reply(200, fix.nick453);
    nock('https://svn.r-project.org')
        .get('/R/tags/R-4-6-0/VERSION-NICK').reply(200, fix.nick460);
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

test.beforeEach(() => { setup(); });
test.afterEach(() => { teardown(); });

// --- cmdAvailable -----------------------------------------------------------

test.serial('cmdAvailable prints one version per line by default', async t => {
    // 4 concurrent r_versions_bare calls + branch/trunk for next/devel entries
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockTarball453Head();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const { out, lines } = makeOut();
    await cmdAvailable({}, out);
    t.true(lines.length > 100);
    const [ver, url] = lines[0].split('\t');
    t.regex(ver, /^\d/);
    t.regex(url, /^https:/);
});

test.serial('cmdAvailable --json outputs a JSON array with version and url fields', async t => {
    mockSvnTags(); mockSvnTags(); mockSvnTags(); mockSvnTags();
    mockTarball453Head();
    mockSvnBranches();
    mockSvnR46Branch();
    mockSvnTrunk();
    const { out, lines } = makeOut();
    await cmdAvailable({ json: true }, out);
    t.is(lines.length, 1);
    const arr = JSON.parse(lines[0]);
    t.true(Array.isArray(arr));
    t.truthy(arr[0].version);
    t.truthy(arr[0].url);
});

// --- cmdResolve -------------------------------------------------------------

test.serial('cmdResolve prints version and url separated by a tab', async t => {
    mockSvnTags();
    const { out, lines } = makeOut();
    await cmdResolve('4.5.0', {}, out);
    t.is(lines.length, 1);
    const [ver, url] = lines[0].split('\t');
    t.is(ver, '4.5.0');
    t.is(url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz');
});

test.serial('cmdResolve --json outputs the full resolved object', async t => {
    mockSvnTags();
    const { out, lines } = makeOut();
    await cmdResolve('4.5.0', { json: true }, out);
    t.is(lines.length, 1);
    const obj = JSON.parse(lines[0]);
    t.is(obj.version, '4.5.0');
    t.is(obj.url, 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz');
    t.is(obj.type, '4.5.0');
});

test.serial('cmdResolve forwards --os and --arch', async t => {
    mockSvnTags();
    const { out, lines } = makeOut();
    await cmdResolve('4.5.0', { os: 'win', arch: 'x86_64' }, out);
    const [, url] = lines[0].split('\t');
    t.true(url.includes('windows'));
});

test.serial('cmdResolve devel uses trunk mocks', async t => {
    mockSvnTrunk();
    const { out, lines } = makeOut();
    await cmdResolve('devel', {}, out);
    const [ver] = lines[0].split('\t');
    t.regex(ver, /^\d+\.\d+\.\d+$/);
});

test.serial('cmdResolve throws when version is missing', async t => {
    await t.throwsAsync(() => cmdResolve(undefined, {}), { message: /<version> argument is required/ });
});

test.serial('cmdResolve throws for an invalid version string', async t => {
    await t.throwsAsync(() => cmdResolve('notaversion', {}), { message: /Invalid version/ });
});

test.serial('cmdResolve throws for a version not in the list', async t => {
    mockSvnTags();
    await t.throwsAsync(() => cmdResolve('9.9.9', {}), { message: /Cannot find/ });
});

// --- cmdRtoolsVersions ------------------------------------------------------

test('cmdRtoolsVersions prints version and R range per line', t => {
    const { out, lines } = makeOut();
    cmdRtoolsVersions({}, out);
    t.true(lines.length > 5);
    t.regex(lines[0], /^\d+\t[\d.]+\.\.[\d.]+\thttps:/);
});

test('cmdRtoolsVersions --json outputs a JSON array with expected fields', t => {
    const { out, lines } = makeOut();
    cmdRtoolsVersions({ json: true }, out);
    t.is(lines.length, 1);
    const arr = JSON.parse(lines[0]);
    t.true(Array.isArray(arr));
    t.truthy(arr[0].version);
    t.truthy(arr[0].first);
    t.truthy(arr[0].last);
    t.truthy(arr[0].url);
});

test('cmdRtoolsVersions --arch aarch64 returns aarch64 entries', t => {
    const { out, lines } = makeOut();
    cmdRtoolsVersions({ arch: 'aarch64' }, out);
    t.true(lines.length > 0);
});

// --- cmdLinuxDistros --------------------------------------------------------

test('cmdLinuxDistros prints one distro id per line', t => {
    const { out, lines } = makeOut();
    cmdLinuxDistros({}, out);
    t.true(lines.length > 5);
    t.regex(lines[0], /^[a-z]+-\d/);
});

test('cmdLinuxDistros --json outputs a JSON array with id and name fields', t => {
    const { out, lines } = makeOut();
    cmdLinuxDistros({ json: true }, out);
    t.is(lines.length, 1);
    const arr = JSON.parse(lines[0]);
    t.true(Array.isArray(arr));
    t.truthy(arr[0].id);
    t.truthy(arr[0].name);
});
