#!/usr/bin/env node
const convertFile = require('./convert.js');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isAll = args.includes('-all');

let quality = 80;
let qualityArg = args.find(arg => arg.startsWith('-quality'));

if(qualityArg){
  const qualityValue = parseInt(qualityArg.split('=')[1]);
  if (!isNaN(qualityValue) && qualityValue >= 0 && qualityValue <= 100) {
    quality = qualityValue;
  }
  else {
    console.error("❌ Invalid quality value. Use 0–100.");
    process.exit(1);
  }
}

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
    convertFile(file, null,quality);
  });
}
else {
  const inputPath = args[0];
  const outputPath = args[1];
  if (!inputPath || inputPath.startsWith('-')) {
    console.error("❌ Please provide an input image path.");
    console.error("Usage:");
    console.error("  webpify input.jpg [output.webp]");
    console.error("  webpify --all   # Convert all .jpg/.png/.jpeg images in this folder");
    process.exit(1);
  }

  convertFile(inputPath, outputPath, quality);
}