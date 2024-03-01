const fs = require('fs');

const replaceTextInFile = (filePath, searchStr, replacementStr) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`);
      return;
    }

    const updatedData = data.replace(new RegExp(searchStr, 'g'), replacementStr);

    fs.writeFile(filePath, updatedData, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(`Error writing to file: ${writeErr.message}`);
        return;
      }

      console.log(`Text replaced successfully in ${filePath}`);
    });
  });
};

module.exports = { replaceTextInFile };
