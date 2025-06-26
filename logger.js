const path = require('path');
const fs = require('fs');

const logDir = path.join(require('os').homedir(), '.imgify');
const logFile = path.join(logDir, 'imgify.log');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

function writeToFile(tag, ...messages) {
    const timestamp = new Date().toISOString();
    const line = `[${timestamp}] [${tag}] ${messages.join(' ')}\n`;
    fs.appendFileSync(logFile, line);
}

const logger = {
    log: (...messages) => {
        console.log("\x1b[32m[LOG]\x1b[0m", ...messages)
        writeToFile('LOG', ...messages)
    },
    error: (...messages) => {
        console.error("\x1b[31m[ERROR]\x1b[0m", ...messages);
        writeToFile('ERROR', ...messages);
    },
    delete: (...messages) => {
        console.log("\x1b[31m[DELETE]\x1b[0m", ...messages);
        writeToFile('DELETE', ...messages);
    },
    warn: (...messages) => {
        console.warn("\x1b[33m[WARN]\x1b[0m", ...messages);
        writeToFile('WARN', ...messages);
    },
    info: (...messages) => {
        console.info("\x1b[34m[INFO]\x1b[0m", ...messages);
        writeToFile('INFO', ...messages);
    },
    space: () =>  fs.appendFileSync(logFile, '\n'),
    path: logFile
};

module.exports = logger;