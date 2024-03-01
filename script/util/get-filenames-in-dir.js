const fs = require('fs');
const path = require('path');

const getFilenamesInDir = (directoryPath) => {
  const files = fs.readdirSync(directoryPath);
  return files.filter((file) => fs.statSync(path.join(directoryPath, file)).isFile());
};

module.exports = { getFilenamesInDir };
