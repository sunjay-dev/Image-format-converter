const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

function convertFile(inputPath, outputPath, quality) {

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), '.webp');
  
  sharp(inputPath)
    .webp({ quality })
    .toFile(outputFile)
    .then(() => {
      console.log(`✅ Converted to: ${outputFile}`);
    })
    .catch(err => {
      console.error("❌ Conversion failed:", err.message);
    });
}

module.exports = convertFile;