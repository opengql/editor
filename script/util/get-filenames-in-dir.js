const fs = require('fs');
const path = require('path');

/***
 * Method that returns all possible file names in provided directory.
 *
 * @param {string} directoryPath
 * @returns {string[]}
 */
const getFilenamesInDir = (directoryPath) => {
  const files = fs.readdirSync(directoryPath);
  return files.filter((file) => fs.statSync(path.join(directoryPath, file)).isFile());
};

module.exports = { getFilenamesInDir };
