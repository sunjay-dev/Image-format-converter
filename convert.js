const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(3)} MB`;
}

function convertFile(inputPath, outputPath, quality, format, del = false) {
  const extension = '.' + format;
  
  const originalSize = fs.statSync(inputPath).size;

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), extension);

  let option = format === 'png' ? { compressionLevel: 9 } : { quality };

  sharp(inputPath).
    toFormat(format, option)
    .toFile(outputFile).then(() => {
      const newSize = fs.statSync(outputFile).size;
      logger.log(`Converted: ${inputPath} (${formatSize(originalSize)} → ${formatSize(newSize)})`);
      if (del) {
        fs.unlink(inputPath, (err) => {
          if (err) {
            logger.error(`Failed to delete original file: ${inputPath}`, err.message);
          } else {
            logger.warn(`Deleted original file: ${inputPath}`);
          }
        })
      }
    })
    .catch(err => {
      logger.error("Conversion failed:", err.message);
    });
}

module.exports = convertFile;