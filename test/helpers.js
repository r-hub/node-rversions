
'use strict';

const nock = require('nock');
const cache = require('../lib/cache');

// Prevent any real HTTP requests during tests
nock.disableNetConnect();

function setup(t) {
    // Clear the module-level cache before each test so tests are independent
    cache.del('r_versions_bare');
    cache.del('r_release');
    cache.del('r_oldrel');
    cache.del('r_branches');
    cache.del('r_devel');
    cache.del('r_next');

    t.teardown(() => {
        nock.cleanAll();
    });
}

module.exports = { nock, setup };
