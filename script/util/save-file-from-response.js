/***
 * Method that saves the file from provided Axios response.
 *
 * @param {AxiosResponse} response
 * @param {WriteStream} writer
 * @param {string} filePath
 * @returns {Promise<void>}
 */
const saveFileFromResponse = async (response, writer, filePath) => {
  console.log(`Downloading ${filePath}...`);
  response.data.pipe(writer);
  await new Promise((resolve) => writer.on('finish', resolve));
};

module.exports = { saveFileFromResponse };
