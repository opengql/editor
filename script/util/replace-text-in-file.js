const fs = require('fs');

const replaceTextInFile = (filePath, searchStr, replacementStr) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const updatedData = data.replace(new RegExp(searchStr, 'g'), replacementStr);

  fs.writeFileSync(filePath, updatedData, 'utf8');
};

module.exports = { replaceTextInFile };
