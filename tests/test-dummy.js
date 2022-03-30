
var run = require('./helpers/common.js')

// Test the dummy
process.env.NODE_RVERSIONS_DUMMY = 'true';
run('-dummy');
