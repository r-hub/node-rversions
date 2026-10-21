
const urls = { };

function env(key, def) {
    urls[key.toLowerCase()] = process.env['NODE_RVERSIONS_' + key] || def;
}

env('NICK',    'https://raw.githubusercontent.com/wch/r-source/tags/R-%s/VERSION-NICK');
env('MACOS_X86_64', 'https://cran.rstudio.com/bin/macosx/base/R-%s.pkg');
env('MACOS2_X86_64', 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-%s-x86_64.pkg');
env('MACOS_ARM64', 'https://cran.rstudio.com/bin/macosx/big-sur-arm64/base/R-%s-arm64.pkg');
env('MACOS2_ARM64', 'https://cran.rstudio.com/bin/macosx/big-sur-arm64/base/R-%s-arm64.pkg');
env('MACOS3_ARM64', 'https://cran.rstudio.com/bin/macosx/sonoma-arm64/base/R-%s-arm64.pkg');
env('TARBALL', 'https://cran.rstudio.com/src/base/R-4/R-%s.tar.gz');
env('WIN',     'https://cran.rstudio.com/bin/windows/base/R-%s-win.exe');
env('WIN_ARM64', 'https://github.com/r-hub/R/releases/download/v%s/R-%s-aarch64.exe');
env('DEVEL',   'https://raw.githubusercontent.com/wch/r-source/trunk/VERSION');
env('DEVEL_WIN', 'https://cran.rstudio.com/bin/windows/base/rdevel.html');
env('DEVEL_WIN_FILE', 'https://cran.rstudio.com/bin/windows/base/R-devel-win.exe');
env('DEVEL_NICK', 'https://raw.githubusercontent.com/wch/r-source/trunk/VERSION-NICK');
env('BRANCH',  'https://raw.githubusercontent.com/wch/r-source/%s/VERSION');
env('BRANCH_NICK', 'https://raw.githubusercontent.com/wch/r-source/%s/VERSION-NICK');
env('PATCHED_WIN', 'https://cran.rstudio.com/bin/windows/base/R-%s-win.exe');
env('PATCHED_MACOS_X86_64', 'https://mac.cran.dev/big-sur/last-success/R-%s-branch-x86_64.pkg');
env('PATCHED_MACOS_ARM64', 'https://mac.cran.dev/sonoma/last-success/R-%s-branch-arm64.pkg');
env('LINUX_BUILDS_AMD64', 'https://cdn.posit.co/r/versions.json');
env('GITHUB_API_URL', 'https://api.github.com');
env('R_SOURCE_REPO', 'wch/r-source');

module.exports = urls;
