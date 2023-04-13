
const { graphql } = require("@octokit/graphql");

const mycache = require('./cache');
const urls = require('./urls');

async function linux_builds_arm64(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('linux_builds_arm64'); }
    if (cached !== undefined) { return cached; }

    const graphql_auth = graphql.defaults({
        baseUrl: urls.github_api_url,
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
        },
    });

    const value = await graphql_auth(`
       {
         rateLimit {
           cost
           remaining
         }
         repository(owner: "r-hub", name: "R") {
           releases(last: 100) {
             nodes {
               id
               name
               createdAt
               tagName
               releaseAssets(last: 100) {
                 nodes {
                   id
                   name
                   downloadUrl
                 }
               }
             }
           }
         }
       }
    `);

    mycache.set('linux_builds_arm64', value);
    return value;
}

module.exports = linux_builds_arm64;
