const fs = require('fs');
const path = require('path');

const renameFileWithPattern = (filePath, pattern) => {
  const directory = path.dirname(filePath);
  const oldFileName = path.basename(filePath);
  const newFileName = pattern(oldFileName);
  const oldFilePath = path.join(directory, oldFileName);
  const newFilePath = path.join(directory, newFileName);

  fs.renameSync(oldFilePath, newFilePath);
  return [oldFileName, newFileName];
};

module.exports = { renameFileWithPattern };
