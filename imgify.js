#!/usr/bin/env node
const convertFile = require('./convert.js');
const fs = require('fs');
const path = require('path');
const processArgs = require('./args.js');
const logger = require('./logger.js')

let { inputPath, outputPath, format, quality, isAll, del, supportedExtensions, dry } = processArgs(process.argv)

if (isAll) {
  const files = fs.readdirSync(process.cwd());

  const imageFiles = files.filter(file =>
    supportedExtensions.includes(path.extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    logger.info("No images found in this folder.");
    process.exit(0);
  }
  imageFiles.forEach(file => {
    if (dry) {
      logger.log(`[DRY] ${file} → ${format}`);
    } else
      convertFile(file, null, quality, format, del);
  });
}
else {
  if (!inputPath) {
    logger.error("Please provide an input image path.");
    logger.error("Usage:");
    logger.error("  webpify input.jpg [output.webp]");
    logger.error("  webpify --all   # Convert all .jpg/.png/.jpeg images in this folder");
    process.exit(1);
  }

  if (dry) {
    logger.log(`[DRY] ${file} → ${format}`);
  } else
    convertFile(inputPath, outputPath, quality, format, del);
}