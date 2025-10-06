
const mycache = require('./cache');
const linux_builds_arm64 = require('./linux-builds-arm64');
const r_versions_bare = require('./r-versions-bare');
const linux_filenames = require('./linux-filenames');

async function r_release_linux(os, cache = true) {
    let cached = undefined;
    const key = 'r_release_linux_' + os;
    if (cache) { cached = mycache.get(key); }
    if (cached !== undefined) { return cached; }

    const distro = os.split('-')[0];
    const release = os.split('-')[1];
    const url = linux_filenames.github[distro]
        .replaceAll("{rel}", release)
        .replaceAll("{arch}", "arm64")
        .replaceAll("{aarch}", "aarch64");

    const p1 = linux_builds_arm64(cache);
    const p2 = r_versions_bare(cache);
    var all = await Promise.all([p1, p2]);
    const ratelimit = all[0].rateLimit;
    const rbuilds = all[0].repository.releases.nodes;
    const rvers = all[1];
    const tags = rbuilds.map(t => {
        return t.tagName.replace(/^v/, "");
    });
    var value = undefined;
    for (let i = rvers.length - 1; i > 0; i--) {
        var idx = tags.indexOf(rvers[i].version);
        if (idx != -1) {
            const cand = rvers[i];
            const candurl = url.replaceAll('{ver}', cand.version);
            const assets = rbuilds[idx].releaseAssets.nodes;
            const dlurls = assets.map(x => { return x.downloadUrl; });
            const idx2 = dlurls.indexOf(candurl);
            if (idx2 != -1) {
                value = cand;
                value["URL"] = candurl;
                break;
            }
        }
    }
    if (value === undefined) {
        throw new Error("Cannot find R release linux builds for arch 'arm64'.");
    }

    mycache.set(key, value);
    return value;
}

module.exports = r_release_linux;
