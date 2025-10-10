pkgload::load_all()
cmd <- commandArgs(TRUE)[1]
if (cmd == "update-win-aarch64") {
  update_win_aarch64()
} else {
  cli::cli_abort("Unknown command: {.val {cmd}}.")
}
