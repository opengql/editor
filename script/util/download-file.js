const axios = require('axios');
const fs = require('fs');
const { saveFileFromResponse } = require('./save-file-from-response');

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
