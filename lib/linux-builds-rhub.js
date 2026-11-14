
const { graphql } = require("@octokit/graphql");
const semver = require('semver');
const semverSort = require('semver/functions/sort');

const mycache = require('./cache');
const urls = require('./urls');

// All releases of github.com/r-hub/R, with the download URLs of their
// assets. Returns an object: tag name (without the 'v' prefix) -> list of
// download URLs.

async function rhub_release_assets(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('rhub_release_assets'); }
    if (cached !== undefined) { return cached; }

    const graphql_auth = graphql.defaults({
        baseUrl: urls.github_api_url,
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
        },
    });

    console.log(`Fetching r-hub/R release assets from ${urls.github_api_url} ...`);

    const value = {};
    let cursor = null;
    while (true) {
        const resp = await graphql_auth(`
          query($cursor: String) {
            repository(owner: "r-hub", name: "R") {
              releases(
                first: 100,
                after: $cursor,
                orderBy: { field: CREATED_AT, direction: DESC }
              ) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  tagName
                  releaseAssets(first: 100) {
                    nodes {
                      downloadUrl
                    }
                  }
                }
              }
            }
          }
        `, { cursor: cursor });

        const rels = resp.repository.releases;
        for (const rel of rels.nodes) {
            const ver = rel.tagName.replace(/^v/, "");
            value[ver] = rel.releaseAssets.nodes.map(x => x.downloadUrl);
        }
        if (!rels.pageInfo.hasNextPage) { break; }
        cursor = rels.pageInfo.endCursor;
    }

    mycache.set('rhub_release_assets', value);
    return value;
}

// Versions that have a build for a platform with 'builds': 'rhub', i.e.
// an asset that matches the URL template, in increasing order, with
// 'next' and 'devel' at the end, if they exist.
// `url` is the template with everything but '{ver}' filled in.

async function linux_builds_rhub(url, cache = true) {
    const assets = await rhub_release_assets(cache);
    const has = ver => assets[ver].indexOf(url.replaceAll('{ver}', ver)) != -1;
    const vers = Object.keys(assets)
        .filter(v => !!semver.valid(v) && has(v));
    const value = semverSort(vers);
    if (assets['next'] && has('next')) { value.push('next'); }
    if (assets['devel'] && has('devel')) { value.push('devel'); }
    return value;
}

module.exports = linux_builds_rhub;
