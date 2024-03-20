const path = require('path');
const { ESLint } = require('eslint');
const fs = require('fs');

const formatFile = async (filePath) => {
  const configPath = path.join(__dirname, '..', '..', '.eslintrc.js');
  const eslint = new ESLint({ fix: true, overrideConfigFile: configPath });

  try {
    const output = await eslint.lintFiles(filePath);
    fs.writeFileSync(filePath, output[0].output);
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = { formatFile };
