
# 2.3.10

* Support Ubuntu 24.04.

# 2.3.9

* Support Rtools44, R 4.4.0 and later now requires Rtools44.

# 2.3.8

* Update CRAN download URLs for older R versions.

# 2.3.7

* Work around invalid version numbers in the r-builds version list.

# 2.3.6

* Add support for retired distros for which we have binaries.

# 2.3.5

* Add support for Fedora 39.

# 2.3.4

* Add support for OpenSUSE Leap 15.5.

# 2.3.3

* Prefer using https://cran.rstudio.com URLs, instead of https://*.r-project.org.

# 2.3.2

* Fix dummy object for testing.

# 2.3.1

* Improve the format of the Linux distro list.

# 2.3.0

* `list_linux_distros()` function to return the list of supported Linux
  distros.

# 2.2.8

* Fix available aarch64 Linux versions.

# 2.2.7

* Add support for Debian 12.

# 2.2.6

* Fix macOS x86_64 download URL, moved to new directory.

# 2.2.5

* Fix macOS download URLs.

# 2.2.4

* Fix macOS download URLs. CRAN has moved some versions to another
  server.

# 2.2.3

* Fix Windows download URLs. CRAN has moved some versions to another
  server.

# 2.2.2

* Fix caching mistake for macOS/Windows. The macOS result was saved
  in the Windows cache.

# 2.2.1

* `resolve()` now returns a `nexttype` entry for `next` versions.

* `available()` now returns version numbers for `next` and `devel`
  versions on Linux. It also sets `type` to `patched`, `alpha`, `beta`
  or `RC` for `next` versions.

# 2.2.0

* New `available()` function to list available versions.

* Fix for new x86_65 macOS installer location.

# 2.1.2

* R-next now falls back to RC from patched if patched is not
  available yet, but RC is (#32).

# 2.1.1

* Fix dummy server, to be able to test `rtools_versions()`.

# 2.1.0

* Adjust default cache time limit via the `R_VERSIONS_CACHE_LIMIT`
  environment variable.

# 2.0.0

* New `resolve()` to resolve anything, including Linux builds from
  https://github.com/rstudio/r-builds and
  https://github.com/r-hub/R/releases (#18, #21, #22, #25).

# 1.6.0

* New `r_minor()` to resolve the latest version without a minor branch (#21).

* URL updates for changes in the macOS infrastructure for R 4.3.0.

# 1.5.3

* Fix `r_next_win()` for RC (#19).

# 1.5.2

* Another dummy fix.

# 1.5.1

* Fixed built-in testing dummy.

# 1.5.0

* `r_release_macos()` and `r_release_next()` now have a second argument: 'arch'.
  You can set this to `x86_64` (default) or `arm64`.

# 1.4.0

* New `r_next()` function to query the next release. This can be an
  alpha, beta, RC or pre-release version, or the current patched version
  if no release is in progress (#16).

  New `r_next_win()` and `r_next_macos()` functions to query the installers
  for `r_next()` if they are available. If they are not available, it falls
  back to R-patched installers (#17).

# 1.3.0

* Older oldrel versions: e.g. the release before `r_oldrel()` is
  `r_oldrel(2)`.

# 1.2.0

* Fix detection of the macOS installer version.

# 1.1.0

* New `r_devel()` function to get the (possible future) version number
  of the next R release.

* Fix caching of the list of all releases.

* Fix a caching issue, where the cache could be inadvertently modified
  if queries were running concurrently.

# 1.0.2

* Fix `r_oldrel()` calculation, that was broken on R 4.x.

* Fix `r_release_tarball()` URL for R 4.x.

# 1.0.1

* Now we have a dummy implementation, that does not use the internet,
  for testing. It can be turned on by setting the `NODE_RVERSIONS_DUMMY`
  environment variable to `true`, before `require()`-ing the module.

# 1.0.0

First released version.
