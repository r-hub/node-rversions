update_win_aarch64 <- function() {
  url <- win_aarch64_prerelease_url()
  cli::cli_alert_info("Getting directory listing from {.url {url}}")
  page <- rvest::read_html(url)
  tab <- rvest::html_table(page)[[1]]
  tab[["Last modified"]] <- parsedate::parse_iso_8601(tab[["Last modified"]])
  tab <- tab[order(tab[["Last modified"]], decreasing = TRUE), ]
  nxt <- tab[grepl("^R-(patched|alpha|beta|rc)", tab$Name, ignore.case = TRUE), ]
  devel <- tab[grepl("^R-devel", tab$Name), ]
  nxt_nm <- tolower(sub("_.*$", "", sub("^R-", "", nxt$Name[1])))
  update_win_aarch64_file(nxt$Name[1], nxt_nm, "next")
  update_win_aarch64_file(devel$Name[1], "devel", "devel")
}

# ------------------------------------------------------------------------------

win_aarch64_prerelease_url <- function() {
  url <- Sys.getenv(
    "R_WIN_AARCH64_PRERELEASE_URL",
    unset = "https://www.r-project.org/nosvn/winutf8/aarch64/prerelease/"
  )
  if (!endsWith(url, "/")) {
    url <- paste0(url, "/")
  }
  url
}

update_win_aarch64_file <- function(name, version, tag) {
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

  # if not devel, then add the tag ('-next') into the name.
  fn <- gsub("_", "-", name)
  if (version != "devel") {
    fn <- sub("^R-", paste0("R-", tag, "-"), fn)
  }
  if (fn %in% vapply(assets, `[[`, "", "name")) {
    cli::cli_alert_info(
      "The file {.val {fn}} is already present in the release {.val {tag}}"
    )
    return(invisible())
  }
  dlurl <- paste0(win_aarch64_prerelease_url(), name)
  cli::cli_alert_info("Downloading new file {.val {fn}}.")
  curl::curl_download(dlurl, fn)

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
