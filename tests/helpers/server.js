
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
        
        process.env.NODE_RVERSIONS_MACOS = srv.url + '/dl/macos/%s';
        process.env.NODE_RVERSIONS_TARBALL = srv.url + '/dl/tarball/%s';
        process.env.NODE_RVERSIONS_WIN = srv.url + '/dl/win/%s';
        srv.head('/dl/:os/:ver', async (req, res) => {
            const os = req.params.os;
            const ver = req.params.ver;
            if (os === "macos" && ver === "3.6.3") {
                res.status(404).end();
            } else {
                res.send();
            }
        });

        process.env.NODE_RVERSIONS_DEVEL = srv.url + '/devel';
        process.env.NODE_RVERSIONS_DEVEL_NICK = srv.url + '/devel-nick';
        srv.get('/devel', async (req, res) => {
            res.send('4.0.0 Under development (unstable)\n');
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
        process.env.NODE_RVERSIONS_PATCHED_MACOS= srv.url + '/patched-macos';
        srv.head('/patched-win', async(req, res) => {
            res.status(200).end();
        });
        srv.head('/patched-macos', async(req, res) => {
            res.status(404).end();
        });
    }
}

module.exports = srv;
