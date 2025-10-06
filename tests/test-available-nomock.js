const test = require('ava');

if (!!process.env.NODE_RVERSIONS_NOMOCK) {
  var run = require('./_available.js');
  run();
}

test('dummy-available-nomock', t => {
  t.pass();
});
