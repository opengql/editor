const path = require('path');
const ghPages = require('gh-pages');
const { removeDirectory } = require('./util/remove-directory');
const fs = require('fs');
const { execSync } = require('child_process');

(async () => {
  const workingDir = path.join(__dirname, '..');

  console.log('Validating environment...');

  const versionFilePath = path.join(workingDir, 'tmp', 'version.json');

  if (!fs.existsSync(versionFilePath)) {
    console.log('Environment is not ready for grammar source code generation.');
    console.log('Perform following command to get latest data from opengql/grammar repository:');
    console.log('>\tyarn grammar:download');
    return;
  }

  console.log('Clearing build directory...');

  const buildDir = path.join(workingDir, 'build');

  removeDirectory(buildDir);

  console.log('Building worker and editor sources...');

  execSync('yarn build:prod');

  console.log('Deploy application to GitHub Pages...');

  await ghPages.publish(buildDir);
})();
