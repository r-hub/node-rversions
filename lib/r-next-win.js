
const mycache = require('./cache');
const first_link = require('./first-link');
const r_next = require('./r-next');
const r_release = require('./r-release');
const urls = require('./urls');

const got = require('got');
const { graphql } = require("@octokit/graphql");

async function r_next_win_aarch64_url() {
    const graphql_auth = graphql.defaults({
        baseUrl: urls.github_api_url,
        headers: {
            authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    });

    const value = await graphql_auth(`
        query {
        rateLimit {
            cost
            remaining
        }
        repository(owner: "r-hub", name: "R") {
            release(tagName: "vnext") {
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

async function r_next_win(cache = true, arch = 'x86_64') {
    if (arch == "x86_64") {
        return r_next_win_x86_64(cache);
    } else if (arch == "aarch64") {
        return r_next_win_aarch64(cache);
    } else {
        throw new Error("Unsupported Windows arch: '" + arch + "'.");
    }
}

async function r_next_win_aarch64(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_next_win_aarch64'); }
    if (cached !== undefined) { return cached; }

    let value = { date: null }
    value.URL = await r_next_win_aarch64_url();
    value.type = value.URL.split('/').reverse()[0].split('-')[2];
    if (value.type == "patched") {
        const release = await r_release(cache);
        value.version = release.version;
        value.nickname = release.nickname;
    } else {
        const next = await r_next(cache);
        value.version = next.version;
        value.nickname = next.nickname;
    }
    mycache.set('r_next_win_aarch64', value);
    return value;
}

async function r_next_win_x86_64(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_next_win_x86_64'); }
    if (cached !== undefined) { return cached; }

    var rel = r_release(cache);
    var nxt = r_next(cache);

    var all = await Promise.all([rel, nxt]);
    var value = all[1];
    var ver = all[1].version;
    var type = all[1].type;
    var url = `https://cran.rstudio.com/bin/windows/base/R-${ver}${type}-win.exe`;

    ok = false;
    try {
        const resp = await got(url, { method: 'HEAD' });
        ok = true;
    } catch (err) { }

    if (!ok) {
        url = 'https://cran.rstudio.com/bin/windows/base/R-' +
            all[1].version + all[1].type.toLowerCase() + '-win.exe';
        try {
            const resp = await got(url, { method: 'HEAD' });
            ok = true;
        } catch (err) { }
    }

    // pathed might not be there yet, try RC
    if (!ok && all[1].type.toLowerCase() == "patched") {
        url = 'https://cran.rstudio.com/bin/windows/base/R-' +
            all[0].version + "rc" + '-win.exe';
        try {
            const resp = await got(url, { method: 'HEAD' });
            ok = true;
            value.version = all[0].version;
            value.date = null;
            value.nickname = all[0].nickname;
            value.type = "RC";
            value.url = url;
        } catch (err) {
            // skip
        }
    }

    // If the URL for next is not OK, then we serve the patched version
    if (!ok) {
        value.version = all[0].version;
        value.date = null;
        value.nickname = all[0].nickname;
        value.type = 'patched';
        var url = urls.patched_win.replace('%s', value.version + value.type);
        value.URL = url;
    } else {
        value.URL = url;
    }

    mycache.set('r_next_win_x86_64', value);
    return value;
}

module.exports = r_next_win;
