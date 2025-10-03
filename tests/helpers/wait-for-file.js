const fs = require('fs');
const path = require('path');

function wait_for_file(filePath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(filePath);
    const base = path.basename(filePath);

    const watcher = fs.watch(dir, (eventType, filename) => {
      if (filename === base && eventType === "rename") {
        // Check if the file now exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (!err) {
            watcher.close();  // stop watching after first appearance
            resolve(filePath);
          }
        });
      }
    });

    // In case the file already exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (!err) {
        watcher.close();
        resolve(filePath);
      }
    });

    watcher.on("error", reject);
  });
}

module.exports = wait_for_file;
