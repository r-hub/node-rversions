
const available_no_os    = require('./available-no-os');
const available_os_win   = require('./available-os-win');
const available_os_mac   = require('./available-os-mac');
const available_os_linux = require('./available-os-linux');

async function available(os, arch, cache = true) {
    if (os === undefined) {
        return available_no_os(cache);
    }

    const oslc = os.toLowerCase();
    if (oslc == "win" || oslc == "windows") {
        return available_os_win(arch, cache);

    } else if (oslc == "mac" || oslc == "macos" || oslc == "macosx") {
        return available_os_mac(arch, cache);

    } else if (oslc == "linux" || oslc.startsWith("linux-")) {
        return available_os_linux(os, arch, cache);

    } else {
        throw new Error("Unknown OS: '" + os + "'.");
    }
}

module.exports = available;
