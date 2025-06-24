#!/usr/bin/env node
const convertFile = require('./convert.js');
const fs = require('fs');
const path = require('path');
const processArgs = require('./args.js');

let { inputPath, outputPath, format, quality, isAll }= processArgs(process.argv)

const supportedExtensions = ['.jpg', '.png', '.jpeg'];

if (isAll) {
  const files = fs.readdirSync(process.cwd());

  const imageFiles = files.filter(file =>
    supportedExtensions.includes(path.extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) {
    console.log("ℹ️ No images found in this folder.");
    process.exit(0);
  }
  imageFiles.forEach(file => {
    convertFile(file, null,quality, format);
  });
}
else {
  if (!inputPath) {
    console.error("❌ Please provide an input image path.");
    console.error("Usage:");
    console.error("  webpify input.jpg [output.webp]");
    console.error("  webpify --all   # Convert all .jpg/.png/.jpeg images in this folder");
    process.exit(1);
  }

  convertFile(inputPath, outputPath, quality, format);
}