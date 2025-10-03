const test = require('ava');
const srv = require('./helpers/server');
const fs = require('fs');

const mock = process.env.NODE_RVERSIONS_NOMOCK ? "" : "-mock";
const datafile = 'data' + mock + '.json';

test.before(async () => {
  if (fs.existsSync(datafile)) {
    return;
  }
  await srv();
  // needs to be after srv(), it sets env vars for URLs
  const linux_builds_amd64 = require('../lib/linux-builds-posit');
  const linux_builds_arm64 = require('../lib/linux-builds-arm64');
  let p1 = linux_builds_amd64();
  let p2 = linux_builds_arm64();
  let res = await Promise.all([p1, p2]);
  let data = { linux_builds_amd64: res[0], linux_builds_arm64: res[1] };
  await fs.promises.writeFile(datafile + '.bak', JSON.stringify(data), 'utf8');
  await fs.promises.rename(datafile + '.bak', datafile);
});

test('dummy-download-fixtures', t => {
  t.pass();
});
