
const createTestServer = require('create-test-server');

// We use a test server, unless NODE_RVERSIONS_NOMOCK is set

async function srv() {
    if (! process.env.NODE_RVERSIONS_NOMOCK) {
        const {promisify} = require('util');
        const fs = require('fs');
        const readFile = promisify(fs.readFile);

        srv = await createTestServer();

        process.env.NODE_RVERSIONS_SVN = srv.url + '/tags';
        srv.propfind('/tags', async (req, res) => {
            const xml = await readFile('tests/fixtures/tags.txt', 'utf8');
            res.send(xml);
        });

        process.env.NODE_RVERSIONS_NICK = srv.url + '/nick/R-%s';
        srv.get('/nick/:ver', async (req, res) => {
            const ver = req.params.ver;
            if (ver == "R-3-6-2") {
                res.send("Dark and Stormy Night");
            } else if (ver == "R-3-6-3") {
                res.send('Holding the Windsock');
            } else if (ver == "R-4-1-3") {
                res.send('One Push-Up');
            } else {
                res.send('This is ' + req.params.ver);
            }
        });

        process.env.NODE_RVERSIONS_MACOS_X86_64 = srv.url + '/dl/macos/%s';
        process.env.NODE_RVERSIONS_MACOS2_X86_64 = srv.url + '/dl/macos/%s';
        process.env.NODE_RVERSIONS_MACOS_ARM64 = srv.url + '/dl/macos/%s';
        process.env.NODE_RVERSIONS_MACOS2_ARM64 = srv.url + '/dl/macos/%s';
        process.env.NODE_RVERSIONS_TARBALL = srv.url + '/dl/tarball/%s';
        process.env.NODE_RVERSIONS_WIN = srv.url + '/dl/win/%s';
        srv.head('/dl/:os/:ver', async (req, res) => {
            const os = req.params.os;
            const ver = req.params.ver;
            if (os === "macos" && ver === "4.2.3") {
                res.status(404).end();
            } else {
                res.send();
            }
        });

        process.env.NODE_RVERSIONS_DEVEL = srv.url + '/devel';
        process.env.NODE_RVERSIONS_DEVEL_NICK = srv.url + '/devel-nick';
        srv.get('/devel', async (req, res) => {
            res.send('4.4.0 Under development (unstable)\n');
        });
        srv.get('/devel-nick', async (req, res) => {
            res.send('Unsuffered Consequences\n');
        });

        process.env.NODE_RVERSIONS_BRANCHES = srv.url + '/branches';
        process.env.NODE_RVERSIONS_BRANCH = srv.url + '/branch';
        process.env.NODE_RVERSIONS_BRANCH_NICK = srv.url + '/branch-nick';
        srv.propfind('/branches', async (req, res) => {
            const xml = await readFile('tests/fixtures/branches.txt', 'utf8');
            res.send(xml);
        });
        srv.get('/branch', async(req, res) => {
            res.send('4.2.0 alpha\n');
        });
        srv.get('/branch-nick', async(req, res) => {
            res.send('\n');
        });

        process.env.NODE_RVERSIONS_PATCHED_WIN = srv.url + '/patched-win';
        process.env.NODE_RVERSIONS_PATCHED_MACOS_X86_64 = srv.url + '/patched-macos';
        process.env.NODE_RVERSIONS_PATCHED_MACOS_ARM64 = srv.url + '/patched-macos';
        srv.head('/patched-win', async(req, res) => {
            res.status(200).end();
        });
        srv.head('/patched-macos', async(req, res) => {
            res.status(404).end();
        });

        process.env.NODE_RVERSIONS_LINUX_BUILDS_AMD64 = srv.url + '/versions.json';
        srv.get('/versions.json', async(req, res) => {
            const vers = await readFile('tests/fixtures/versions.json', 'utf8');
            res.send(vers);
        });

        process.env.NODE_RVERSIONS_GITHUB_API_URL = srv.url + '/gh';
        srv.post('/gh/graphql', async(req, res) => {
            const ans = await readFile('tests/fixtures/gh-arm64-release.json', 'utf8');
            res.set('content-type', 'application/json; charset=utf-8');
            res.set('x-github-media-type', 'github.v4; format=json');
            res.set('server', 'GitHub.com');
            res.set('date', Date());
            res.send(ans);
        });

        process.env.NODE_RVERSIONS_DEVEL_WIN = srv.url + '/rdevel.html';
        srv.get('/rdevel.html', async(req, res) => {
            const ans = await readFile('tests/fixtures/rdevel.html', 'utf8');
            res.set('content-type', 'text/html; charset=utf-8');
            res.send(ans);
        });
    }
}

module.exports = srv;
