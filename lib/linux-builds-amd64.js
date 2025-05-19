
const semver = require('semver');
const semverSort = require('semver/functions/sort');
const mycache = require('./cache');
const urls = require('./urls');

const got = require('got');

async function linux_builds_amd64(cache = true) {
    let cached = undefined;
    if (cache) { cached = mycache.get('linux_builds_amd64'); }
    if (cached !== undefined) { return cached; }

    var resp = await got(urls.linux_builds_amd64).json();
    var value = resp.r_versions;

    // Has to be in increasing order for some resolutions to work
    // we remove non-semver versions and 'next' and 'devel', if present,
    // order according to semver and then add back 'next' & 'devel',
    // if needed.
    var hasnext = value.indexOf('next') != -1;
    var hasdevel = value.indexOf('devel') != -1;
    value = value.filter(function(x) {
	return !!semver.valid(x) && x != 'next' && x != 'devel'
    });
    value = semverSort(value);
    if (hasnext) { value.push('next'); }
    if (hasdevel) { value.push('devel'); }

    mycache.set('linux_builds_amd64', value);
    return value;
}

module.exports = linux_builds_amd64;
