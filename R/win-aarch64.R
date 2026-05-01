update_win_aarch64 <- function() {
  cli::cli_alert_info("Getting latest successful run of r-devel/r-svn build-svn.yaml")
  runs <- gh::gh(
    "GET /repos/r-devel/r-svn/actions/workflows/build-svn.yaml/runs",
    status = "success",
    per_page = 1
  )
  if (length(runs$workflow_runs) == 0) {
    cli::cli_abort("No successful workflow runs found")
  }
  run <- runs$workflow_runs[[1]]
  run_date <- format(as.Date(run$run_started_at), "%Y%m%d")

  cli::cli_alert_info("Getting artifacts for run {.val {run$id}}")
  artifacts <- gh::gh(
    "GET /repos/r-devel/r-svn/actions/runs/{run_id}/artifacts",
    run_id = run$id
  )
  artifact <- Filter(function(x) x$name == "Windows-R-devel-arm", artifacts$artifacts)
  if (length(artifact) == 0) {
    cli::cli_abort("Could not find Windows-R-devel-arm artifact")
  }

  fn <- paste0("R-devel-", run_date, "-", run$id, "-aarch64.exe")
  update_win_aarch64_file(artifact[[1]]$archive_download_url, fn, "devel", "devel")
}

# ------------------------------------------------------------------------------

update_win_aarch64_file <- function(download_url, fn, version, tag) {
  cli::cli_alert_info("Updating Windows aarch64 build for {.val {version}}")
  cli::cli_alert_info("Getting current release assets")
  ghq <- glue::glue(
    .open = "<<",
    .close = ">>",
    'query {
        rateLimit {
            cost
            remaining
        }
        repository(owner: "r-hub", name: "R") {
            release(tagName: "v<<tag>>") {
               databaseId
               releaseAssets(last: 100) {
                  nodes {
                      id
                      name
                      downloadUrl
                  }
                }
            }
        }
    }'
  )
  resp <- gh::gh_gql(ghq)
  release_id <- resp$data$repository$release$databaseId
  assets <- resp$data$repository$release$releaseAssets$nodes
  if (is.null(assets)) {
    cli::cli_abort("Could not find release assets for {.val {tag}}")
  }
  assets <- Filter(
    function(x) grepl(paste0(version, ".*aarch64[.]exe$"), x$name),
    assets
  )

  if (fn %in% vapply(assets, `[[`, "", "name")) {
    cli::cli_alert_info(
      "The file {.val {fn}} is already present in the release {.val {tag}}"
    )
    return(invisible())
  }

  cli::cli_alert_info("Downloading artifact for {.val {fn}}.")
  tmpzip <- tempfile(fileext = ".zip")
  on.exit(unlink(tmpzip), add = TRUE)
  req <- httr2::request(download_url)
  req <- httr2::req_auth_bearer_token(req, gh::gh_token())
  httr2::req_perform(req, path = tmpzip)

  tmpdir <- tempfile()
  dir.create(tmpdir)
  on.exit(unlink(tmpdir, recursive = TRUE), add = TRUE)
  utils::unzip(tmpzip, exdir = tmpdir)
  exe_files <- list.files(tmpdir, pattern = "\\.exe$", recursive = TRUE, full.names = TRUE)
  if (length(exe_files) == 0) {
    cli::cli_abort("No .exe file found in artifact zip")
  }
  file.copy(exe_files[[1]], fn)
  on.exit(unlink(fn), add = TRUE)

  # upload new release
  # TODO: why doesn't this work with gh?
  upurl <- paste0(
    "https://uploads.github.com/repos/r-hub/R/releases/",
    release_id,
    "/assets",
    "?name=",
    fn
  )
  fsize <- file.info(fn)$size

  req <- httr2::request(upurl)
  req <- httr2::req_method(req, "POST")
  req <- httr2::req_body_raw(req, readBin(fn, raw(), n = fsize))
  req <- httr2::req_headers(
    req,
    "Content-Length" = fsize,
    "Content-Type" = "application/vnd.microsoft.portable-executable",
    Authorization = paste("token", gh::gh_token())
  )
  upresp <- httr2::req_perform(req)
  if (upresp$status_code != 201) {
    cli::cli_abort(
      "Uploading the file failed: {httr2::resp_status_desc(upresp)}."
    )
  }

  # delete old releases, but keep the last one
  if (length(assets) > 1) {
    cli::cli_alert_info("Deleting old release assets, keeping the latest one.")
    rel <- gh::gh(
      "/repos/{owner}/{repo}/releases/{release_id}",
      owner = "r-hub",
      repo = "R",
      release_id = release_id
    )

    todel_node_ids <- utils::head(vapply(assets, "[[", "", "id"), -1)
    todel <- Filter(function(x) x$node_id %in% todel_node_ids, rel$assets)
    for (idx in seq_along(todel)) {
      cli::cli_alert_info(
        "Deleting old release asset {.val {todel[[idx]]$name}}"
      )
      gh::gh(
        "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}",
        owner = "r-hub",
        repo = "R",
        asset_id = todel[[idx]]$id
      )
    }
  }
}
