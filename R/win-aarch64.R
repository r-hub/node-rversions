update_win_aarch64 <- function() {
  err_devel <- tryCatch(update_win_aarch64_devel(), error = function(e) e)
  err_next <- tryCatch(update_win_aarch64_next(), error = function(e) e)
  errors <- Filter(function(e) inherits(e, "error"), list(err_devel, err_next))
  if (length(errors) > 0) {
    msgs <- vapply(errors, conditionMessage, "")
    cli::cli_abort(c("Some updates failed:", msgs))
  }
  invisible()
}

update_win_aarch64_devel <- function() {
  cli::cli_alert_info(
    "Getting latest R-*-aarch64.exe from r-devel/actions devel release"
  )
  release <- gh::gh("GET /repos/r-devel/actions/releases/tags/devel")
  assets <- Filter(
    function(x) grepl("^R-.*-aarch64\\.exe$", x$name),
    release$assets
  )
  if (length(assets) == 0) {
    cli::cli_abort(
      "No R-*-aarch64.exe asset found in r-devel/actions devel release"
    )
  }
  assets <- assets[order(
    vapply(assets, `[[`, "", "created_at"),
    decreasing = TRUE
  )]
  asset <- assets[[1]]
  asset_date <- format(as.Date(asset$created_at), "%Y%m%d")
  fn <- sub(
    "-aarch64\\.exe$",
    paste0("-", asset_date, "-aarch64.exe"),
    asset$name
  )
  update_win_aarch64_file(
    asset$browser_download_url,
    fn,
    "devel",
    "devel"
  )
}

update_win_aarch64_next <- function() {
  cli::cli_alert_info(
    "Getting latest R-*-aarch64.exe from r-devel/actions next release"
  )
  release <- gh::gh("GET /repos/r-devel/actions/releases/tags/next")
  assets <- Filter(
    function(x) grepl("^R-.*-aarch64\\.exe$", x$name),
    release$assets
  )
  if (length(assets) == 0) {
    cli::cli_abort(
      "No R-*-aarch64.exe asset found in r-devel/actions next release"
    )
  }
  assets <- assets[order(
    vapply(assets, `[[`, "", "created_at"),
    decreasing = TRUE
  )]
  asset <- assets[[1]]
  asset_date <- format(as.Date(asset$created_at), "%Y%m%d")
  fn <- sub(
    "-aarch64\\.exe$",
    paste0("-", asset_date, "-aarch64.exe"),
    asset$name
  )
  browser()
  update_win_aarch64_file(
    asset$browser_download_url,
    fn,
    "next",
    "next"
  )
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

  cli::cli_alert_info("Downloading {.val {fn}}.")
  req <- httr2::request(download_url)
  req <- httr2::req_auth_bearer_token(req, gh::gh_token())
  httr2::req_perform(req, path = fn)
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
