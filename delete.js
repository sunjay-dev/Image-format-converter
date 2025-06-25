const fs = require('fs');
const logger = require('./logger');

function deleteFile(inputPath) {
    try {
        fs.unlinkSync(inputPath);
        logger.warn(`Deleted original file: ${inputPath}`);
    } catch (err) {
        logger.error(`Failed to delete original file: ${inputPath}`, err.message);
    }
}
module.exports = deleteFile