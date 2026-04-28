#!/usr/bin/env node

'use strict';

const { cmdAvailable, cmdResolve, cmdRtoolsVersions, cmdLinuxDistros } = require('../lib/cli');

const HELP = {
  main: `
Usage: rver <command> [options]

Commands:
  available        List available R versions
  resolve          Resolve an R version specifier to a download URL
  rtools-versions  List Rtools versions and the R versions they support
  linux-distros    List supported Linux distributions

Options:
  --help      Show help

Run 'rver <command> --help' for command-specific help.
`.trim(),

  available: `
Usage: rver available [options]

List available R versions.

Options:
  --os <os>      Target OS: win, mac, linux-ubuntu-22.04, etc.
  --arch <arch>  Architecture: x86_64, arm64
  --json         Output full objects as a JSON array
  --help         Show help
`.trim(),

  resolve: `
Usage: rver resolve <version> [options]

Resolve a version specifier to a specific R version and download URL.

Arguments:
  <version>      Version specifier: release, devel, next, oldrel, 4.5, 4.5.0, etc.

Options:
  --os <os>      Target OS: win, mac, linux-ubuntu-22.04, etc.
  --arch <arch>  Architecture: x86_64, arm64
  --json         Output the full resolved object as JSON
  --help         Show help
`.trim(),

  'rtools-versions': `
Usage: rver rtools-versions [options]

List Rtools versions and the R versions they support.

Options:
  --arch <arch>  Architecture: x86_64 (default), aarch64
  --json         Output full objects as a JSON array
  --help         Show help
`.trim(),

  'linux-distros': `
Usage: rver linux-distros [options]

List supported Linux distributions.

Options:
  --json         Output full objects as a JSON array
  --help         Show help
`.trim()
};

function parseArgs(argv) {
  const flags = {};
  const positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--json' || arg === '--help') {
      flags[arg.slice(2)] = true;
    } else if (arg.startsWith('--')) {
      flags[arg.slice(2)] = argv[++i];
    } else {
      positionals.push(arg);
    }
  }
  return { flags, positionals };
}

(async () => {
  const { flags, positionals } = parseArgs(process.argv.slice(2));
  const cmd = positionals[0];

  if (cmd === 'available') {
    if (flags.help) { console.log(HELP.available); process.exit(0); }
    await cmdAvailable(flags);
  } else if (cmd === 'resolve') {
    if (flags.help) { console.log(HELP.resolve); process.exit(0); }
    await cmdResolve(positionals[1], flags);
  } else if (cmd === 'rtools-versions') {
    if (flags.help) { console.log(HELP['rtools-versions']); process.exit(0); }
    cmdRtoolsVersions(flags);
  } else if (cmd === 'linux-distros') {
    if (flags.help) { console.log(HELP['linux-distros']); process.exit(0); }
    cmdLinuxDistros(flags);
  } else if (!cmd || flags.help) {
    console.log(HELP.main);
    process.exit(0);
  } else {
    console.error(`Unknown command: ${cmd}`);
    console.error(HELP.main);
    process.exit(1);
  }
})().catch(err => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
