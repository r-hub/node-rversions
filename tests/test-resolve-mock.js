const test = require('ava');

if (!process.env.NODE_RVERSIONS_NOMOCK) {
  var run = require('./_resolve.js');
  run();
}

test('dummy-resolve-mock', t => {
  t.pass();
});
