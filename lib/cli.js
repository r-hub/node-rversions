'use strict';

const { available, resolve, rtools_versions, linux_distros } = require('..');

async function cmdAvailable(flags, out = console) {
    const results = await available(flags.os, flags.arch);
    if (flags.json) {
        out.log(JSON.stringify(results, null, 2));
    } else {
        for (const r of results) out.log(`${r.version}\t${r.url}`);
    }
}

async function cmdResolve(version, flags, out = console) {
    if (!version) throw new Error('<version> argument is required');
    const result = await resolve(version, flags.os, flags.arch);
    if (flags.json) {
        out.log(JSON.stringify(result, null, 2));
    } else {
        out.log(`${result.version}\t${result.url}`);
    }
}

function cmdRtoolsVersions(flags, out = console) {
    const results = rtools_versions(flags.arch);
    if (flags.json) {
        out.log(JSON.stringify(results, null, 2));
    } else {
        for (const r of results) out.log(`${r.version}\t${r.first}..${r.last}\t${r.url}`);
    }
}

function cmdLinuxDistros(flags, out = console) {
    const results = linux_distros();
    if (flags.json) {
        out.log(JSON.stringify(results, null, 2));
    } else {
        for (const r of results) out.log(r.id);
    }
}

module.exports = { cmdAvailable, cmdResolve, cmdRtoolsVersions, cmdLinuxDistros };
