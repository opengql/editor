const fs = require('fs');

/***
 * Method that replaces content defined as {@link RegExp} string with the provided replacement string.
 *
 * @param {string} filePath
 * @param {string} searchStr
 * @param {string} replacementStr
 */
const replaceTextInFile = (filePath, searchStr, replacementStr) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const updatedData = data.replace(new RegExp(searchStr, 'g'), replacementStr);

  fs.writeFileSync(filePath, updatedData, 'utf8');
};

module.exports = { replaceTextInFile };
