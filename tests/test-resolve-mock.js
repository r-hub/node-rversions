const test = require('ava');

if (!!process.env.NODE_RVERSIONS_NOMOCK) {
  var run = require('./resolve.js');
  run();
}

test('dummy-resolve-mock', t => {
  t.pass();
});
