

# rversions

[![Test status](https://github.com/r-hub/node-rversions/actions/workflows/main.yml/badge.svg)](https://github.com/r-hub/node-rversions/actions)

> Past and present R versions

- [Install](#install)
- [CLI](#cli)
  - [rver available](#rver-available)
  - [rver resolve](#rver-resolve)
  - [rver rtools-versions](#rver-rtools-versions)
  - [rver linux-distros](#rver-linux-distros)
- [Usage](#usage)
  - [Resolution](#resolution)
  - [Available builds for a platform](#available-builds-for-a-platform)
  - [List all R releases](#list-all-r-releases)
  - [List all Rtools versions](#list-all-rtools-versions)
  - [List supported Linux distros](#list-supported-linux-distros)
- [Caching](#caching)
- [License](#license)

## Install

    $ npm install rversions

## CLI

Install globally to get the `rver` command:

    $ npm install -g rversions

### rver available

List available R versions. Prints one version string per line by
default; use `--json` for full objects.

``` sh
$ rver available | tail -3
4.5.3   https://cran.rstudio.com/src/base/R-4/R-4.5.3.tar.gz
4.6.0   https://cran.rstudio.com/src/base/R-4/R-4.6.0.tar.gz
4.7.0   https://cran.rstudio.com/src/base-prerelease/R-devel.tar.gz

$ rver available --os win --arch x86_64 | tail -3
4.5.3   https://cran.rstudio.com/bin/windows/base/old/4.5.3/R-4.5.3-win.exe
4.6.0   https://cran.rstudio.com/bin/windows/base/R-4.6.0-win.exe
4.7.0   https://cran.rstudio.com/bin/windows/base/R-devel-win.exe

$ rver available --os linux-ubuntu-22.04 --json
[...]
```

### rver resolve

Resolve a version specifier to a specific version and download URL.
Prints `version<TAB>url` by default; use `--json` for the full object.

``` sh
$ rver resolve release
4.6.0   https://cran.rstudio.com/src/base/R-4/R-4.6.0.tar.gz

$ rver resolve release --os win --arch x86_64
4.6.0   https://cran.rstudio.com/bin/windows/base/R-4.6.0-win.exe

$ rver resolve 4.4 --os mac --arch arm64 --json
{
  "version": "4.4.3",
  ...
}
```

Supported version specifiers: `release`, `devel`, `next`, `oldrel`,
`oldrel/2`, a minor version like `4.4`, or a full version like `4.4.3`.

### rver rtools-versions

List Rtools versions with the range of R versions they support and their
download URL. Use `--arch aarch64` for the Windows ARM64 builds.

``` sh
$ rver rtools-versions | tail -3
43      4.3.0..4.3.100  https://github.com/r-hub/rtools43/releases/download/latest/rtools43.exe
44      4.4.0..4.4.100  https://github.com/r-hub/rtools44/releases/download/latest/rtools44.exe
45      4.5.0..100.0.0  https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe
```

### rver linux-distros

List supported Linux distributions. Prints one distro ID per line; use
the ID with the `linux-` prefix as the `--os` value for the other
commands.

``` sh
$ rver linux-distros | head -5
ubuntu-1604
ubuntu-1804
ubuntu-2004
ubuntu-2204
ubuntu-2404

$ rver linux-distros --json
[...]
```

## Usage

### Resolution

#### R-devel

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel"));
```

    ## {
    ##   version: '4.7.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://cran.rstudio.com/src/base-prerelease/R-devel.tar.gz',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "win"));
```

    ## {
    ##   version: '4.7.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/R-devel-win.exe',
    ##   date: null,
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "macos"));
```

    ## {
    ##   version: '4.7.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://mac.cran.dev/big-sur/last-success/R-devel-x86_64.pkg',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "linux-ubuntu-26.04"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.7.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-devel_1_amd64.deb',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "linux-ubuntu-26.04", "arm64"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.7.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-devel_1_arm64.deb',
    ##   date: null
    ## }

#### R-next

This can be an alpha, beta, RC or pre-release if a release process is
currently happenning. Otherwise it is the current patched version.

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next"));
```

    ## {
    ##   version: '4.6.1',
    ##   nickname: 'Happy Hop',
    ##   type: 'beta',
    ##   url: 'https://cran.rstudio.com/src/base-prerelease/R-latest.tar.gz',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "win"));
```

    ## {
    ##   version: '4.6.1',
    ##   nickname: 'Happy Hop',
    ##   type: 'next',
    ##   nexttype: 'beta',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/R-4.6.1beta-win.exe',
    ##   date: null,
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "macos"));
```

    ## {
    ##   version: '4.6.1',
    ##   nickname: 'Happy Hop',
    ##   type: 'next',
    ##   nexttype: 'beta',
    ##   url: 'https://mac.cran.dev/big-sur/last-success/R-4.6-branch-x86_64.pkg',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "linux-ubuntu-26.04"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.6.1',
    ##   nickname: 'Happy Hop',
    ##   type: 'next',
    ##   nexttype: 'beta',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-next_1_amd64.deb',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "linux-ubuntu-26.04", "arm64"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.6.1',
    ##   nickname: 'Happy Hop',
    ##   type: 'next',
    ##   nexttype: 'beta',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-next_1_arm64.deb',
    ##   date: null
    ## }

#### R-release

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release"));
```

    ## {
    ##   version: '4.6.0',
    ##   nickname: 'Because it was There',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.6.0.tar.gz',
    ##   date: '2026-04-24T07:17:39.158455Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "win"));
```

    ## {
    ##   version: '4.6.0',
    ##   nickname: 'Because it was There',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/R-4.6.0-win.exe',
    ##   date: '2026-04-24T07:17:39.158455Z',
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "macos"));
```

    ## {
    ##   version: '4.6.0',
    ##   nickname: 'Because it was There',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.6.0-x86_64.pkg',
    ##   date: '2026-04-24T07:17:39.158455Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "linux-ubuntu-26.04"));
```

    ## Fetching linux_builds_amd64 from https://cdn.posit.co/r/versions.json
    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.6.0',
    ##   nickname: 'Because it was There',
    ##   type: 'release',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.6.0_1_amd64.deb',
    ##   date: '2026-04-24T07:17:39.158455Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "linux-ubuntu-26.04", "arm64"));
```

    ## Fetching linux_builds_amd64 from https://cdn.posit.co/r/versions.json
    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.6.0',
    ##   nickname: 'Because it was There',
    ##   type: 'release',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.6.0_1_arm64.deb',
    ##   date: '2026-04-24T07:17:39.158455Z'
    ## }

#### R-oldrel

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1"));
```

    ## {
    ##   version: '4.5.3',
    ##   nickname: 'Reassured Reassurer',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.5.3.tar.gz',
    ##   date: '2026-03-11T08:14:07.678022Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "win"));
```

    ## {
    ##   version: '4.5.3',
    ##   nickname: 'Reassured Reassurer',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/old/4.5.3/R-4.5.3-win.exe',
    ##   date: '2026-03-11T08:14:07.678022Z',
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "macos"));
```

    ## {
    ##   version: '4.5.3',
    ##   nickname: 'Reassured Reassurer',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.5.3-x86_64.pkg',
    ##   date: '2026-03-11T08:14:07.678022Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "linux-ubuntu-26.04"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.5.3',
    ##   nickname: 'Reassured Reassurer',
    ##   type: 'oldrel/1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.3_1_amd64.deb',
    ##   date: '2026-03-11T08:14:07.678022Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "linux-ubuntu-26.04", "arm64"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.5.3',
    ##   nickname: 'Reassured Reassurer',
    ##   type: 'oldrel/1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.3_1_arm64.deb',
    ##   date: '2026-03-11T08:14:07.678022Z'
    ## }

#### Specific R version

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2"));
```

    ## {
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.2.2.tar.gz'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2", "win"));
```

    ## {
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/old/4.2.2/R-4.2.2-win.exe',
    ##   rtools: '42',
    ##   rtools_url: 'https://github.com/r-hub/rtools42/releases/download/latest/rtools42.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2", "macos"));
```

    ## {
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cran.rstudio.com/bin/macosx/base/R-4.2.2.pkg'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2", "linux-ubuntu-26.04"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.2_1_amd64.deb'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2", "linux-ubuntu-26.04", "arm64"));
```

    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.2_1_arm64.deb'
    ## }

#### Minor R version

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1"));
```

    ## {
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.1.3.tar.gz',
    ##   date: '2022-03-10T08:05:38.083503Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1", "win"));
```

    ## {
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/old/4.1.3/R-4.1.3-win.exe',
    ##   date: '2022-03-10T08:05:38.083503Z',
    ##   rtools: '40',
    ##   rtools_url: 'https://cran.rstudio.com/bin/windows/Rtools/rtools40-x86_64.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1", "macos"));
```

    ## {
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://cran.rstudio.com/bin/macosx/base/R-4.1.3.pkg',
    ##   date: '2022-03-10T08:05:38.083503Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1", "linux-ubuntu-26.04"));
```

    ## Fetching linux_builds_amd64 from https://cdn.posit.co/r/versions.json
    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.3_1_amd64.deb',
    ##   date: '2022-03-10T08:05:38.083503Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1", "linux-ubuntu-26.04", "arm64"));
```

    ## Fetching linux_builds_amd64 from https://cdn.posit.co/r/versions.json
    ## {
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'resolute',
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.3_1_arm64.deb',
    ##   date: '2022-03-10T08:05:38.083503Z'
    ## }

### Available builds for a platform

``` javascript
const builds = require('rversions');
console.log(await builds.available("linux-ubuntu-26.04"));
```

    ## Fetching linux_builds_amd64 from https://cdn.posit.co/r/versions.json
    ## [
    ##   {
    ##     version: '4.0.3',
    ##     date: '2020-10-10T07:05:24.661746Z',
    ##     name: '4.0.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.0.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.0.4',
    ##     date: '2021-02-15T08:05:13.579673Z',
    ##     name: '4.0.4',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.0.4_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.0.5',
    ##     date: '2021-03-31T07:05:15.035437Z',
    ##     name: '4.0.5',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.0.5_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.1.0',
    ##     date: '2021-05-18T07:05:22.435363Z',
    ##     name: '4.1.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.1.1',
    ##     date: '2021-08-10T07:05:06.632742Z',
    ##     name: '4.1.1',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.1_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.1.2',
    ##     date: '2021-11-01T08:05:12.078145Z',
    ##     name: '4.1.2',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.2_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.1.3',
    ##     date: '2022-03-10T08:05:38.083503Z',
    ##     name: '4.1.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.1.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.2.0',
    ##     date: '2022-04-22T07:05:41.508134Z',
    ##     name: '4.2.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.2.1',
    ##     date: '2022-06-23T07:05:33.441356Z',
    ##     name: '4.2.1',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.1_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.2.2',
    ##     date: '2022-10-31T08:05:54.268400Z',
    ##     name: '4.2.2',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.2_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.2.3',
    ##     date: '2023-03-15T08:06:01.008593Z',
    ##     name: '4.2.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.2.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.3.0',
    ##     date: '2023-04-21T07:06:14.217164Z',
    ##     name: '4.3.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.3.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.3.1',
    ##     date: '2023-06-16T07:06:07.136907Z',
    ##     name: '4.3.1',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.3.1_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.3.2',
    ##     date: '2023-10-31T08:07:42.870278Z',
    ##     name: '4.3.2',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.3.2_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.3.3',
    ##     date: '2024-02-29T08:07:53.267099Z',
    ##     name: '4.3.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.3.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.4.0',
    ##     date: '2024-04-24T04:07:56.437077Z',
    ##     name: '4.4.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.4.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.4.1',
    ##     date: '2024-06-14T07:08:17.306650Z',
    ##     name: '4.4.1',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.4.1_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.4.2',
    ##     date: '2024-10-31T08:09:02.717743Z',
    ##     name: '4.4.2',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.4.2_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.4.3',
    ##     date: '2025-02-28T08:08:59.188927Z',
    ##     name: '4.4.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.4.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.5.0',
    ##     date: '2025-04-11T08:51:39.256539Z',
    ##     name: '4.5.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.5.1',
    ##     date: '2025-06-13T07:12:01.900745Z',
    ##     name: '4.5.1',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.1_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.5.2',
    ##     date: '2025-10-31T08:13:34.137531Z',
    ##     name: '4.5.2',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.2_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.5.3',
    ##     date: '2026-03-11T08:14:07.678022Z',
    ##     name: '4.5.3',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.5.3_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.6.0',
    ##     date: '2026-04-24T07:17:39.158455Z',
    ##     name: '4.6.0',
    ##     type: 'release',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-4.6.0_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.6.1',
    ##     date: null,
    ##     name: 'next',
    ##     type: 'beta',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-next_1_amd64.deb'
    ##   },
    ##   {
    ##     version: '4.7.0',
    ##     date: null,
    ##     name: 'devel',
    ##     type: 'devel',
    ##     url: 'https://cdn.posit.co/r/ubuntu-2604/pkgs/r-devel_1_amd64.deb'
    ##   }
    ## ]

### List all R releases

``` javascript
const rversions = require('rversions');
console.log(await rversions.r_versions());
```

    ## [
    ##   {
    ##     version: '0.0',
    ##     date: '1995-06-20T00:00:00.000000Z',
    ##     semver: '0.0.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.1',
    ##     date: '1996-02-12T03:22:00.000000Z',
    ##     semver: '0.1.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.2',
    ##     date: '1996-03-14T21:59:00.000000Z',
    ##     semver: '0.2.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.3',
    ##     date: '1996-03-22T06:46:00.000000Z',
    ##     semver: '0.3.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.4',
    ##     date: '1996-04-01T23:18:00.000000Z',
    ##     semver: '0.4.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.5',
    ##     date: '1996-05-13T04:06:00.000000Z',
    ##     semver: '0.5.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.6',
    ##     date: '1996-05-17T04:53:00.000000Z',
    ##     semver: '0.6.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.7',
    ##     date: '1996-05-28T03:31:00.000000Z',
    ##     semver: '0.7.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.8',
    ##     date: '1996-05-31T04:51:00.000000Z',
    ##     semver: '0.8.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.9',
    ##     date: '1996-06-07T04:40:00.000000Z',
    ##     semver: '0.9.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.10',
    ##     date: '1996-08-27T05:03:00.000000Z',
    ##     semver: '0.10.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.11',
    ##     date: '1996-09-09T05:14:00.000000Z',
    ##     semver: '0.11.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.12',
    ##     date: '1996-09-20T04:03:00.000000Z',
    ##     semver: '0.12.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.13',
    ##     date: '1996-11-07T04:10:00.000000Z',
    ##     semver: '0.13.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.14',
    ##     date: '1996-11-28T23:42:00.000000Z',
    ##     semver: '0.14.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.15',
    ##     date: '1996-12-19T00:52:00.000000Z',
    ##     semver: '0.15.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.16',
    ##     date: '1997-02-07T02:14:00.000000Z',
    ##     semver: '0.16.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.16.1',
    ##     date: '1997-02-09T22:36:00.000000Z',
    ##     semver: '0.16.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.49',
    ##     date: '1997-04-23T14:53:00.000000Z',
    ##     semver: '0.49.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.50-a1',
    ##     semver: '0.50.1',
    ##     date: '1997-07-22T16:44:00.000000Z',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.50-a4',
    ##     semver: '0.50.4',
    ##     date: '1997-09-10T14:31:00.000000Z',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.60',
    ##     date: '1997-12-04T08:47:58.000000Z',
    ##     semver: '0.60.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.61',
    ##     date: '1997-12-21T13:09:22.000000Z',
    ##     semver: '0.61.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.61.1',
    ##     date: '1998-01-10T00:31:55.000000Z',
    ##     semver: '0.61.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.61.2',
    ##     date: '1998-03-14T19:25:55.000000Z',
    ##     semver: '0.61.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.61.3',
    ##     date: '1998-05-02T07:58:17.000000Z',
    ##     semver: '0.61.3',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.62',
    ##     date: '1998-06-14T12:56:20.000000Z',
    ##     semver: '0.62.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.62.1',
    ##     date: '1998-06-14T22:13:25.000000Z',
    ##     semver: '0.62.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.62.2',
    ##     date: '1998-07-10T11:13:45.000000Z',
    ##     semver: '0.62.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.62.3',
    ##     date: '1998-08-28T09:02:19.000000Z',
    ##     semver: '0.62.3',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.62.4',
    ##     date: '1998-10-23T12:08:41.000000Z',
    ##     semver: '0.62.4',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.63',
    ##     date: '1998-11-13T14:37:19.000000Z',
    ##     semver: '0.63.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.63.1',
    ##     date: '1998-12-04T13:06:28.000000Z',
    ##     semver: '0.63.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.63.2',
    ##     date: '1999-01-11T12:55:50.000000Z',
    ##     semver: '0.63.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.63.3',
    ##     date: '1999-03-05T14:27:14.000000Z',
    ##     semver: '0.63.3',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.64',
    ##     date: '1999-04-07T13:19:41.000000Z',
    ##     semver: '0.64.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.64.1',
    ##     date: '1999-05-07T13:25:43.000000Z',
    ##     semver: '0.64.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.64.2',
    ##     date: '1999-07-02T12:23:15.000000Z',
    ##     semver: '0.64.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.65',
    ##     date: '1999-08-27T10:29:29.000000Z',
    ##     semver: '0.65.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.65.1',
    ##     date: '1999-10-06T12:13:04.000000Z',
    ##     semver: '0.65.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.90',
    ##     date: '1999-11-22T12:25:14.000000Z',
    ##     semver: '0.90.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.90.1',
    ##     date: '1999-12-15T12:29:07.000000Z',
    ##     semver: '0.90.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '0.99',
    ##     date: '2000-02-07T11:24:50.000000Z',
    ##     semver: '0.99.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.0',
    ##     date: '2000-02-29T08:55:23.000000Z',
    ##     semver: '1.0.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.0.1',
    ##     date: '2000-04-14T08:44:18.000000Z',
    ##     semver: '1.0.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.1',
    ##     date: '2000-06-15T08:43:21.000000Z',
    ##     semver: '1.1.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.1.1',
    ##     date: '2000-08-15T08:54:18.000000Z',
    ##     semver: '1.1.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.2',
    ##     date: '2000-12-15T10:19:25.000000Z',
    ##     semver: '1.2.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.2.1',
    ##     date: '2001-01-15T10:18:01.000000Z',
    ##     semver: '1.2.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.2.2',
    ##     date: '2001-02-26T12:43:25.000000Z',
    ##     semver: '1.2.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.2.3',
    ##     date: '2001-04-26T11:29:47.000000Z',
    ##     semver: '1.2.3',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.3',
    ##     date: '2001-06-22T10:41:02.000000Z',
    ##     semver: '1.3.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.3.1',
    ##     date: '2001-08-31T12:45:52.000000Z',
    ##     semver: '1.3.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.4',
    ##     date: '2001-12-19T10:14:54.000000Z',
    ##     semver: '1.4.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.4.1',
    ##     date: '2002-01-30T11:57:35.000000Z',
    ##     semver: '1.4.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.5.0',
    ##     date: '2002-04-29T10:01:26.000000Z',
    ##     semver: '1.5.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.5.1',
    ##     date: '2002-06-17T11:20:33.000000Z',
    ##     semver: '1.5.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.6.0',
    ##     date: '2002-10-01T10:06:31.000000Z',
    ##     semver: '1.6.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.6.1',
    ##     date: '2002-11-01T10:33:17.000000Z',
    ##     semver: '1.6.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.6.2',
    ##     date: '2003-01-10T15:34:34.000000Z',
    ##     semver: '1.6.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.7.0',
    ##     date: '2003-04-16T12:58:07.000000Z',
    ##     semver: '1.7.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.7.1',
    ##     date: '2003-06-16T09:54:39.000000Z',
    ##     semver: '1.7.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.8.0',
    ##     date: '2003-10-08T11:13:59.000000Z',
    ##     semver: '1.8.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.8.1',
    ##     date: '2003-11-21T12:00:21.000000Z',
    ##     semver: '1.8.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.9.0',
    ##     date: '2004-04-12T10:36:38.000000Z',
    ##     semver: '1.9.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '1.9.1',
    ##     date: '2004-06-21T11:09:39.000000Z',
    ##     semver: '1.9.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.0.0',
    ##     date: '2004-10-04T14:24:38.899055Z',
    ##     semver: '2.0.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.0.1',
    ##     date: '2004-11-15T14:16:30.003793Z',
    ##     semver: '2.0.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.1.0',
    ##     date: '2005-04-18T22:26:33.135566Z',
    ##     semver: '2.1.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.1.1',
    ##     date: '2005-06-20T09:27:13.106513Z',
    ##     semver: '2.1.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.2.0',
    ##     date: '2005-10-06T10:22:14.085752Z',
    ##     semver: '2.2.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.2.1',
    ##     date: '2005-12-20T10:35:21.589612Z',
    ##     semver: '2.2.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.3.0',
    ##     date: '2006-04-24T10:37:20.758200Z',
    ##     semver: '2.3.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.3.1',
    ##     date: '2006-06-01T08:25:33.882724Z',
    ##     semver: '2.3.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.4.0',
    ##     date: '2006-10-03T10:15:04.354469Z',
    ##     semver: '2.4.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.4.1',
    ##     date: '2006-12-18T09:49:23.725060Z',
    ##     semver: '2.4.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.5.0',
    ##     date: '2007-04-24T09:41:43.361786Z',
    ##     semver: '2.5.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.5.1',
    ##     date: '2007-06-28T11:17:06.374019Z',
    ##     semver: '2.5.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.6.0',
    ##     date: '2007-10-03T09:02:53.434461Z',
    ##     semver: '2.6.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.6.1',
    ##     date: '2007-11-26T14:14:04.408327Z',
    ##     semver: '2.6.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.6.2',
    ##     date: '2008-02-08T11:10:05.737877Z',
    ##     semver: '2.6.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.7.0',
    ##     date: '2008-04-22T07:45:29.665494Z',
    ##     semver: '2.7.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.7.1',
    ##     date: '2008-06-23T07:44:32.518990Z',
    ##     semver: '2.7.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.7.2',
    ##     date: '2008-08-25T08:53:56.807981Z',
    ##     semver: '2.7.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.8.0',
    ##     date: '2008-10-20T09:24:01.015723Z',
    ##     semver: '2.8.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.8.1',
    ##     date: '2008-12-22T09:03:17.828643Z',
    ##     semver: '2.8.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.9.0',
    ##     date: '2009-04-17T08:32:48.144754Z',
    ##     semver: '2.9.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.9.1',
    ##     date: '2009-06-26T12:10:57.017685Z',
    ##     semver: '2.9.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.9.2',
    ##     date: '2009-08-24T08:22:34.737538Z',
    ##     semver: '2.9.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.10.0',
    ##     date: '2009-10-26T09:02:22.255015Z',
    ##     semver: '2.10.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.10.1',
    ##     date: '2009-12-14T10:28:24.741988Z',
    ##     semver: '2.10.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.11.0',
    ##     date: '2010-04-22T08:11:21.939620Z',
    ##     semver: '2.11.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.11.1',
    ##     date: '2010-05-31T08:10:25.280185Z',
    ##     semver: '2.11.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.12.0',
    ##     date: '2010-10-15T08:41:57.974589Z',
    ##     semver: '2.12.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.12.1',
    ##     date: '2010-12-16T09:12:04.607865Z',
    ##     semver: '2.12.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.12.2',
    ##     date: '2011-02-25T11:07:19.316500Z',
    ##     semver: '2.12.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.13.0',
    ##     date: '2011-04-13T08:31:27.165034Z',
    ##     semver: '2.13.0',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.13.1',
    ##     date: '2011-07-08T09:37:08.653178Z',
    ##     semver: '2.13.1',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.13.2',
    ##     date: '2011-09-30T07:05:56.091789Z',
    ##     semver: '2.13.2',
    ##     nickname: null
    ##   },
    ##   {
    ##     version: '2.14.0',
    ##     date: '2011-10-31T08:09:09.353781Z',
    ##     semver: '2.14.0',
    ##     nickname: 'Great Pumpkin'
    ##   },
    ##   ... 64 more items
    ## ]

### List all Rtools versions

``` javascript
const rversions = require('rversions');
console.log(await rversions.rtools_versions());
```

    ## [
    ##   {
    ##     version: '26',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools26.exe',
    ##     first: '2.0.0',
    ##     last: '2.6.2'
    ##   },
    ##   {
    ##     version: '27',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools27.exe',
    ##     first: '2.6.0',
    ##     last: '2.7.2'
    ##   },
    ##   {
    ##     version: '28',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools28.exe',
    ##     first: '2.7.0',
    ##     last: '2.8.1'
    ##   },
    ##   {
    ##     version: '29',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools29.exe',
    ##     first: '2.8.0',
    ##     last: '2.9.2'
    ##   },
    ##   {
    ##     version: '210',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools210.exe',
    ##     first: '2.9.0',
    ##     last: '2.10.1'
    ##   },
    ##   {
    ##     version: '211',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools211.exe',
    ##     first: '2.10.0',
    ##     last: '2.11.1'
    ##   },
    ##   {
    ##     version: '212',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools212.exe',
    ##     first: '2.12.0',
    ##     last: '2.12.2'
    ##   },
    ##   {
    ##     version: '213',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools213.exe',
    ##     first: '2.13.0',
    ##     last: '2.13.2'
    ##   },
    ##   {
    ##     version: '214',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools214.exe',
    ##     first: '2.13.0',
    ##     last: '2.14.2'
    ##   },
    ##   {
    ##     version: '215',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools215.exe',
    ##     first: '2.14.2',
    ##     last: '2.15.1'
    ##   },
    ##   {
    ##     version: '30',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools30.exe',
    ##     first: '2.15.2',
    ##     last: '3.0.3'
    ##   },
    ##   {
    ##     version: '31',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools31.exe',
    ##     first: '3.0.0',
    ##     last: '3.1.3'
    ##   },
    ##   {
    ##     version: '32',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools32.exe',
    ##     first: '3.1.0',
    ##     last: '3.2.5'
    ##   },
    ##   {
    ##     version: '33',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools33.exe',
    ##     first: '3.2.0',
    ##     last: '3.3.3'
    ##   },
    ##   {
    ##     version: '34',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools34.exe',
    ##     first: '3.3.0',
    ##     last: '3.6.3'
    ##   },
    ##   {
    ##     version: '35',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/Rtools35.exe',
    ##     first: '3.3.0',
    ##     last: '3.6.3'
    ##   },
    ##   {
    ##     version: '40',
    ##     url: 'https://cran.rstudio.com/bin/windows/Rtools/rtools40-x86_64.exe',
    ##     first: '4.0.0',
    ##     last: '4.2.100'
    ##   },
    ##   {
    ##     version: '42',
    ##     url: 'https://github.com/r-hub/rtools42/releases/download/latest/rtools42.exe',
    ##     first: '4.2.0',
    ##     last: '4.2.100'
    ##   },
    ##   {
    ##     version: '43',
    ##     url: 'https://github.com/r-hub/rtools43/releases/download/latest/rtools43.exe',
    ##     first: '4.3.0',
    ##     last: '4.3.100'
    ##   },
    ##   {
    ##     version: '44',
    ##     url: 'https://github.com/r-hub/rtools44/releases/download/latest/rtools44.exe',
    ##     first: '4.4.0',
    ##     last: '4.4.100'
    ##   },
    ##   {
    ##     version: '45',
    ##     url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe',
    ##     first: '4.5.0',
    ##     last: '100.0.0'
    ##   }
    ## ]

``` javascript
const rversions = require('rversions');
console.log(await rversions.rtools_versions("aarch64"));
```

    ## [
    ##   {
    ##     version: '44',
    ##     url: 'https://github.com/r-hub/rtools44/releases/download/latest/rtools44-aarch64.exe',
    ##     first: '4.4.0',
    ##     last: '4.4.100'
    ##   },
    ##   {
    ##     version: '45',
    ##     url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45-aarch64.exe',
    ##     first: '4.5.0',
    ##     last: '100.0.0'
    ##   }
    ## ]

### List supported Linux distros

``` javascript
const rversions = require('rversions');
console.log(await rversions.linux_distros());
```

    ## [
    ##   {
    ##     id: 'ubuntu-1604',
    ##     aliases: [ 'ubuntu-16.04', 'xenial' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '16.04',
    ##     codename: 'Xenial Xerus',
    ##     docker: 'ubuntu:16.04',
    ##     eol: '2021-04-30',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'xenial',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.1.2',
    ##     aarch64: false,
    ##     'aarch64-first-build': null,
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'ubuntu-1804',
    ##     aliases: [ 'ubuntu-18.04', 'bionic' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '18.04',
    ##     codename: 'Bionic Beaver',
    ##     docker: 'ubuntu:18.04',
    ##     eol: '2023-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'bionic',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.3.1',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.3',
    ##     'aarch64-last-build': '4.3.1'
    ##   },
    ##   {
    ##     id: 'ubuntu-2004',
    ##     aliases: [ 'ubuntu-20.04', 'focal' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '20.04',
    ##     codename: 'Focal Fossa',
    ##     docker: 'ubuntu:20.04',
    ##     eol: '2025-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'focal',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'ubuntu-2204',
    ##     aliases: [ 'ubuntu-22.04', 'jammy' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '22.04',
    ##     codename: 'Jammy Jellyfish',
    ##     docker: 'ubuntu:22.04',
    ##     eol: '2027-04-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'jammy',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'ubuntu-2404',
    ##     aliases: [ 'ubuntu-24.04', 'noble' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '24.04',
    ##     codename: 'Noble Numbat',
    ##     docker: 'ubuntu:24.04',
    ##     eol: '2034-04-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'noble',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null,
    ##     'aarch64-ppm-binaries': true
    ##   },
    ##   {
    ##     id: 'ubuntu-2604',
    ##     aliases: [ 'ubuntu-26.04', 'resolute' ],
    ##     name: 'Ubuntu',
    ##     url: 'https://ubuntu.com/',
    ##     version: '26.04',
    ##     codename: 'Resolute Raccoon',
    ##     docker: 'ubuntu:26.04',
    ##     eol: null,
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'resolute',
    ##     retired: false,
    ##     'first-build': '4.0.3',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '4.0.3',
    ##     'aarch64-last-build': null,
    ##     'aarch64-ppm-binaries': true
    ##   },
    ##   {
    ##     id: 'debian-9',
    ##     aliases: [ 'stretch' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '9',
    ##     codename: 'stretch',
    ##     docker: 'debian:9',
    ##     eol: '2022-06-30',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.2.1',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.3',
    ##     'aarch64-last-build': '4.2.1'
    ##   },
    ##   {
    ##     id: 'debian-10',
    ##     aliases: [ 'buster' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '10',
    ##     codename: 'buster',
    ##     docker: 'debian:10',
    ##     eol: '2024-06-30',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.4.3',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.0',
    ##     'aarch64-last-build': '4.4.3'
    ##   },
    ##   {
    ##     id: 'debian-11',
    ##     aliases: [ 'bullseye' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '11',
    ##     codename: 'bullseye',
    ##     docker: 'debian:11',
    ##     eol: '2024-08-14',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'bullseye',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.5.0',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.0',
    ##     'aarch64-last-build': '4.5.0'
    ##   },
    ##   {
    ##     id: 'debian-12',
    ##     aliases: [ 'bookworm' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '12',
    ##     codename: 'bookworm',
    ##     docker: 'debian:12',
    ##     eol: '2026-06-10',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'bookworm',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'debian-13',
    ##     aliases: [ 'trixie' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '13',
    ##     codename: 'trixie',
    ##     docker: 'debian:13',
    ##     eol: '2028-08-09',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'trixie',
    ##     retired: false,
    ##     'first-build': '4.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '4.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-42',
    ##     aliases: [ 'opensuse-42', 'opensuse-42.3' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '42.3',
    ##     docker: 'opensuse/archive:42.3',
    ##     eol: '2019-07-01',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse42',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.2.1',
    ##     aarch64: false,
    ##     'aarch64-first-build': null,
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-15',
    ##     aliases: [
    ##       'opensuse-15',
    ##       'opensuse-leap-15',
    ##       'opensuse-15.0',
    ##       'opensuse-leap-15.0',
    ##       'opensuse-15.1',
    ##       'opensuse-leap-15.1'
    ##     ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.1',
    ##     docker: 'opensuse/leap:15.1',
    ##     eol: '2021-02-01',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse15',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.1.2',
    ##     aarch64: false,
    ##     'aarch64-first-build': null,
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-152',
    ##     aliases: [ 'opensuse-15.2', 'opensuse-leap-15.2' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.2',
    ##     docker: 'opensuse/leap:15.2',
    ##     eol: '2022-01-04',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse152',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.1.3',
    ##     aarch64: false,
    ##     'aarch64-first-build': null,
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-153',
    ##     aliases: [ 'opensuse-15.3', 'opensuse-leap-15.3' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.3',
    ##     docker: 'opensuse/leap:15.3',
    ##     eol: '2022-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse153',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.3.1',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.3',
    ##     'aarch64-last-build': '4.3.1'
    ##   },
    ##   {
    ##     id: 'opensuse-154',
    ##     aliases: [ 'opensuse-15.4', 'opensuse-leap-15.4' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.4',
    ##     docker: 'opensuse/leap:15.4',
    ##     eol: '2023-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse154',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.4.0',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.3.0',
    ##     'aarch64-last-build': '4.4.0'
    ##   },
    ##   {
    ##     id: 'opensuse-155',
    ##     aliases: [ 'opensuse-15.5', 'opensuse-leap-15.5' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.5',
    ##     docker: 'opensuse/leap:15.5',
    ##     eol: '2024-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse155',
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.4.3',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': [
    ##       '3.1.3', '3.2.5',
    ##       '3.3.3', '3.4.3',
    ##       '3.5.3', '3.6.3',
    ##       '4.0.0'
    ##     ],
    ##     'aarch64-last-build': '4.4.3'
    ##   },
    ##   {
    ##     id: 'opensuse-156',
    ##     aliases: [ 'opensuse-15.6', 'opensuse-leap-15.6' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.6',
    ##     docker: 'opensuse/leap:15.6',
    ##     eol: '2025-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse156',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-160',
    ##     aliases: [ 'opensuse-16.0', 'opensuse-leap-16.0' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '16.0',
    ##     docker: 'opensuse/leap:16.0',
    ##     eol: '2027-10-31',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: false,
    ##     'first-build': '3.0.3',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.3',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'centos-6',
    ##     aliases: [ 'rhel-6' ],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '6',
    ##     docker: 'centos:6',
    ##     eol: '2020-11-30',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.0.4',
    ##     aarch64: false,
    ##     'aarch64-first-build': null,
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'centos-7',
    ##     aliases: [ 'rhel-7' ],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '7',
    ##     docker: 'centos:7',
    ##     eol: '2024-06-30',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'centos7',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'centos-8',
    ##     aliases: [],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '8',
    ##     docker: 'centos:8',
    ##     eol: '2024-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'centos8',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'rhel-9',
    ##     aliases: [ '/rhel-9[.][0-9]+/' ],
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '9',
    ##     docker: 'redhat/ubi9',
    ##     eol: '2032-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'rhel9',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null,
    ##     'aarch64-ppm-binaries': true
    ##   },
    ##   {
    ##     id: 'rhel-10',
    ##     aliases: [ '/rhel-10[.][0-9]+/' ],
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '10',
    ##     docker: 'redhat/ubi10',
    ##     eol: '2035-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'rhel10',
    ##     retired: false,
    ##     'first-build': '4.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '4.0.0',
    ##     'aarch64-last-build': null,
    ##     'aarch64-ppm-binaries': true
    ##   },
    ##   {
    ##     id: 'fedora-37',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '37',
    ##     docker: 'fedora:37',
    ##     eol: '2023-11-14',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.3.2',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': '4.3.2'
    ##   },
    ##   {
    ##     id: 'fedora-38',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '38',
    ##     docker: 'fedora:38',
    ##     eol: '2024-05-14',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.4.2',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': '4.4.2'
    ##   },
    ##   {
    ##     id: 'fedora-39',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '39',
    ##     docker: 'fedora:39',
    ##     eol: '2024-11-12',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.4.3',
    ##     aarch64: 'rhub',
    ##     'aarch64-first-build': [
    ##       '3.1.3', '3.2.5',
    ##       '3.3.3', '3.4.3',
    ##       '3.5.3', '3.6.3',
    ##       '4.0.0'
    ##     ],
    ##     'aarch64-last-build': '4.4.3'
    ##   },
    ##   {
    ##     id: 'fedora-40',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '40',
    ##     docker: 'fedora:40',
    ##     eol: '2025-05-13',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.0',
    ##     'last-build': '4.5.1',
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': '4.5.1'
    ##   },
    ##   {
    ##     id: 'fedora-41',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '41',
    ##     docker: 'fedora:41',
    ##     eol: '2025-11-26',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'first-build': '3.0.3',
    ##     'last-build': '4.5.3',
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.3',
    ##     'aarch64-last-build': '4.5.3'
    ##   },
    ##   {
    ##     id: 'fedora-42',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '42',
    ##     docker: 'fedora:42',
    ##     eol: '2026-05-13',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: false,
    ##     'first-build': '3.0.3',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.3',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'fedora-43',
    ##     aliases: [],
    ##     name: 'Fedora Linux',
    ##     url: 'https://fedoraproject.org/',
    ##     version: '43',
    ##     docker: 'fedora:43',
    ##     eol: '2026-12-09',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: false,
    ##     'first-build': '3.0.3',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.3',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'manylinux_2_34',
    ##     aliases: [ 'manylinux-2.34' ],
    ##     family: 'manylinux',
    ##     'pkg-path': '',
    ##     name: 'manylinux 2.34',
    ##     url: 'https://github.com/rstudio/r-builds/blob/main/builder/portable-r/README.md',
    ##     version: '2.34',
    ##     docker: 'rockylinux/rockylinux:9',
    ##     eol: '2032-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'manylinux_2_28',
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'musllinux_1_2',
    ##     aliases: [ 'musllinux-1.2' ],
    ##     family: 'musllinux',
    ##     'pkg-path': '',
    ##     name: 'musllinux 1.2',
    ##     url: 'https://github.com/rstudio/r-builds/blob/main/builder/portable-r/README.md',
    ##     version: '1.2',
    ##     docker: 'alpine:3.19',
    ##     eol: '2025-11-01',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: false,
    ##     'first-build': '3.0.0',
    ##     'last-build': null,
    ##     aarch64: true,
    ##     'aarch64-first-build': '3.0.0',
    ##     'aarch64-last-build': null
    ##   },
    ##   {
    ##     id: 'sles-15',
    ##     aliases: [ 'sles-15' ],
    ##     implementation: 'opensuse-15',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15',
    ##     docker: 'registry.suse.com/suse/sle15:15.0',
    ##     eol: '2019-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.1',
    ##     aliases: [ 'sles-151' ],
    ##     implementation: 'opensuse-15',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.1',
    ##     docker: 'registry.suse.com/suse/sle15:15.1',
    ##     eol: '2021-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.2',
    ##     aliases: [ 'sles-152' ],
    ##     implementation: 'opensuse-152',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.2',
    ##     docker: 'registry.suse.com/suse/sle15:15.2',
    ##     eol: '2021-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.3',
    ##     aliases: [ 'sles-153' ],
    ##     implementation: 'opensuse-153',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.3',
    ##     docker: 'registry.suse.com/bci/bci-base:15.3',
    ##     eol: '2022-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.4',
    ##     aliases: [ 'sles-154' ],
    ##     implementation: 'opensuse-154',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.4',
    ##     docker: 'registry.suse.com/bci/bci-base:15.4',
    ##     eol: '2023-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.5',
    ##     aliases: [ 'sles-155' ],
    ##     implementation: 'opensuse-155',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.5',
    ##     docker: 'registry.suse.com/bci/bci-base:15.5',
    ##     eol: '2024-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.6',
    ##     aliases: [ 'sles-156' ],
    ##     implementation: 'opensuse-156',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.6',
    ##     docker: 'registry.suse.com/bci/bci-base:15.6',
    ##     eol: '2025-12-31'
    ##   },
    ##   {
    ##     id: 'sles-15.7',
    ##     aliases: [ 'sles-157' ],
    ##     implementation: 'opensuse-156',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '15.7',
    ##     docker: 'registry.suse.com/bci/bci-base:15.7',
    ##     eol: '2031-07-31'
    ##   },
    ##   {
    ##     id: 'sles-16.0',
    ##     aliases: [ 'sles-160' ],
    ##     implementation: 'opensuse-160',
    ##     name: 'SUSE Linux Enterprise Server',
    ##     url: 'https://suse.com',
    ##     version: '16.0',
    ##     docker: 'registry.suse.com/bci/bci-base:16.0',
    ##     eol: '2027-11-30'
    ##   },
    ##   {
    ##     id: 'rhel-7',
    ##     aliases: [ '/rhel-7[.][0-9]+/' ],
    ##     implementation: 'centos-7',
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '7',
    ##     docker: 'registry.access.redhat.com/ubi7/ubi',
    ##     eol: '2024-06-30'
    ##   },
    ##   {
    ##     id: 'rhel-8',
    ##     aliases: [ '/rhel-8[.][0-9]+/' ],
    ##     implementation: 'centos-8',
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '8',
    ##     docker: 'redhat/ubi8',
    ##     eol: '2029-05-31'
    ##   },
    ##   {
    ##     id: 'almalinux-8',
    ##     aliases: [ '/almalinux-8[.][0-9]+/' ],
    ##     implementation: 'centos-8',
    ##     name: 'AlmaLinux',
    ##     url: 'https://almalinux.org/',
    ##     version: '8',
    ##     docker: 'almalinux:8',
    ##     eol: '2029-03-01'
    ##   },
    ##   {
    ##     id: 'almalinux-9',
    ##     aliases: [ '/almalinux-9[.][0-9]+/' ],
    ##     implementation: 'rhel-9',
    ##     name: 'AlmaLinux',
    ##     url: 'https://almalinux.org/',
    ##     version: '9',
    ##     docker: 'almalinux:9',
    ##     eol: '2032-05-31'
    ##   },
    ##   {
    ##     id: 'almalinux-10',
    ##     aliases: [ '/almalinux-10[.][0-9]+/' ],
    ##     implementation: 'rhel-10',
    ##     name: 'AlmaLinux',
    ##     url: 'https://almalinux.org/',
    ##     version: '10',
    ##     docker: 'almalinux:10',
    ##     eol: '2035-05-31'
    ##   },
    ##   {
    ##     id: 'rocky-8',
    ##     aliases: [ '/rocky-8[.][0-9]+/' ],
    ##     implementation: 'centos-8',
    ##     name: 'Rocky Linux',
    ##     url: 'https://rockylinux.org/',
    ##     version: '8',
    ##     docker: 'rockylinux/rockylinux:8',
    ##     eol: '2029-05-31'
    ##   },
    ##   {
    ##     id: 'rocky-9',
    ##     aliases: [ '/rocky-9[.][0-9]+/' ],
    ##     implementation: 'rhel-9',
    ##     name: 'Rocky Linux',
    ##     url: 'https://rockylinux.org/',
    ##     version: '9',
    ##     docker: 'rockylinux/rockylinux:9',
    ##     eol: '2032-05-31'
    ##   },
    ##   {
    ##     id: 'rocky-10',
    ##     aliases: [ '/rocky-10[.][0-9]+/' ],
    ##     implementation: 'rhel-10',
    ##     name: 'Rocky Linux',
    ##     url: 'https://rockylinux.org/',
    ##     version: '10',
    ##     docker: 'rockylinux/rockylinux:10',
    ##     eol: '2035-05-31'
    ##   },
    ##   {
    ##     id: 'pop-2204',
    ##     aliases: [ 'pop-22.04', 'pop-os-2204', 'pop-os-22.04' ],
    ##     implementation: 'ubuntu-2204',
    ##     name: 'Pop!_OS',
    ##     url: 'https://pop.system76.com/',
    ##     version: '22.04',
    ##     docker: null,
    ##     eol: '2027-04-25'
    ##   },
    ##   {
    ##     id: 'pop-2404',
    ##     aliases: [ 'pop-24.04', 'pop-os-2404', 'pop-os-24.04' ],
    ##     implementation: 'ubuntu-2404',
    ##     name: 'Pop!_OS',
    ##     url: 'https://pop.system76.com/',
    ##     version: '24.04',
    ##     docker: null,
    ##     eol: '2029-05-31'
    ##   }
    ## ]

## Caching

All queries are cached for five minutes by default. If you don’t want to
use the cached value, then set the (first) cache argument to `false`.

You can adjust the default caching time limit by setting the
`R_VERSIONS_CACHE_LIMIT` environment variable in milliseconds. E.g. the
default five minutes is 5 \* 60 \* 1000 = 300000.

## License

ISC @ R Consortium

This repo is part of the R-hub project, supported by the R Consortium.
