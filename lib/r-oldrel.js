
const r_versions_bare = require('./r-versions-bare');
const get_nick = require('./get-nick');

async function r_oldrel() {
    const versions = await r_versions_bare();
    const oldrel = get_oldrel(versions);
    oldrel.nickname = await get_nick(oldrel.version);
    return oldrel;
}

function get_oldrel(versions) {
    const minors = versions.map(function(x) {
        return x.version.replace(/^[0-9]+\.([0-9]+).*$/, '$1');
    })

    const rlsminor = Number(minors.pop());
    for (let i = versions.length - 1; i > 0; i--) {
        if (Number(minors[i]) < rlsminor) return(versions[i]);
    }
    throw new Error("Cannot decude r-oldrel version");
}

module.exports = r_oldrel;

if (process.env['NODE_ENV'] === 'test') {
    r_oldrel.internals = {
        get_oldrel: get_oldrel
    };
}
