
function regex_match_map(linux_map, os) {
    for (i in linux_map) {
        const dist = linux_map[i];
        const id = dist.id;
        if (id == os) {
            return dist.implementation || dist.id;
        }
        if (dist.aliases) {
            for (j in dist.aliases) {
                const alias = dist.aliases[j];
                if (alias == os) {
                    return dist.implementation || dist.id;
                } else if (alias[0] === '/' && alias.slice(-1) === '/') {
                    const realias = '^' + alias.slice(1, -1) + '$';
                    const re = new RegExp(realias);
                    if (re.test(os)) {
                        return dist.implementation || dist.id;
                    }
                }
            }
        }
    }

    return undefined;
}

module.exports = regex_match_map;
