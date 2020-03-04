
const first_link = require('./first-link');

async function r_release_tarball() {
    return first_link('tarball', 'Cannot deduce version of latest tarball');
}

module.exports = r_release_tarball;
