const fs = require('fs').promises;
const wait_for_file = require('./wait-for-file');

const mock = process.env.NODE_RVERSIONS_NOMOCK ? "" : "-mock";
const datafile = 'data' + mock + '.json';

async function load_fixtures(cache = undefined) {
  await wait_for_file(datafile);
  let cnt = await fs.readFile(datafile, 'utf8');
  let data = JSON.parse(cnt);
  if (cache !== undefined) {
    cache.set('linux_builds_amd64', data.linux_builds_amd64);
    cache.set('linux_builds_arm64', data.linux_builds_arm64);
  }
  return data;

}

module.exports = load_fixtures;
