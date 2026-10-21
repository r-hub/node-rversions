
const mycache = require('./cache');
const historic_releases = require('./historic-releases');
const r_source_refs = require('./r-source-refs');

const semver = require('semver');

async function r_versions_bare(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_versions_bare'); }
    if (cached !== undefined) { return cached; }

    // SVN tags are branches in the GitHub mirror, the date of the
    // last commit is the date of the tag
    const tags = await r_source_refs('refs/heads/tags/');
    const versions = tags.map(function(t) {
        const tag = t.name.replace(/^R-/, '');
        if (/^R-/.test(t.name) && /^[0-9]+-[0-9]+(-[0-9]+|)$/.test(tag)) {
            const version = tag.replace(/-/g, ".");
            return {
                version: version,
                // same format as the SVN dates we used to have
                date: t.date.replace(/Z$/, ".000000Z")
            };
        } else {
            return null;
        }
    });

    const allversions = historic_releases.concat(versions);

    const releases = allversions
          .filter(function(x) { return x !== null; })
          .map(function(x) {
              if (!!x.semver) {
                // nothing to do
              } else if (semver.valid(x.version)) {
                  x.semver = x.version;
              } else {
                  x.semver = x.version + ".0";
              }
              return x;
          })
          .sort(function(a, b) {
              if (a.date < b.date) {
                  return -1;
              } else {
                  return 1;
              }
          })

    mycache.set('r_versions_bare', releases);
    return mycache.get('r_versions_bare');
}

module.exports = r_versions_bare;
