
# rversions

[![Build Status](https://travis-ci.com/r-hub/node-rversions.svg?branch=master)](https://travis-ci.com/r-hub/node-rversions)

> Past and present R versions

## Install

```
$ npm install rversions
```

## Usage

### The current R-release version (release)

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_release());
})();
```

```
{
  version: '3.6.3',
  date: '2020-02-29T08:05:16.744223Z',
  nickname: 'Holding the Windsock'
}
```

### The latest release of the previous minor version (oldrel)

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_oldrel());
})();
```

```
{
  version: '3.5.3',
  date: '2019-03-11T08:04:49.379300Z',
  nickname: 'Great Truth'
}
```

### All R releases

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_versions());
})();
```

```
[
  {
    version: '0.60',
    date: '1997-12-04T08:47:58.000000Z',
    nickname: null
  },
  {
    version: '0.61',
    date: '1997-12-21T13:09:22.000000Z',
    nickname: null
  },

...

  {
    version: '3.3.0',
    date: '2016-05-03T07:13:28.102867Z',
    nickname: 'Supposedly Educational'
  },
  ... 16 more items
```
  
### Others

#### The latest available tarball

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_release_tarball());
})();
```

```
{
  version: '3.6.3',
  date: '2020-02-29T08:05:16.744223Z',
  nickname: 'Holding the Windsock',
  URL: 'https://cran.r-project.org/src/base/R-3/R-3.6.3.tar.gz'
}
```

#### The latest available Windows installer

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_release_win());
})();
```

```
{
  version: '3.6.3',
  date: '2020-02-29T08:05:16.744223Z',
  nickname: 'Holding the Windsock',
  URL: 'https://cran.r-project.org/bin/windows/base/R-3.6.3-win.exe'
}
```

#### The latest available macOS installer

Set the second argument (`arch`) to `x86_64` (default) or `arm64`.

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_release_macos(undefined, 'x86_64'));
})();
```

```
{
  version: '3.6.2',
  date: '2019-12-12T08:05:03.679160Z',
  nickname: 'Dark and Stormy Night',
  URL: 'https://cran.r-project.org/bin/macosx/R-3.6.2.pkg'
}
```

#### The (current) version number of R-devel

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_devel());
})();
```

```
{ version: '4.0.0', date: null, nickname: 'Unsuffered Consequences' }
```

#### The next version of R

This can be an alpha, beta, RC or pre-release if a release process is
currently happenning. Otherwise it is the current patched version.

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_devel());
})();
```

```
{
  version: '4.2.0',
  date: null,
  nickname: null,
  type: 'alpha',
  URL: 'https://cran.r-project.org/src/base-prerelease/R-latest.tar.gz'
}
```

#### Windows installer for the next version

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_next_win());
})();
```

```
{
  version: '4.2.0',
  date: null,
  nickname: null,
  type: 'alpha',
  URL: 'https://cran.r-project.org/bin/windows/base/R-4.2.0alpha-win.exe'
}
```

#### macOS installer for the next version

Set the second argument (`arch`) to `x86_64` (default) or `arm64`.

```js
const rversions = require('rversions');

(async () => {
	console.log(await rversions.r_next_macos(undefined, 'x86_64'));
})();
```

```
{
  version: '4.3.0',
  date: null,
  nickname: 'Already Tomorrow',
  type: 'beta',
  URL: 'https://mac.r-project.org/big-sur/last-success/R-4.3-branch-x86_64.pkg'
}
```

#### The latest version within a minor branch

```js
const rversions = require('rvresions');

(async () => {
	console.log(await rversions.r_minor('4.0', 'x86_64'));
})();
```

```
{
  version: '4.0.5',
  date: '2021-03-31T07:05:15.035437Z',
  nickname: 'Shake and Throw'
}
```

## Caching

All queries are cached for five minutes by default. If you don't want to
use the cached value, then set the (first) cache argument to `false`.

## License

ISC @ R Consortium

This repo is part of the R-hub project, supported by
the R Consortium.
