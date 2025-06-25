const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');

function convertFile(inputPath, outputPath, quality, format, del = false) {
  const extension = '.' + format;

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), extension);

  let option = format === 'png' ? { compressionLevel: 9 } : { quality };

  sharp(inputPath).
    toFormat(format, option)
    .toFile(outputFile).then(() => {
      logger.log(`Converted: ${inputPath}`);
      if (del) {
        fs.unlink(inputPath, (err) => {
          if (err) {
            logger.error(`Failed to delete original file: ${inputPath}`, err.message);
          } else {
            logger.log(`Deleted original file: ${inputPath}`);
          }
        })
      }
    })
    .catch(err => {
      logger.error("Conversion failed:", err.message);
    });
}

module.exports = convertFile;