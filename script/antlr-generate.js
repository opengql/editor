const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { downloadFile } = require('./util/download-file');
const { removeDirectory } = require('./util/remove-directory');
const { getFilenamesInDir } = require('./util/get-filenames-in-dir');
const { renameFileWithPattern } = require('./util/rename-file-with-pattern');
const { convertToKebabCase } = require('./util/convert-to-kebab-case');
const { replaceTextInFile } = require('./util/replace-text-in-file');

(async () => {
  const workingDir = path.join(__dirname, '..');

  console.log('Checking ANTLR4 binary...');

  const antlrBinFilePath = path.join(workingDir, 'bin', 'antlr4.jar');
  const antlrBinFileUrl = 'https://www.antlr.org/download/antlr-4.13.1-complete.jar';

  if (!fs.existsSync(antlrBinFilePath)) {
    await downloadFile(antlrBinFileUrl, antlrBinFilePath);
  }

  console.log('Cleaning up before parser generation...');

  const outputDir = path.join(workingDir, 'module', 'worker', 'src', 'generated');

  removeDirectory(outputDir);

  console.log('Generating parser source code...');

  const lexerFile = './tmp/GQLLexer.g4';
  const parserFile = './tmp/GQLParser.g4';
  const command = `java -jar ${antlrBinFilePath} -Dlanguage=JavaScript -o ${outputDir} ${lexerFile} -o ${outputDir} ${parserFile}`;

  execSync(command);

  console.log('Removing unnecessary files from generation process...');

  const unnecessaryFiles = getFilenamesInDir(outputDir)
    .filter((fileName) => fileName.endsWith('.interp') || fileName.endsWith('.tokens'))
    .map((fileName) => path.join(outputDir, fileName));

  unnecessaryFiles.forEach((filePath) => fs.unlinkSync(filePath));

  console.log('Renaming files from generation process...');

  const outputFiles = getFilenamesInDir(outputDir).map((fileName) => path.join(outputDir, fileName));

  for (const outputFile of outputFiles) {
    renameFileWithPattern(outputFile, convertToKebabCase);
  }

  console.log('Refactoring parser file...');

  const parserFilePath = path.join(workingDir, 'module', 'worker', 'src', 'generated', 'gql-parser.js');

  replaceTextInFile(parserFilePath, "'./GQLParserListener.js'", "'./gql-parser-listener'");
})();
