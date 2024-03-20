const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { downloadFile } = require('./util/download-file');
const { removeDirectory } = require('./util/remove-directory');
const { getFilenamesInDir } = require('./util/get-filenames-in-dir');
const { renameFileWithPattern } = require('./util/rename-file-with-pattern');
const { convertToKebabCase } = require('./util/convert-to-kebab-case');
const { replaceTextInFile } = require('./util/replace-text-in-file');
const { formatFile } = require('./util/format-file');

require('dotenv').config();

(async () => {
  const workingDir = path.join(__dirname, '..');

  console.log('Validating environment...');

  const samplesDirPath = path.join(workingDir, 'tmp', 'samples');
  const grammarFilePath = path.join(workingDir, 'tmp', 'GQL.g4');

  if (!fs.existsSync(samplesDirPath) || !fs.existsSync(grammarFilePath)) {
    console.log('Environment is not ready for grammar source code generation.');
    console.log('Perform following command to get latest data from opengql/grammar repository:');
    console.log('>\tyarn grammar:download');
    return;
  }

  console.log('Checking ANTLR4 binary...');

  const antlrBinFilePath = path.join(workingDir, 'bin', 'antlr4.jar');
  const antlrBinFileUrl = 'https://www.antlr.org/download/antlr-4.13.1-complete.jar';

  if (!fs.existsSync(antlrBinFilePath)) {
    await downloadFile(antlrBinFileUrl, antlrBinFilePath);
  }

  console.log('Cleaning up before parser generation...');

  const outputDir = path.join(workingDir, 'module', 'worker', 'src', 'generated');

  removeDirectory(outputDir);

  console.log('Generating grammar code...');

  const grammarFile = './tmp/GQL.g4';
  const command = `java -jar ${antlrBinFilePath} -Dlanguage=JavaScript -o ${outputDir} ${grammarFile}`;

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

  console.log('Refactoring generated file...');

  const parserFilePath = path.join(workingDir, 'module', 'worker', 'src', 'generated', 'gql-parser.js');

  replaceTextInFile(parserFilePath, "'./GQLListener.js'", "'./gql-listener'");

  console.log('Generating examples file...');

  const samplesPath = path.join(workingDir, 'tmp', 'samples');

  const examples = getFilenamesInDir(samplesPath).map((sampleFileName) => {
    const sampleFilePath = path.join(workingDir, 'tmp', 'samples', sampleFileName);

    const code = `${fs.readFileSync(sampleFilePath)}`.replace(/\n/g, '\\n').replace(/'/g, "\\'").replace(/"/g, '\\"');

    return `{
      name: "${sampleFileName.replace(/\.gql/g, '').replace(/\\_/g, ' ')}",
      code: "${code}",
    }`;
  });

  const examplesFilePath = path.join(workingDir, 'module', 'worker', 'src', 'generated', 'gql-examples.js');

  const examplesSource = `
  export const GqlExamples = [\n
  ${examples}
  ];\n
  `;

  fs.writeFileSync(examplesFilePath, examplesSource);

  await formatFile(examplesFilePath);
})();
