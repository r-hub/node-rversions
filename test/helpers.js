
'use strict';

const nock = require('nock');
const cache = require('../lib/cache');

// Prevent any real HTTP requests during tests
nock.disableNetConnect();

function setup() {
    cache.clear();
}

function teardown() {
    nock.cleanAll();
}

module.exports = { nock, setup, teardown };
