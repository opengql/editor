const axios = require('axios');
const fs = require('fs');
const { saveFileFromResponse } = require('./save-file-from-response');

const githubDownload = async (githubDownloadUrl, filePath) => {
  const tmpFilePath = `./tmp/${filePath}`;
  const writer = fs.createWriteStream(tmpFilePath);

  try {
    const headers = {
      Accept: '*/*',
      Authorization: `Bearer ${process.env.GRAMMAR_REPOSITORY_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const response = await axios({ url: githubDownloadUrl, method: 'get', responseType: 'stream', headers });

    await saveFileFromResponse(response, writer, tmpFilePath);
  } catch (error) {
    console.error(`Error downloading file: ${error.message}`);
    fs.unlinkSync(tmpFilePath);
  }
};

const downloadFromGithub = async (path, repository) => {
  const headers = {
    Accept: 'application/vnd.github.object+json',
    Authorization: `Bearer ${process.env.GRAMMAR_REPOSITORY_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const response = await axios({
    url: `https://api.github.com/repos/${repository}/contents/${path}`,
    method: 'get',
    headers,
  });

  if (response.data.type === 'file') {
    await githubDownload(response.data.download_url, response.data.name);
  }

  if (response.data.type === 'dir') {
    fs.mkdirSync(`./tmp/${response.data.name}`);

    const downloads = response.data.entries.map((entry) => {
      return githubDownload(entry.download_url, `${response.data.name}/${entry.name}`);
    });

    await Promise.all(downloads);
  }
};

module.exports = { downloadFromGithub };
