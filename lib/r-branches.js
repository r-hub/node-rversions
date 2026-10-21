
const mycache = require('./cache');
const r_source_refs = require('./r-source-refs');

const semver = require('semver');

async function r_branches(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('r_branches'); }
    if (cached !== undefined) { return cached; }

    const refs = await r_source_refs('refs/heads/', 'branch');

    const branches = refs.map(function(r) {
        const branch = r.name.replace(/^R-([-0-9]+-branch)$/, '$1');
        if (/^R-/.test(r.name) && /^[0-9]+-[0-9]+(-[0-9]+|)-branch$/.test(branch)) {
            return {
                branch: branch,
                // date of the last commit, not the creation of the branch
                date: r.date
            };
        } else {
            return null;
        }
    });

    // In git we do not know when a branch was created, and old branches
    // might have newer commits than new ones, so sort by version number
    const branches2 = branches
          .filter(function(x) { return x !== null; })
          .sort(function(a, b) {
              const va = semver.coerce(a.branch.replace(/-/g, '.'));
              const vb = semver.coerce(b.branch.replace(/-/g, '.'));
              return semver.compare(va, vb);
          })

    mycache.set('r_branches', branches2);
    return mycache.get('r_branches');
}

module.exports = r_branches;
