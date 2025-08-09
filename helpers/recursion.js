const fs = require('fs');
const path = require('path');
const convertFile = require('./convert.js');
const files_changed = [];
const logger = require("./logger")
async function recursion(currentPath, supportedExtensions, preview, del, format, quality) {

    const list = fs.readdirSync(currentPath);

    for(let item of list) {
        const itemPath = path.join(currentPath, item);
        const stats = fs.statSync(itemPath)

        if (stats.isDirectory()) {
            if (item === 'node_modules' || item === '.git') return;
            await recursion(itemPath, supportedExtensions, preview, del, format, quality);
        } else if (stats.isFile()) {
            const imageFiles = supportedExtensions.includes(path.extname(itemPath).toLowerCase())
            if (imageFiles) {
                if (preview) logger.preview(`${del ? '[DELETE]' : ''} ${itemPath} → ${format} [Quality = ${quality}]`);

                else {
                    const success = await convertFile(itemPath, null, quality, format);
                    if (success) files_changed.push(itemPath);
                }
            }
        }
    };
    return files_changed;
}
module.exports = recursion;