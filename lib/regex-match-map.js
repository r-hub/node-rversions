
function regex_match_map(linux_map, os) {
    const keys = Object.keys(linux_map);
    for (i in keys) {
        const key = keys[i];
        if (key[0] === '/' && key.slice(-1) === '/') {
            const rekey = '^' + key.slice(1, -1) + '$';
            const re = new RegExp(rekey);
            if (re.test(os)) {
                return linux_map[key];
            }
        }
    }

    return undefined;
}

module.exports = regex_match_map;
