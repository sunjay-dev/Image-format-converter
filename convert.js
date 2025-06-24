const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function convertFile(inputPath, outputPath, quality, format) {
  const extension = '.' + format;

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), extension);

  let option = format === 'png' ? { compressionLevel: 9 } : { quality };

  sharp(inputPath).
    toFormat(format, option)
    .toFile(outputFile).then(() => {
      console.log(`✅ Converted to: ${outputFile}`);
    })
    .catch(err => {
      console.error("❌ Conversion failed:", err.message);
    });
}

module.exports = convertFile;