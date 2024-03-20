const saveFileFromResponse = async (response, writer, filePath) => {
  console.log(`Downloading ${filePath}...`);
  response.data.pipe(writer);
  await new Promise((resolve) => writer.on('finish', resolve));
};

module.exports = { saveFileFromResponse };
