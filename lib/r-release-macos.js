
const first_link = require('./first-link');

async function r_release_macos() {
    return first_link(
        'macos',
        'Cannot deduce version of latest macOS installer'
    );
}

module.exports = r_release_macos;
