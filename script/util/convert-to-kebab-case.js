const path = require('path');

const convertToKebabCase = (fileName) => {
  const extension = path.extname(fileName);
  const baseName = path.basename(fileName, extension);
  const kebabCaseName = baseName.replace(/(GQL)|[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  const kebabCaseBaseName = kebabCaseName.replace(/^-/, '').toLowerCase();
  return `${kebabCaseBaseName}${extension}`;
};

module.exports = { convertToKebabCase };
