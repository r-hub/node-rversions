
const first_link = require('./first-link');

async function r_release_win() {
    return first_link(
        'win',
        'Cannot deduce version of latest Windows installer'
    );
}

module.exports = r_release_win;
