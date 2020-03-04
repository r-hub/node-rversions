
const r_versions        = require('./lib/r-versions');
const r_release         = require('./lib/r-release');
const r_oldrel          = require('./lib/r-oldrel');
const r_release_macos   = require('./lib/r-release-macos');
const r_release_tarball = require('./lib/r-release-tarball');

module.exports = {
    r_versions:        r_versions,
    r_release:         r_release,
    r_oldrel:          r_oldrel,
    r_release_macos:   r_release_macos,
    r_release_tarball: r_release_tarball
};
