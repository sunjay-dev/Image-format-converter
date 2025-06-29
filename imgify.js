#!/usr/bin/env node
const convertFile = require('./convert.js');
const fs = require('fs');
const path = require('path');
const processArgs = require('./args.js');
const logger = require('./logger.js');
const deleteFile = require('./delete.js');

const filesToDelete = [];

async function start() {
  let { inputPath, outputPath, format, quality, isAll, del, supportedExtensions, preview } = processArgs(process.argv)

  if (isAll) {
    const files = fs.readdirSync(process.cwd());

    const imageFiles = files.filter(file =>
      supportedExtensions.includes(path.extname(file).toLowerCase())
    );

    if (imageFiles.length === 0) {
      logger.info("No images found in this folder.");
      process.exit(0);
    }
    for (const file of imageFiles) {
      if (preview)
        logger.preview(`${del? '[DELETE]': ''} ${file} → ${format} [Quality = ${quality}]`);
      else {
        const success = await convertFile(file, null, quality, format);
        if (success) filesToDelete.push(file);
      }
    }
  }
  else {
    if (!inputPath) {
      logger.error("Please provide an input image path.");
      logger.error("Usage:");
      logger.error("  webpify input.jpg [output.webp]");
      logger.error("  webpify --all   # Convert all .jpg/.png/.jpeg images in this folder");
      process.exit(1);
    }

    if (preview)
      logger.preview(`${del? '[DELETE]': ''} ${inputPath} → ${outputPath || format} [Quality = ${quality}]`);
    else {
      const success = await convertFile(inputPath, outputPath, quality, format);
      if (success) filesToDelete.push(inputPath);
    }
  }
  if (del) {
    for (const file of filesToDelete)
      deleteFile(file);
  }
  console.log(`\n\nLogs are saved at ${logger.path}`);
  logger.space();
  console.log("Time required : " + process.uptime().toFixed(2) + " sec")
}
start();