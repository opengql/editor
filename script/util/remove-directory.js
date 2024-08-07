const fs = require('fs');
const path = require('path');

/***
 * Method that removes directory with its content recursively.
 *
 * @param {string} dirPath
 */
const removeDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      removeDirectory(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }

  fs.rmdirSync(dirPath);
};

module.exports = { removeDirectory };
