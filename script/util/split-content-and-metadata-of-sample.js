const splitContentAndMetadataOfSample = (fileContent) => {
  const lines = fileContent.split('\n');
  const metadata = {};
  let content = '';
  let inMetadata = false;

  lines.forEach((line) => {
    if (line.startsWith('###')) {
      inMetadata = true;
      const [property, value] = line.slice(4).split(':');

      if (property && value) {
        const propertyName = property.trim().toLowerCase();
        metadata[propertyName] = value.trim();
      }
    } else {
      if (inMetadata) {
        inMetadata = false;
      }
      if (!inMetadata) {
        content += line + '\n';
      }
    }
  });

  return { metadata, content };
};

module.exports = { splitContentAndMetadataOfSample };
