const { downloadFromGithub } = require('./util/github-download');
const path = require('path');
const { removeDirectory } = require('./util/remove-directory');
const fs = require('fs');

require('dotenv').config();

(async () => {
  const workingDir = path.join(__dirname, '..');

  console.log('Cleaning up before downloading new files...');

  const outputDir = path.join(workingDir, 'tmp');

  removeDirectory(outputDir);

  fs.mkdirSync(outputDir);

  console.log('Downloading latest files from opengql/grammar repository...');

  await downloadFromGithub('GQL.g4', 'opengql/grammar');
  await downloadFromGithub('version.json', 'opengql/grammar');
  await downloadFromGithub('samples', 'opengql/grammar');
})();
