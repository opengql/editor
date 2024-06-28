const path = require('path');

/***
 * Method that converts provided string to kebab case format.
 * Example: helloWorld -> hello-world
 *
 * @param {string} fileName
 * @returns {string}
 */
const convertToKebabCase = (fileName) => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const kebabCaseName = baseName.replace(/(GQL|PGS)|[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  const kebabCaseBaseName = kebabCaseName.replace(/^-/, '').toLowerCase();
  return `${kebabCaseBaseName}${extension}`;
};

module.exports = { convertToKebabCase };
