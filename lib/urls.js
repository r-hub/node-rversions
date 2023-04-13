
const urls = { };

function env(key, def) {
    urls[key.toLowerCase()] = process.env['NODE_RVERSIONS_' + key] || def;
}

env('SVN',     'https://svn.r-project.org/R/tags/');
env('BRANCHES','https://svn.r-project.org/R/branches/');
env('NICK',    'https://svn.r-project.org/R/tags/R-%s/VERSION-NICK');
env('MACOS_X86_64', 'https://cran.r-project.org/bin/macosx/base/R-%s.pkg');
env('MACOS_ARM64', 'https://cran.r-project.org/bin/macosx/big-sur-arm64/base/R-%s-arm64.pkg');
env('TARBALL', 'https://cran.r-project.org/src/base/R-4/R-%s.tar.gz');
env('WIN',     'https://cran.r-project.org/bin/windows/base/R-%s-win.exe');
env('DEVEL',   'https://svn.r-project.org/R/trunk/VERSION');
env('DEVEL_WIN', 'https://cran.r-project.org/bin/windows/base/rdevel.html');
env('DEVEL_NICK', 'https://svn.r-project.org/R/trunk/VERSION-NICK');
env('BRANCH',  'https://svn.r-project.org/R/branches/%s/VERSION');
env('BRANCH_NICK', 'https://svn.r-project.org/R/branches/%s/VERSION-NICK');
env('PATCHED_WIN', 'https://cran.r-project.org/bin/windows/base/R-%s-win.exe');
env('PATCHED_MACOS_X86_64', 'https://mac.r-project.org/big-sur/last-success/R-%s-branch-x86_64.pkg');
env('PATCHED_MACOS_ARM64', 'https://mac.r-project.org/big-sur/last-success/R-%s-branch-arm64.pkg');
env('LINUX_BUILDS_AMD64', 'https://cdn.posit.co/r/versions.json');

module.exports = urls;
