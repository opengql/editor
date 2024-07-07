const axios = require('axios');
const fs = require('fs');
const { saveFileFromResponse } = require('./save-file-from-response');

/***
 * Async method that allows to download file from provided URL and save the download file at provided path.
 * If download of file fails it will console the error with message and removes the created already file.
 *
 * @param {string} url
 * @param {string} filePath
 * @returns {Promise<void>}
 */
const downloadFile = async (url, filePath) => {
  const writer = fs.createWriteStream(filePath);

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    await saveFileFromResponse(response, writer, filePath);
  } catch (error) {
    console.error(`Error downloading file: ${error.message}`);
    fs.unlinkSync(filePath);
  }
};

module.exports = { downloadFile };
