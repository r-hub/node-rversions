
const mycache = require('./cache');
const urls = require('./urls');
const { graphql } = require("@octokit/graphql");

const got = require('got');

async function r_devel_win_aarch64_url() {
    const graphql_auth = graphql.defaults({
        baseUrl: urls.github_api_url,
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
        },
    });

    const value = await graphql_auth(`
        query {
        rateLimit {
            cost
            remaining
        }
        repository(owner: "r-hub", name: "R") {
            release(tagName: "vdevel") {
            releaseAssets(last: 100) {
                nodes {
                    downloadUrl
                }
            }
            }
        }
    }`);

    const assets = value.repository.release.releaseAssets.nodes;
    const last = assets.findLast(ra => ra.downloadUrl.endsWith('-aarch64.exe'));
    return last.downloadUrl;
}

async function r_devel_win(cache = true, arch = "x86_64") {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_devel_win_' + arch); }
    if (cached !== undefined) { return cached; }

    const p1 = got(urls.devel);
    const p2 = got(urls.devel_nick);
    const p3 = got(urls.devel_win);

    var all = await Promise.all([p1, p2, p3]);
    var srcver = all[0].body.trim().split(' ')[0];
    var nick = all[1].body.trim();
    var binver;
    // In case the format of the web page changes, we fall back to the
    // version number in SVN.
    try {
        binver = all[2].body
            .match(/^.*which will eventually become\sR-([0-9.]+)[)].*$/m)[1];
    } catch (err) {
        binver = srcver;
    };
    const url = arch == "x86_64" ? urls.devel_win_file : await r_devel_win_aarch64_url();
    const value = {
        'version': binver,
        date: null,
        'nickname': nick,
        'URL': url
    };

    mycache.set('r_devel_win_' + arch, value);
    return value;
}

module.exports = r_devel_win;
