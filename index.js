
if (!process.env.NODE_RVERSIONS_DUMMY) {

    const resolve           = require('./lib/resolve');
    const r_versions        = require('./lib/r-versions');
    const r_release         = require('./lib/r-release');
    const r_oldrel          = require('./lib/r-oldrel');
    const r_release_macos   = require('./lib/r-release-macos');
    const r_release_tarball = require('./lib/r-release-tarball');
    const r_release_win     = require('./lib/r-release-win');
    const r_devel           = require('./lib/r-devel');
    const r_devel_win       = require('./lib/r-devel-win');
    const r_devel_macos     = require('./lib/r-devel-macos');
    const r_next            = require('./lib/r-next');
    const r_next_win        = require('./lib/r-next-win');
    const r_next_macos      = require('./lib/r-next-macos');
    const r_minor           = require('./lib/r-minor');
    const rtools_versions   = require('./lib/rtools').rtools_versions;

    function get_rtools_versions() {
        return rtools_versions;
    }

    module.exports = {
        resolve:           resolve,
        r_versions:        r_versions,
        r_release:         r_release,
        r_oldrel:          r_oldrel,
        r_release_macos:   r_release_macos,
        r_release_tarball: r_release_tarball,
        r_release_win:     r_release_win,
        r_devel:           r_devel,
        r_devel_win:       r_devel_win,
        r_devel_macos:     r_devel_macos,
        r_next:            r_next,
        r_next_win:        r_next_win,
        r_next_macos:      r_next_macos,
        r_minor:           r_minor,
        rtools_versions:   get_rtools_versions
    };

} else {

    const dummy = require('./lib/dummy');

    module.exports = {
        resolve:           dummy.resolve,
        r_versions:        dummy.r_versions,
        r_release:         dummy.r_release,
        r_oldrel:          dummy.r_oldrel,
        r_release_macos:   dummy.r_release_macos,
        r_release_tarball: dummy.r_release_tarball,
        r_release_win:     dummy.r_release_win,
        r_devel:           dummy.r_devel,
        r_devel_win:       dummy.r_devel_win,
        r_next:            dummy.r_next,
        r_next_win:        dummy.r_next_win,
        r_next_macos:      dummy.r_next_macos,
        r_minor:           dummy.r_minor
    };
}
