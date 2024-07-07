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
const { splitContentAndMetadataOfSample } = require('./util/split-content-and-metadata-of-sample');

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

  const binDirectoryPath = path.join(workingDir, 'bin');
  const antlrBinFilePath = path.join(binDirectoryPath, 'antlr4.jar');
  const antlrBinFileUrl = 'https://www.antlr.org/download/antlr-4.13.1-complete.jar';

  if (!fs.existsSync(antlrBinFilePath)) {
    if (!fs.existsSync(binDirectoryPath)) {
      fs.mkdirSync(binDirectoryPath);
    }

    await downloadFile(antlrBinFileUrl, antlrBinFilePath);
  }

  const sourceDir = path.join(workingDir, 'module', 'worker', 'src');

  const grammarDefinitions = [
    {
      name: 'GQL',
      outputDir: path.join(sourceDir, 'gql', 'generated'),
      samplesDir: path.join(workingDir, 'tmp', 'samples'),
      grammarFile: path.join(workingDir, 'tmp', 'GQL.g4'),
      samplesFile: path.join(sourceDir, 'gql', 'generated', 'gql-examples.js'),
    },
    {
      name: 'PGS',
      outputDir: path.join(sourceDir, 'pgs', 'generated'),
      samplesDir: path.join(sourceDir, 'pgs', 'grammar', 'samples'),
      grammarFile: path.join(sourceDir, 'pgs', 'grammar', 'PGS.g4'),
      samplesFile: path.join(sourceDir, 'pgs', 'generated', 'pgs-examples.js'),
    },
  ];

  const operations = grammarDefinitions.map(async ({ name, outputDir, samplesDir, grammarFile, samplesFile }) => {
    console.log(`[${name}] Cleaning up before parser generation...`);

    removeDirectory(outputDir);
    fs.mkdirSync(outputDir);

    console.log(`[${name}] Generating grammar code...`);

    const command = `java -jar ${antlrBinFilePath} -Dlanguage=JavaScript -o ${outputDir} ${grammarFile}`;

    execSync(command);

    const tmpOutputDir = path.join(outputDir, 'tmp');

    if (fs.existsSync(tmpOutputDir)) {
      getFilenamesInDir(tmpOutputDir).forEach((fileName) => {
        const sourceFile = path.join(tmpOutputDir, fileName);
        const destinationFile = path.join(outputDir, fileName);
        fs.renameSync(sourceFile, destinationFile);
      });

      removeDirectory(tmpOutputDir);
    }

    console.log(`[${name}] Removing unnecessary files from generation process...`);

    const unnecessaryFiles = getFilenamesInDir(outputDir)
      .filter((fileName) => fileName.endsWith('.interp') || fileName.endsWith('.tokens'))
      .map((fileName) => path.join(outputDir, fileName));

    unnecessaryFiles.forEach((filePath) => fs.unlinkSync(filePath));

    console.log(`[${name}] Renaming files from generation process...`);

    const outputFiles = getFilenamesInDir(outputDir).map((fileName) => path.join(outputDir, fileName));

    let namesMap = {};

    for (const outputFile of outputFiles) {
      const [oldFileName, newFileName] = renameFileWithPattern(outputFile, convertToKebabCase);

      namesMap = {
        ...namesMap,
        [oldFileName]: newFileName,
      };
    }

    console.log(`[${name}] Refactoring generated file...`);

    getFilenamesInDir(outputDir).forEach((fileName) => {
      const filePath = path.join(outputDir, fileName);

      Object.entries(namesMap).forEach(([oldFileName, newFileName]) => {
        replaceTextInFile(filePath, `'./${oldFileName}'`, `'./${newFileName}'`);
      });
    });

    console.log(`[${name}] Generating examples file...`);

    const examples = getFilenamesInDir(samplesDir).map((sampleFileName) => {
      const sampleFilePath = path.join(samplesDir, sampleFileName);
      const rawContent = `${fs.readFileSync(sampleFilePath)}`;
      const { metadata, content } = splitContentAndMetadataOfSample(rawContent);
      const exampleName = metadata.name ? metadata.name : sampleFileName.replace(/\.gql/g, '').replace(/\\_/g, ' ');
      const code = content.replace(/\n/g, '\\n').replace(/'/g, "\\'").replace(/"/g, '\\"');

      return `{
        name: "${exampleName}",
        code: "${code}",
      }`;
    });

    const examplesSource = `
    export const ${name.toLowerCase()}Examples = [\n
      ${examples}
    ];\n
    `;

    fs.writeFileSync(samplesFile, examplesSource);

    await formatFile(samplesFile);
  });

  await Promise.all(operations);
})();
