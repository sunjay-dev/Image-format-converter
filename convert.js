const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function convertFile(inputPath, outputPath, quality, format, del = false) {
  const extension = '.' + format;

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), extension);

  let option = format === 'png' ? { compressionLevel: 9 } : { quality };

  sharp(inputPath).
    toFormat(format, option)
    .toFile(outputFile).then(() => {
      console.log(`✅ Converted: ${inputPath}`);
      if (del) {
        fs.unlink(inputPath, (err) => {
          if (err) {
            console.error(`⚠️ Failed to delete original file: ${inputPath}`, err.message);
          } else {
            console.log(`🗑️ Deleted original file: ${inputPath}`);
          }
        })
      }
    })
    .catch(err => {
      console.error("❌ Conversion failed:", err.message);
    });
}

module.exports = convertFile;