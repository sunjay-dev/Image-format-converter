const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const logger = require('./logger.js');
sharp.cache(false);

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(3)} MB`;
}

function formatPercentage(newSize, originalSize) {
  const change = (newSize - originalSize) / originalSize * 100;
  const percent = Math.abs(Math.round(change));
  const direction = change > 0 ? 'increase' : 'reduction';
  return `${percent}% ${direction}`;
}

async function convertFile(inputPath, outputPath, quality, format) {
  const extension = '.' + format;

  const originalSize = fs.statSync(inputPath).size;

  const outputFile = outputPath || inputPath.replace(path.extname(inputPath), extension);

  let option = format === 'png' ? { compressionLevel: 9 } : { quality };
  
  try {
    await sharp(inputPath).
      toFormat(format, option)
      .toFile(outputFile)
    
    const newSize = fs.statSync(outputFile).size;
    logger.success(`Converted: ${inputPath}  → ${format} (${formatSize(originalSize)} → ${formatSize(newSize)}) (${formatPercentage(newSize, originalSize)})`);
    return true;
  } catch (err) {
    logger.error("Conversion failed:", err.message);
    return false;
  };
}

module.exports = convertFile;