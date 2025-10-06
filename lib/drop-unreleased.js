function drop_unreleased(versions, release, build) {
    if (release.version != build.version) {
        versions = versions.filter(function(v) {
            return v.version != release.version;
        });
    }
    return versions;
}

module.exports = drop_unreleased;
