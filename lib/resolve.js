
const resolve_no_os    = require('./resolve-no-os');
const resolve_os_win   = require('./resolve-os-win');
const resolve_os_mac   = require('./resolve-os-mac');
const resolve_os_linux = require('./resolve-os-linux');

async function resolve_os(version, os, arch, cache) {
    const oslc = os.toLowerCase()
    if (oslc == "win" || oslc == "windows") {
        return resolve_os_win(version, arch, cache);

    } else if (oslc == "mac" || oslc == "macos" || oslc == "macosx") {
        return resolve_os_mac(version, arch, cache);

    } else if (oslc == "linux" || oslc.startsWith("linux-")) {
        return resolve_os_linux(version, os, arch, cache);

    } else {
        throw new Error("Unknown OS: '" + os + "'.");
    }
}

async function resolve(version, os, arch, cache = true) {
    if (os === undefined) {
        return resolve_no_os(version, cache);
    } else {
        return resolve_os(version, os, arch, cache);
    }
}

module.exports = resolve;
