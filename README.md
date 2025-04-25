

# rversions

[![Test status](https://github.com/r-hub/node-rversions/actions/workflows/main.yml/badge.svg)](https://github.com/r-hub/node-rversions/actions)

> Past and present R versions

-   [Install](#install)
-   [Usage](#usage)
    -   [R-devel](#r-devel)
    -   [R-next](#r-next)
    -   [R-release](#r-release)
    -   [R-oldrel](#r-oldrel)
    -   [Specific R version](#specific-r-version)
    -   [Minor R version](#minor-r-version)
-   [All R releases](#all-r-releases)
-   [Rtools versions](#rtools-versions)
-   [Supported Linux distros for R
    builds](#supported-linux-distros-for-r-builds)
-   [Caching](#caching)
-   [License](#license)

## Install

    $ npm install rversions

## Usage

### R-devel

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel"));
```

    ## {
    ##   version: '4.6.0',
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
    ##   version: '4.6.0',
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
    ##   version: '4.6.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://mac.r-project.org/big-sur/last-success/R-devel-x86_64.pkg',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.6.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-devel_1_amd64.deb',
    ##   date: null,
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("devel", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.6.0',
    ##   nickname: 'Unsuffered Consequences',
    ##   type: 'devel',
    ##   url: 'https://github.com/r-hub/R/releases/download/vdevel/r-rstudio-ubuntu-2204-devel_1_arm64.deb',
    ##   date: null,
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

### R-next

This can be an alpha, beta, RC or pre-release if a release process is
currently happenning. Otherwise it is the current patched version.

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'patched',
    ##   url: 'https://cran.rstudio.com/src/base-prerelease/R-latest.tar.gz',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "win"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'next',
    ##   nexttype: 'patched',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/R-4.5.0patched-win.exe',
    ##   date: null,
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "macos"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'next',
    ##   nexttype: 'patched',
    ##   url: 'https://mac.r-project.org/big-sur/last-success/R-4.5-branch-x86_64.pkg',
    ##   date: null
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'next',
    ##   nexttype: 'patched',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-next_1_amd64.deb',
    ##   date: null,
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("next", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'next',
    ##   nexttype: 'patched',
    ##   url: 'https://github.com/r-hub/R/releases/download/vnext/r-rstudio-ubuntu-2204-next_1_arm64.deb',
    ##   date: null,
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

### R-release

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.5.0.tar.gz',
    ##   date: '2025-04-11T08:51:39.256539Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "win"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/R-4.5.0-win.exe',
    ##   date: '2025-04-11T08:51:39.256539Z',
    ##   rtools: '45',
    ##   rtools_url: 'https://github.com/r-hub/rtools45/releases/download/latest/rtools45.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "macos"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'release',
    ##   url: 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.5.0-x86_64.pkg',
    ##   date: '2025-04-11T08:51:39.256539Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'release',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.5.0_1_amd64.deb',
    ##   date: '2025-04-11T08:51:39.256539Z',
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("release", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.5.0',
    ##   nickname: 'How About a Twenty-Six',
    ##   type: 'release',
    ##   url: 'https://github.com/r-hub/R/releases/download/v4.5.0/r-rstudio-ubuntu-2204-4.5.0_1_arm64.deb',
    ##   date: '2025-04-11T08:51:39.256539Z',
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

### R-oldrel

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1"));
```

    ## {
    ##   version: '4.4.3',
    ##   nickname: 'Trophy Case',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/src/base/R-4/R-4.4.3.tar.gz',
    ##   date: '2025-02-28T08:08:59.188927Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "win"));
```

    ## {
    ##   version: '4.4.3',
    ##   nickname: 'Trophy Case',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/bin/windows/base/old/4.4.3/R-4.4.3-win.exe',
    ##   date: '2025-02-28T08:08:59.188927Z',
    ##   rtools: '44',
    ##   rtools_url: 'https://github.com/r-hub/rtools44/releases/download/latest/rtools44.exe'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "macos"));
```

    ## {
    ##   version: '4.4.3',
    ##   nickname: 'Trophy Case',
    ##   type: 'oldrel/1',
    ##   url: 'https://cran.rstudio.com/bin/macosx/big-sur-x86_64/base/R-4.4.3-x86_64.pkg',
    ##   date: '2025-02-28T08:08:59.188927Z'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.4.3',
    ##   nickname: 'Trophy Case',
    ##   type: 'oldrel/1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.4.3_1_amd64.deb',
    ##   date: '2025-02-28T08:08:59.188927Z',
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("oldrel/1", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.4.3',
    ##   nickname: 'Trophy Case',
    ##   type: 'oldrel/1',
    ##   url: 'https://github.com/r-hub/R/releases/download/v4.4.3/r-rstudio-ubuntu-2204-4.4.3_1_arm64.deb',
    ##   date: '2025-02-28T08:08:59.188927Z',
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

### Specific R version

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
console.log(await rversions.resolve("4.2.2", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.2.2_1_amd64.deb',
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.2.2", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.2.2',
    ##   nickname: 'Innocent and Trusting',
    ##   type: '4.2.2',
    ##   date: '2022-10-31T08:05:54.268400Z',
    ##   url: 'https://github.com/r-hub/R/releases/download/v4.2.2/r-rstudio-ubuntu-2204-4.2.2_1_arm64.deb',
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

### Minor R version

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
console.log(await rversions.resolve("4.1", "linux-ubuntu-22.04"));
```

    ## {
    ##   version: '4.1.3',
    ##   nickname: Promise { 'One Push-Up' },
    ##   type: '4.1',
    ##   url: 'https://cdn.posit.co/r/ubuntu-2204/pkgs/r-4.1.3_1_amd64.deb',
    ##   date: '2022-03-10T08:05:38.083503Z',
    ##   'ppm-binaries': true,
    ##   'ppm-binary-url': 'jammy'
    ## }

``` javascript
const rversions = require('rversions');
console.log(await rversions.resolve("4.1", "linux-ubuntu-22.04", "arm64"));
```

    ## {
    ##   version: '4.1.3',
    ##   nickname: 'One Push-Up',
    ##   type: '4.1',
    ##   url: 'https://github.com/r-hub/R/releases/download/v4.1.3/r-rstudio-ubuntu-2204-4.1.3_1_arm64.deb',
    ##   date: '2022-03-10T08:05:38.083503Z',
    ##   'ppm-binaries': false,
    ##   'ppm-binary-url': null
    ## }

## All R releases

``` javascript
const rversions = require('rversions');
console.log(await rversions.r_versions());
```

    ## [
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
    ##   {
    ##     version: '2.14.1',
    ##     date: '2011-12-22T08:10:18.809127Z',
    ##     semver: '2.14.1',
    ##     nickname: 'December Snowflakes'
    ##   },
    ##   {
    ##     version: '2.14.2',
    ##     date: '2012-02-29T08:10:10.445478Z',
    ##     semver: '2.14.2',
    ##     nickname: 'Gift-Getting Season'
    ##   },
    ##   {
    ##     version: '2.15.0',
    ##     date: '2012-03-30T07:16:05.708046Z',
    ##     semver: '2.15.0',
    ##     nickname: 'Easter Beagle'
    ##   },
    ##   {
    ##     version: '2.15.1',
    ##     date: '2012-06-22T07:09:44.415136Z',
    ##     semver: '2.15.1',
    ##     nickname: 'Roasted Marshmallows'
    ##   },
    ##   {
    ##     version: '2.15.2',
    ##     date: '2012-10-26T07:11:16.605580Z',
    ##     semver: '2.15.2',
    ##     nickname: 'Trick or Treat'
    ##   },
    ##   {
    ##     version: '2.15.3',
    ##     date: '2013-03-01T08:28:29.088755Z',
    ##     semver: '2.15.3',
    ##     nickname: 'Security Blanket'
    ##   },
    ##   {
    ##     version: '3.0.0',
    ##     date: '2013-04-03T07:12:36.801147Z',
    ##     semver: '3.0.0',
    ##     nickname: 'Masked Marvel'
    ##   },
    ##   {
    ##     version: '3.0.1',
    ##     date: '2013-05-16T07:11:33.885209Z',
    ##     semver: '3.0.1',
    ##     nickname: 'Good Sport'
    ##   },
    ##   {
    ##     version: '3.0.2',
    ##     date: '2013-09-25T07:11:09.016418Z',
    ##     semver: '3.0.2',
    ##     nickname: 'Frisbee Sailing'
    ##   },
    ##   {
    ##     version: '3.0.3',
    ##     date: '2014-03-06T08:12:33.995105Z',
    ##     semver: '3.0.3',
    ##     nickname: 'Warm Puppy'
    ##   },
    ##   {
    ##     version: '3.1.0',
    ##     date: '2014-04-10T07:11:10.831155Z',
    ##     semver: '3.1.0',
    ##     nickname: 'Spring Dance'
    ##   },
    ##   {
    ##     version: '3.1.1',
    ##     date: '2014-07-10T07:11:09.316022Z',
    ##     semver: '3.1.1',
    ##     nickname: 'Sock it to Me'
    ##   },
    ##   {
    ##     version: '3.1.2',
    ##     date: '2014-10-31T08:11:32.082768Z',
    ##     semver: '3.1.2',
    ##     nickname: 'Pumpkin Helmet'
    ##   },
    ##   {
    ##     version: '3.1.3',
    ##     date: '2015-03-09T08:12:20.229070Z',
    ##     semver: '3.1.3',
    ##     nickname: 'Smooth Sidewalk'
    ##   },
    ##   {
    ##     version: '3.2.0',
    ##     date: '2015-04-16T07:13:33.144514Z',
    ##     semver: '3.2.0',
    ##     nickname: 'Full of Ingredients'
    ##   },
    ##   {
    ##     version: '3.2.1',
    ##     date: '2015-06-18T07:15:04.589869Z',
    ##     semver: '3.2.1',
    ##     nickname: 'World-Famous Astronaut'
    ##   },
    ##   {
    ##     version: '3.2.2',
    ##     date: '2015-08-14T07:13:18.272871Z',
    ##     semver: '3.2.2',
    ##     nickname: 'Fire Safety'
    ##   },
    ##   {
    ##     version: '3.2.3',
    ##     date: '2015-12-10T08:13:08.415370Z',
    ##     semver: '3.2.3',
    ##     nickname: 'Wooden Christmas-Tree'
    ##   },
    ##   {
    ##     version: '3.2.4',
    ##     date: '2016-03-10T08:15:45.901354Z',
    ##     semver: '3.2.4',
    ##     nickname: 'Very Secure Dishes'
    ##   },
    ##   {
    ##     version: '3.2.5',
    ##     date: '2016-04-14T15:59:38.833914Z',
    ##     semver: '3.2.5',
    ##     nickname: 'Very, Very Secure Dishes'
    ##   },
    ##   {
    ##     version: '3.3.0',
    ##     date: '2016-05-03T07:13:28.102867Z',
    ##     semver: '3.3.0',
    ##     nickname: 'Supposedly Educational'
    ##   },
    ##   ... 39 more items
    ## ]

## Rtools versions

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

## Supported Linux distros for R builds

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
    ##     'last-build': '4.1.2'
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
    ##     'last-build': '4.3.1'
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
    ##     'last-build': null
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
    ##     'last-build': null
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
    ##     'last-build': null
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
    ##     'last-build': '4.2.1'
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
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'debian-11',
    ##     aliases: [ 'bullseye' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '11',
    ##     codename: 'bullseye',
    ##     docker: 'debian:11',
    ##     eol: 'N/A',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'bullseye',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'debian-12',
    ##     aliases: [ 'bookworm' ],
    ##     name: 'Debian',
    ##     url: 'https://www.debian.org/',
    ##     version: '12',
    ##     codename: 'bookworm',
    ##     docker: 'debian:12',
    ##     eol: 'N/A',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'bookworm',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-42',
    ##     alisess: [ 'opensuse-42', 'opensuse-42.3' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '42.3',
    ##     docker: 'opensuse:42.3',
    ##     eol: '2019-07-01',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse42',
    ##     retired: true,
    ##     'last-build': '4.2.1'
    ##   },
    ##   {
    ##     id: 'opensuse-15',
    ##     alisess: [
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
    ##     'last-build': '4.1.2'
    ##   },
    ##   {
    ##     id: 'opensuse-152',
    ##     alisess: [ 'opensuse-15.2', 'opensuse-leap-15.2' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.2',
    ##     docker: 'opensuse/leap:15.2',
    ##     eol: '2022-01-04',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse152',
    ##     retired: true,
    ##     'last-build': '4.1.3'
    ##   },
    ##   {
    ##     id: 'opensuse-153',
    ##     alisess: [ 'opensuse-15.3', 'opensuse-leap-15.3' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.3',
    ##     docker: 'opensuse/leap:15.3',
    ##     eol: '2022-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse153',
    ##     returned: true,
    ##     'last-build': '4.3.1'
    ##   },
    ##   {
    ##     id: 'opensuse-154',
    ##     alisess: [ 'opensuse-15.4', 'opensuse-leap-15.4' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.4',
    ##     docker: 'opensuse/leap:15.4',
    ##     eol: '2023-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse154',
    ##     retired: true,
    ##     'last-build': '4.4.0'
    ##   },
    ##   {
    ##     id: 'opensuse-155',
    ##     alisess: [ 'opensuse-15.5', 'opensuse-leap-15.5' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.5',
    ##     docker: 'opensuse/leap:15.5',
    ##     eol: '2024-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse155',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'opensuse-156',
    ##     alisess: [ 'opensuse-15.6', 'opensuse-leap-15.6' ],
    ##     name: 'openSUSE Leap',
    ##     url: 'https://www.opensuse.org/',
    ##     version: '15.6',
    ##     docker: 'opensuse/leap:15.6',
    ##     eol: '2025-12-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'opensuse156',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'centos-6',
    ##     aliases: [ 'rhel-6' ],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '6',
    ##     docker: 'centos:6',
    ##     eol: '2020‑11‑30',
    ##     'ppm-binaries': false,
    ##     'ppm-binary-url': null,
    ##     retired: true,
    ##     'last-build': '4.0.4'
    ##   },
    ##   {
    ##     id: 'centos-7',
    ##     aliases: [ 'rhel-7' ],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '7',
    ##     docker: 'centos:7',
    ##     eol: '2024‑06‑30',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'centos7',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'centos-8',
    ##     aliases: [],
    ##     name: 'CentOS Linux',
    ##     url: 'https://www.centos.org/',
    ##     version: '8',
    ##     docker: 'centos:8',
    ##     eol: '2024‑05‑31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'centos8',
    ##     retired: false,
    ##     'last-build': null
    ##   },
    ##   {
    ##     id: 'rhel-9',
    ##     aliases: [ '/rhel-9[.][0-9]+/' ],
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '9',
    ##     docker: 'N/A',
    ##     eol: '2032-05-31',
    ##     'ppm-binaries': true,
    ##     'ppm-binary-url': 'rhel9',
    ##     retired: false,
    ##     'last-build': null
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
    ##     'last-build': '4.3.2'
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
    ##     'last-build': '4.4.2'
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
    ##     retired: false,
    ##     'last-build': null
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
    ##     retired: false,
    ##     'last-build': null
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
    ##     retired: false,
    ##     'last-build': null
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
    ##     'last-build': null
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
    ##     id: 'rhel-7',
    ##     aliases: [ '/rhel-7[.][0-9]+/' ],
    ##     implementation: 'centos-7',
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '7',
    ##     docker: 'N/A',
    ##     eol: '2024‑06‑30'
    ##   },
    ##   {
    ##     id: 'rhel-8',
    ##     aliases: [ '/rhel-8[.][0-9]+/' ],
    ##     implementation: 'centos-8',
    ##     name: 'Red Hat Enterprise Linux',
    ##     url: 'https://www.redhat.com/',
    ##     version: '8',
    ##     docker: 'N/A',
    ##     eol: '2029‑05‑31'
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
    ##     id: 'rocky-8',
    ##     aliases: [ '/rocky-8[.][0-9]+/' ],
    ##     implementation: 'centos-8',
    ##     name: 'Rocky Linux',
    ##     url: 'https://rockylinux.org/',
    ##     version: '8',
    ##     docker: 'rockylinux:8',
    ##     eol: '2024-05-31'
    ##   },
    ##   {
    ##     id: 'rocky-9',
    ##     aliases: [ '/rocky-9[.][0-9]+/' ],
    ##     implementation: 'rhel-9',
    ##     name: 'Rocky Linux',
    ##     url: 'https://rockylinux.org/',
    ##     version: '9',
    ##     docker: 'rockylinux:9',
    ##     eol: '2027-05-31'
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
