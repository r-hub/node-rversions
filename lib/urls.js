
const urls = { };

function env(key, def) {
    urls[key.toLowerCase()] = process.env['NODE_RVERSIONS_' + key] || def;
}

env('SVN',     'https://svn.r-project.org/R/tags/');
env('BRANCHES','https://svn.r-project.org/R/branches/');
env('NICK',    'https://svn.r-project.org/R/tags/R-%s/VERSION-NICK');
env('MACOS',   'https://cran.r-project.org/bin/macosx/base/R-%s.pkg');
env('TARBALL', 'https://cran.r-project.org/src/base/R-4/R-%s.tar.gz');
env('WIN',     'https://cran.r-project.org/bin/windows/base/R-%s-win.exe');
env('DEVEL',   'https://svn.r-project.org/R/trunk/VERSION');
env('DEVEL_NICK', 'https://svn.r-project.org/R/trunk/VERSION-NICK');
env('BRANCH',  'https://svn.r-project.org/R/branches/%s/VERSION');
env('BRANCH_NICK', 'https://svn.r-project.org/R/branches/%s/VERSION-NICK');
env('PATCHED_WIN', 'https://cran.r-project.org/bin/windows/base/R-%s-win.exe');
env('PATCHED_MACOS', 'https://mac.r-project.org/high-sierra/last-success/R-%s-branch-x86_64.pkg');

module.exports = urls;
