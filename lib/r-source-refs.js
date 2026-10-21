
const urls = require('./urls');
const { graphql } = require("@octokit/graphql");

// List the branches of the GitHub mirror of the R SVN repository,
// together with the date of the last commit on each branch.
// The mirror stores SVN tags as branches, prefixed with 'tags/'.

const query = `
    query($owner: String!, $name: String!, $prefix: String!,
          $filter: String, $after: String) {
      repository(owner: $owner, name: $name) {
        refs(refPrefix: $prefix, query: $filter, first: 100, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }`;

async function r_source_refs(prefix, filter = null) {
    const graphql_auth = graphql.defaults({
        baseUrl: urls.github_api_url,
        headers: {
            authorization: "token " + process.env.GITHUB_TOKEN
        },
    });

    const [ owner, name ] = urls.r_source_repo.split('/');
    const refs = [];
    let after = null;
    do {
        const value = await graphql_auth(query, {
            owner: owner,
            name: name,
            prefix: prefix,
            filter: filter,
            after: after
        });
        const res = value.repository.refs;
        for (const node of res.nodes) {
            refs.push({ name: node.name, date: node.target.committedDate });
        }
        after = res.pageInfo.hasNextPage ? res.pageInfo.endCursor : null;
    } while (after !== null);

    return refs;
}

module.exports = r_source_refs;
