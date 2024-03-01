const axios = require('axios');
const fs = require('fs');

const downloadFile = async (url, filePath) => {
  const writer = fs.createWriteStream(filePath);

  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const totalBytes = parseInt(response.headers['content-length'], 10) || 0;
    let downloadedBytes = 0;

    response.data.on('data', (chunk) => {
      downloadedBytes += chunk.length;
      const progress = (downloadedBytes / totalBytes) * 100;

      console.log(`Downloading... ${progress.toFixed(2)}%`);
    });

    response.data.pipe(writer);

    await new Promise((resolve) => {
      writer.on('finish', resolve);
    });
  } catch (error) {
    console.error(`Error downloading file: ${error.message}`);
    fs.unlinkSync(filePath);
  }
};

module.exports = { downloadFile };
