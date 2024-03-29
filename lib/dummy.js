
const distros = require('./list-linux-distros');

const get_version_from_minor = require('./r-minor')
      .internals
      .get_version_from_minor;

const rver =
      [
          {
              "version": "0.60",
              "date": "1997-12-04T08:47:58.000000Z",
              "nickname": null
          },
          {
              "version": "0.61",
              "date": "1997-12-21T13:09:22.000000Z",
              "nickname": null
          },
          {
              "version": "0.61.1",
              "date": "1998-01-10T00:31:55.000000Z",
              "nickname": null
          },
          {
              "version": "0.61.2",
              "date": "1998-03-14T19:25:55.000000Z",
              "nickname": null
          },
          {
              "version": "0.61.3",
              "date": "1998-05-02T07:58:17.000000Z",
              "nickname": null
          },
          {
              "version": "0.62",
              "date": "1998-06-14T12:56:20.000000Z",
              "nickname": null
          },
          {
              "version": "0.62.1",
              "date": "1998-06-14T22:13:25.000000Z",
              "nickname": null
          },
          {
              "version": "0.62.2",
              "date": "1998-07-10T11:13:45.000000Z",
              "nickname": null
          },
          {
              "version": "0.62.3",
              "date": "1998-08-28T09:02:19.000000Z",
              "nickname": null
          },
          {
              "version": "0.62.4",
              "date": "1998-10-23T12:08:41.000000Z",
              "nickname": null
          },
          {
              "version": "0.63",
              "date": "1998-11-13T14:37:19.000000Z",
              "nickname": null
          },
          {
              "version": "0.63.1",
              "date": "1998-12-04T13:06:28.000000Z",
              "nickname": null
          },
          {
              "version": "0.63.2",
              "date": "1999-01-11T12:55:50.000000Z",
              "nickname": null
          },
          {
              "version": "0.63.3",
              "date": "1999-03-05T14:27:14.000000Z",
              "nickname": null
          },
          {
              "version": "0.64",
              "date": "1999-04-07T13:19:41.000000Z",
              "nickname": null
          },
          {
              "version": "0.64.1",
              "date": "1999-05-07T13:25:43.000000Z",
              "nickname": null
          },
          {
              "version": "0.64.2",
              "date": "1999-07-02T12:23:15.000000Z",
              "nickname": null
          },
          {
              "version": "0.65",
              "date": "1999-08-27T10:29:29.000000Z",
              "nickname": null
          },
          {
              "version": "0.65.1",
              "date": "1999-10-06T12:13:04.000000Z",
              "nickname": null
          },
          {
              "version": "0.90",
              "date": "1999-11-22T12:25:14.000000Z",
              "nickname": null
          },
          {
              "version": "0.90.1",
              "date": "1999-12-15T12:29:07.000000Z",
              "nickname": null
          },
          {
              "version": "0.99",
              "date": "2000-02-07T11:24:50.000000Z",
              "nickname": null
          },
          {
              "version": "1.0",
              "date": "2000-02-29T08:55:23.000000Z",
              "nickname": null
          },
          {
              "version": "1.0.1",
              "date": "2000-04-14T08:44:18.000000Z",
              "nickname": null
          },
          {
              "version": "1.1",
              "date": "2000-06-15T08:43:21.000000Z",
              "nickname": null
          },
          {
              "version": "1.1.1",
              "date": "2000-08-15T08:54:18.000000Z",
              "nickname": null
          },
          {
              "version": "1.2",
              "date": "2000-12-15T10:19:25.000000Z",
              "nickname": null
          },
          {
              "version": "1.2.1",
              "date": "2001-01-15T10:18:01.000000Z",
              "nickname": null
          },
          {
              "version": "1.2.2",
              "date": "2001-02-26T12:43:25.000000Z",
              "nickname": null
          },
          {
              "version": "1.2.3",
              "date": "2001-04-26T11:29:47.000000Z",
              "nickname": null
          },
          {
              "version": "1.3",
              "date": "2001-06-22T10:41:02.000000Z",
              "nickname": null
          },
          {
              "version": "1.3.1",
              "date": "2001-08-31T12:45:52.000000Z",
              "nickname": null
          },
          {
              "version": "1.4",
              "date": "2001-12-19T10:14:54.000000Z",
              "nickname": null
          },
          {
              "version": "1.4.1",
              "date": "2002-01-30T11:57:35.000000Z",
              "nickname": null
          },
          {
              "version": "1.5.0",
              "date": "2002-04-29T10:01:26.000000Z",
              "nickname": null
          },
          {
              "version": "1.5.1",
              "date": "2002-06-17T11:20:33.000000Z",
              "nickname": null
          },
          {
              "version": "1.6.0",
              "date": "2002-10-01T10:06:31.000000Z",
              "nickname": null
          },
          {
              "version": "1.6.1",
              "date": "2002-11-01T10:33:17.000000Z",
              "nickname": null
          },
          {
              "version": "1.6.2",
              "date": "2003-01-10T15:34:34.000000Z",
              "nickname": null
          },
          {
              "version": "1.7.0",
              "date": "2003-04-16T12:58:07.000000Z",
              "nickname": null
          },
          {
              "version": "1.7.1",
              "date": "2003-06-16T09:54:39.000000Z",
              "nickname": null
          },
          {
              "version": "1.8.0",
              "date": "2003-10-08T11:13:59.000000Z",
              "nickname": null
          },
          {
              "version": "1.8.1",
              "date": "2003-11-21T12:00:21.000000Z",
              "nickname": null
          },
          {
              "version": "1.9.0",
              "date": "2004-04-12T10:36:38.000000Z",
              "nickname": null
          },
          {
              "version": "1.9.1",
              "date": "2004-06-21T11:09:39.000000Z",
              "nickname": null
          },
          {
              "version": "2.0.0",
              "date": "2004-10-04T14:24:38.899055Z",
              "nickname": null
          },
          {
              "version": "2.0.1",
              "date": "2004-11-15T14:16:30.003793Z",
              "nickname": null
          },
          {
              "version": "2.1.0",
              "date": "2005-04-18T22:26:33.135566Z",
              "nickname": null
          },
          {
              "version": "2.1.1",
              "date": "2005-06-20T09:27:13.106513Z",
              "nickname": null
          },
          {
              "version": "2.2.0",
              "date": "2005-10-06T10:22:14.085752Z",
              "nickname": null
          },
          {
              "version": "2.2.1",
              "date": "2005-12-20T10:35:21.589612Z",
              "nickname": null
          },
          {
              "version": "2.3.0",
              "date": "2006-04-24T10:37:20.758200Z",
              "nickname": null
          },
          {
              "version": "2.3.1",
              "date": "2006-06-01T08:25:33.882724Z",
              "nickname": null
          },
          {
              "version": "2.4.0",
              "date": "2006-10-03T10:15:04.354469Z",
              "nickname": null
          },
          {
              "version": "2.4.1",
              "date": "2006-12-18T09:49:23.725060Z",
              "nickname": null
          },
          {
              "version": "2.5.0",
              "date": "2007-04-24T09:41:43.361786Z",
              "nickname": null
          },
          {
              "version": "2.5.1",
              "date": "2007-06-28T11:17:06.374019Z",
              "nickname": null
          },
          {
              "version": "2.6.0",
              "date": "2007-10-03T09:02:53.434461Z",
              "nickname": null
          },
          {
              "version": "2.6.1",
              "date": "2007-11-26T14:14:04.408327Z",
              "nickname": null
          },
          {
              "version": "2.6.2",
              "date": "2008-02-08T11:10:05.737877Z",
              "nickname": null
          },
          {
              "version": "2.7.0",
              "date": "2008-04-22T07:45:29.665494Z",
              "nickname": null
          },
          {
              "version": "2.7.1",
              "date": "2008-06-23T07:44:32.518990Z",
              "nickname": null
          },
          {
              "version": "2.7.2",
              "date": "2008-08-25T08:53:56.807981Z",
              "nickname": null
          },
          {
              "version": "2.8.0",
              "date": "2008-10-20T09:24:01.015723Z",
              "nickname": null
          },
          {
              "version": "2.8.1",
              "date": "2008-12-22T09:03:17.828643Z",
              "nickname": null
          },
          {
              "version": "2.9.0",
              "date": "2009-04-17T08:32:48.144754Z",
              "nickname": null
          },
          {
              "version": "2.9.1",
              "date": "2009-06-26T12:10:57.017685Z",
              "nickname": null
          },
          {
              "version": "2.9.2",
              "date": "2009-08-24T08:22:34.737538Z",
              "nickname": null
          },
          {
              "version": "2.10.0",
              "date": "2009-10-26T09:02:22.255015Z",
              "nickname": null
          },
          {
              "version": "2.10.1",
              "date": "2009-12-14T10:28:24.741988Z",
              "nickname": null
          },
          {
              "version": "2.11.0",
              "date": "2010-04-22T08:11:21.939620Z",
              "nickname": null
          },
          {
              "version": "2.11.1",
              "date": "2010-05-31T08:10:25.280185Z",
              "nickname": null
          },
          {
              "version": "2.12.0",
              "date": "2010-10-15T08:41:57.974589Z",
              "nickname": null
          },
          {
              "version": "2.12.1",
              "date": "2010-12-16T09:12:04.607865Z",
              "nickname": null
          },
          {
              "version": "2.12.2",
              "date": "2011-02-25T11:07:19.316500Z",
              "nickname": null
          },
          {
              "version": "2.13.0",
              "date": "2011-04-13T08:31:27.165034Z",
              "nickname": null
          },
          {
              "version": "2.13.1",
              "date": "2011-07-08T09:37:08.653178Z",
              "nickname": null
          },
          {
              "version": "2.13.2",
              "date": "2011-09-30T07:05:56.091789Z",
              "nickname": null
          },
          {
              "version": "2.14.0",
              "date": "2011-10-31T08:09:09.353781Z",
              "nickname": "Great Pumpkin"
          },
          {
              "version": "2.14.1",
              "date": "2011-12-22T08:10:18.809127Z",
              "nickname": "December Snowflakes"
          },
          {
              "version": "2.14.2",
              "date": "2012-02-29T08:10:10.445478Z",
              "nickname": "Gift-Getting Season"
          },
          {
              "version": "2.15.0",
              "date": "2012-03-30T07:16:05.708046Z",
              "nickname": "Easter Beagle"
          },
          {
              "version": "2.15.1",
              "date": "2012-06-22T07:09:44.415136Z",
              "nickname": "Roasted Marshmallows"
          },
          {
              "version": "2.15.2",
              "date": "2012-10-26T07:11:16.605580Z",
              "nickname": "Trick or Treat"
          },
          {
              "version": "2.15.3",
              "date": "2013-03-01T08:28:29.088755Z",
              "nickname": "Security Blanket"
          },
          {
              "version": "3.0.0",
              "date": "2013-04-03T07:12:36.801147Z",
              "nickname": "Masked Marvel"
          },
          {
              "version": "3.0.1",
              "date": "2013-05-16T07:11:33.885209Z",
              "nickname": "Good Sport"
          },
          {
              "version": "3.0.2",
              "date": "2013-09-25T07:11:09.016418Z",
              "nickname": "Frisbee Sailing"
          },
          {
              "version": "3.0.3",
              "date": "2014-03-06T08:12:33.995105Z",
              "nickname": "Warm Puppy"
          },
          {
              "version": "3.1.0",
              "date": "2014-04-10T07:11:10.831155Z",
              "nickname": "Spring Dance"
          },
          {
              "version": "3.1.1",
              "date": "2014-07-10T07:11:09.316022Z",
              "nickname": "Sock it to Me"
          },
          {
              "version": "3.1.2",
              "date": "2014-10-31T08:11:32.082768Z",
              "nickname": "Pumpkin Helmet"
          },
          {
              "version": "3.1.3",
              "date": "2015-03-09T08:12:20.229070Z",
              "nickname": "Smooth Sidewalk"
          },
          {
              "version": "3.2.0",
              "date": "2015-04-16T07:13:33.144514Z",
              "nickname": "Full of Ingredients"
          },
          {
              "version": "3.2.1",
              "date": "2015-06-18T07:15:04.589869Z",
              "nickname": "World-Famous Astronaut"
          },
          {
              "version": "3.2.2",
              "date": "2015-08-14T07:13:18.272871Z",
              "nickname": "Fire Safety"
          },
          {
              "version": "3.2.3",
              "date": "2015-12-10T08:13:08.415370Z",
              "nickname": "Wooden Christmas-Tree"
          },
          {
              "version": "3.2.4",
              "date": "2016-03-10T08:15:45.901354Z",
              "nickname": "Very Secure Dishes"
          },
          {
              "version": "3.2.5",
              "date": "2016-04-14T15:59:38.833914Z",
              "nickname": "Very, Very Secure Dishes"
          },
          {
              "version": "3.3.0",
              "date": "2016-05-03T07:13:28.102867Z",
              "nickname": "Supposedly Educational"
          },
          {
              "version": "3.3.1",
              "date": "2016-06-21T07:21:38.894907Z",
              "nickname": "Bug in Your Hair"
          },
          {
              "version": "3.3.2",
              "date": "2016-10-31T08:13:15.868949Z",
              "nickname": "Sincere Pumpkin Patch"
          },
          {
              "version": "3.3.3",
              "date": "2017-03-06T08:16:31.646592Z",
              "nickname": "Another Canoe"
          },
          {
              "version": "3.4.0",
              "date": "2017-04-21T07:14:45.366247Z",
              "nickname": "You Stupid Darkness"
          },
          {
              "version": "3.4.1",
              "date": "2017-06-30T07:04:11.824142Z",
              "nickname": "Single Candle"
          },
          {
              "version": "3.4.2",
              "date": "2017-09-28T07:04:35.796221Z",
              "nickname": "Short Summer"
          },
          {
              "version": "3.4.3",
              "date": "2017-11-30T08:05:05.204665Z",
              "nickname": "Kite-Eating Tree"
          },
          {
              "version": "3.4.4",
              "date": "2018-03-15T08:04:27.234564Z",
              "nickname": "Someone to Lean On"
          },
          {
              "version": "3.5.0",
              "date": "2018-04-23T07:04:38.341063Z",
              "nickname": "Joy in Playing"
          },
          {
              "version": "3.5.1",
              "date": "2018-07-02T07:04:31.629927Z",
              "nickname": "Feather Spray"
          },
          {
              "version": "3.5.2",
              "date": "2018-12-20T08:04:40.536010Z",
              "nickname": "Eggshell Igloo"
          },
          {
              "version": "3.5.3",
              "date": "2019-03-11T08:04:49.379300Z",
              "nickname": "Great Truth"
          },
          {
              "version": "3.6.0",
              "date": "2019-04-26T07:05:03.899333Z",
              "nickname": "Planting of a Tree"
          },
          {
              "version": "3.6.1",
              "date": "2019-07-05T07:05:03.918895Z",
              "nickname": "Action of the Toes"
          },
          {
              "version": "3.6.2",
              "date": "2019-12-12T08:05:03.679160Z",
              "nickname": "Dark and Stormy Night"
          },
          {
              "version": "3.6.3",
              "date": "2020-02-29T08:05:16.744223Z",
              "nickname": "Holding the Windsock"
          },
          {
              "version": "4.0.0",
              "date": "2020-04-24T07:05:34.612930Z",
              "nickname": "Arbor Day"
          },
          {
              "version": "4.0.1",
              "date": "2020-06-06T07:05:16.469439Z",
              "nickname": "See Things Now"
          },
          {
              "version": "4.0.2",
              "date": "2020-06-22T07:05:19.236082Z",
              "nickname": "Taking Off Again"
          },
          {
              "version": "4.0.3",
              "date": "2020-10-10T07:05:24.661746Z",
              "nickname": "Bunny-Wunnies Freak Out"
          },
          {
              "version": "4.0.4",
              "date": "2021-02-15T08:05:13.579673Z",
              "nickname": "Lost Library Book"
          },
          {
              "version": "4.0.5",
              "date": "2021-03-31T07:05:15.035437Z",
              "nickname": "Shake and Throw"
          },
          {
              "version": "4.1.0",
              "date": "2021-05-18T07:05:22.435363Z",
              "nickname": "Camp Pontanezen"
          },
          {
              "version": "4.1.1",
              "date": "2021-08-10T07:05:06.632742Z",
              "nickname": "Kick Things"
          },
          {
              "version": "4.1.2",
              "date": "2021-11-01T08:05:12.078145Z",
              "nickname": "Bird Hippie"
          },
          {
              "version": "4.1.3",
              "date": "2022-03-10T08:05:38.083503Z",
              "nickname": "One Push-Up"
          }
      ]

const rtools_ver = [
    {
	version: '26',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools26.exe',
	first: '2.0.0',
	last: '2.6.2'
    },
    {
	version: '27',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools27.exe',
	first: '2.6.0',
	last: '2.7.2'
    },
    {
	version: '28',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools28.exe',
	first: '2.7.0',
	last: '2.8.1'
    },
    {
	version: '29',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools29.exe',
	first: '2.8.0',
	last: '2.9.2'
    },
    {
	version: '210',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools210.exe',
	first: '2.9.0',
	last: '2.10.1'
    },
    {
	version: '211',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools211.exe',
	first: '2.10.0',
	last: '2.11.1'
    },
    {
	version: '212',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools212.exe',
	first: '2.12.0',
	last: '2.12.2'
    },
    {
	version: '213',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools213.exe',
	first: '2.13.0',
	last: '2.13.2'
    },
    {
	version: '214',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools214.exe',
	first: '2.13.0',
	last: '2.14.2'
    },
    {
	version: '215',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools215.exe',
	first: '2.14.2',
	last: '2.15.1'
    },
    {
	version: '30',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools30.exe',
	first: '2.15.2',
	last: '3.0.3'
    },
    {
	version: '31',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools31.exe',
	first: '3.0.0',
	last: '3.1.3'
    },
    {
	version: '32',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools32.exe',
	first: '3.1.0',
	last: '3.2.5'
    },
    {
	version: '33',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools33.exe',
	first: '3.2.0',
	last: '3.3.3'
    },
    {
	version: '34',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools34.exe',
	first: '3.3.0',
	last: '3.6.3'
    },
    {
	version: '35',
	url: 'https://cran.r-project.org/bin/windows/Rtools/Rtools35.exe',
	first: '3.3.0',
	last: '3.6.3'
    },
    {
	version: '40',
	url: 'https://cran.r-project.org/bin/windows/Rtools/rtools40-x86_64.exe',
	first: '4.0.0',
	last: '4.2.100'
    },
    {
	version: '42',
	url: 'https://github.com/r-hub/rtools42/releases/download/latest/rtools42.exe',
	first: '4.2.0',
	last: '4.2.100'
    },
    {
	version: '43',
	url: 'https://github.com/r-hub/rtools43/releases/download/latest/rtools43.exe',
	first: '4.3.0',
	last: '100.0.0'
    }
]

async function r_versions() {
    return rver;
}

const release =
      {
          "version": "4.1.3",
          "date": "2022-03-10T08:05:38.083503Z",
	  "semver": "4.1.3",
          "nickname": "One Push-Up"
      }

async function r_release() {
    return release;
}

const oldrel =
      {
          "version": "4.0.5",
          "date": "2021-03-31T07:05:15.035437Z",
          "nickname": "Shake and Throw"
      }

async function r_oldrel() {
    return oldrel;
}

const macos_x86_64 =
      {
          "version": "4.1.3",
          "date": "2022-03-10T08:05:38.083503Z",
          "nickname": "One Push-Up",
          "URL": "https://cran.r-project.org/bin/macosx/base/R-4.1.3.pkg",
	  "semver": "4.1.3"
      }

const macos_arm64 =
      {
          "version": "4.1.3",
          "date": "2022-03-10T08:05:38.083503Z",
          "nickname": "One Push-Up",
          "URL": "https://cran.r-project.org/bin/macosx/big-sur-arm64/base/R-4.1.3-arm64.pkg"
      }

async function r_release_macos(cache = true, arch = 'x86_64') {
    if (arch == 'x86_64') {
        return macos_x86_64;
    } else if (arch == 'arm64') {
        return macos_arm64;
    } else {
        throw new Error('Unknown macos arch: ' + arch);
    }
}

const tarball =
      {
          "version": "4.1.3",
          "date": "2022-03-10T08:05:38.083503Z",
          "nickname": "One Push-Up",
          "URL": "https://cran.r-project.org/src/base/R-4/R-4.1.3.tar.gz",
	  "semver": "4.1.3"
      }

async function r_release_tarball() {
    return tarball;
}

const win =
      {
          "version": "4.1.3",
          "date": "2022-03-10T08:05:38.083503Z",
          "nickname": "One Push-Up",
          "URL": "https://cran.r-project.org/bin/windows/base/R-4.1.3-win.exe",
	  "semver": "4.1.3"
      }

async function r_release_win() {
    return win;
}

const devel =
      {
          "URL": "https://cran.r-project.org/src/base-prerelease/R-devel.tar.gz",
          "version": "4.3.0",
          "date": null,
          "nickname": "Unsuffered Consequences"
      }

async function r_devel() {
    return devel;
}

const next =
      {
          "version": "4.2.0",
          "date": null,
          "nickname": "",
          "type": null,
          "URL": 'https://cran.r-project.org/src/base-prerelease/R-latest.tar.gz'
      }

async function r_next() {
    return next;
}

const next_win =
      {
          "version": "4.2.0",
          "date": null,
          "nickname": "",
          "type": null,
          "URL": 'https://cran.r-project.org/bin/windows/base/R-4.2.0alpha-win.exe'
      }

async function r_next_win() {
    return next_win;
}

const next_macos_x86_64 =
      {
          "version": "4.1.3",
          "date": null,
          "nickname": "One Push-Up",
          "type": 'patched',
          "URL": 'https://mac.r-project.org/big-sur/last-success/R-4.3-branch-x86_64.pkg'
      }

const next_macos_arm64 =
      {
          "version": "4.1.3",
          "date": null,
          "nickname": "One Push-Up",
          "type": 'patched',
          "URL": 'https://mac.r-project.org/big-sur/last-success/R-4.1-branch-arm64.pkg'
      }

async function r_next_macos(cache = true, arch = 'x86_64') {
    if (arch == 'x86_64') {
        return next_macos_x86_64;
    } else if (arch == 'arm64') {
        return next_macos_arm64;
    } else {
        throw new Error('Unknown macos arch: ' + arch);
    }
}

async function r_minor(minor, cache = true) {
    var ver = get_version_from_minor(rver, minor);
    ver.semver = ver.version;
    return ver;
}

async function rtools_versions() {
    return rtools_ver;
}

async function linux_distros() {
    return distros;
}

module.exports = {
    r_versions:        r_versions,
    r_release:         r_release,
    r_oldrel:          r_oldrel,
    r_release_macos:   r_release_macos,
    r_release_tarball: r_release_tarball,
    r_release_win:     r_release_win,
    r_devel:           r_devel,
    r_next:            r_next,
    r_next_tarball:    r_next,
    r_next_win:        r_next_win,
    r_next_macos:      r_next_macos,
    r_minor:           r_minor,
    rtools_versions:   rtools_versions,
    linux_distros:     linux_distros
};
