const logger = require("./logger.js");

function processArgs() {
    const args = process.argv.slice(2);

    const isSubDir = args.includes('-subdir') || args.includes('-sd') || args.includes('-s');
    const isAll = args.includes('-all') || args.includes('-a');
    let quality = 80;
    let format = 'webp';
    let del = args.includes('-del') || args.includes('-delete');
    let preview = args.includes('-p') || args.includes('-preview') || args.includes('-pre');

    let supportedExtensions = ['.jpg', '.png', '.jpeg', '.avif', '.tiff', '.gif'];

    if (args.includes('-help') || args.includes('-h')) {
        showHelp();
        process.exit(0);
    }

    //output extensions
    let formatArg = args.find(arg => arg.startsWith('-format=') || arg.startsWith('-f='));
    if (formatArg) {
        let formatValue = formatArg.split('=')[1].toLowerCase();

        const validFormats = ['webp', 'avif', 'jpeg', 'png', 'tiff'];

        if (validFormats.includes(formatValue)) {
            format = formatValue;

            if (formatValue !== 'webp' && !supportedExtensions.includes('.webp')) {
                supportedExtensions.push('.webp');
                supportedExtensions = supportedExtensions.filter(ext => ext !== `.${formatValue}`);
            }
        }
        else if (formatValue === 'jpg') {
            logger.error('Sorry JPG not supported. Try JPEG instead.');
            process.exit(1);
        }
        else if (formatValue === 'gif') {
            logger.error('Sorry, GIF creation is not supported right now, but it can be converted to PNG/JPEG/WEBP/AVIF/TIFF.');
            process.exit(1);
        }
        else {
            logger.error(`Invalid format. Choose from: ${validFormats.join(', ')}`);
            process.exit(1);
        }
    }

    // input extensions
    let supportedExtArg = args.find(arg => arg.startsWith('-ext') || arg.startsWith('-e'));
    if (supportedExtArg) {
        const supportedExtValue = supportedExtArg.split('=')[1];
        const validExts = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'tiff', 'gif'];

        if (validExts.includes(supportedExtValue)) {
            supportedExtensions = ['.' + supportedExtValue]
        }
        else {
            logger.error(`Invalid extension. Use: ${validExts.join(', ')}`);
            process.exit(1);
        }
    }


    let qualityArg = args.find(arg => arg.startsWith('-quality=') || arg.startsWith('-q='));
    if (qualityArg) {
        const qualityValue = parseInt(qualityArg.split('=')[1]);
        if (!isNaN(qualityValue) && qualityValue >= 0 && qualityValue <= 100) {
            quality = qualityValue;
        }
        else {
            logger.error("Invalid quality value. Use 0–100.");
            process.exit(1);
        }
    }

    const positional = args.filter(arg => !arg.startsWith('-'));
    const inputPath = positional[0];
    const outputPath = positional[1];

    return { inputPath, outputPath, format, quality, isAll, isSubDir, del, supportedExtensions, preview }
}



const showHelp = () => {
    console.warn("\x1b[33m", "[INFO] imgify-cli - Image Converter CLI", "\x1b[0m")
  console.log("\x1b[36m",`
    Usage:
        imgify-cli input.jpg [output.webp]
        imgify-cli -all [-format=webp] [-quality=80]
        imgify-cli -help

    Options:`, "\x1b[0m");

  console.table([
    { Option: '-subdir',       Description: 'Convert all .jpg/.jpeg/.png in child folders too' },
    { Option: '-all',          Description: 'Convert all .jpg/.jpeg/.png in the current folder' },
    { Option: '-quality=80',   Description: 'Set output quality (0–100). Default: 80' },
    { Option: '-format=webp',  Description: 'Output format (webp, jpeg, png, avif, tiff)' },
    { Option: '-ext=png',      Description: 'Convert only PNG files to desired format' },
    { Option: '-help',         Description: 'Show this help message' },
    { Option: '-preview',      Description: 'Show what will change without making changes' }
  ]);

  console.log("\x1b[36m",`
    Supported Formats:
        Input: .jpg, .jpeg, .png, .webp, .tiff, .gif, .avif
        Output: webp, jpeg, png, avif, tiff

    Examples:
        imgify-cli photo.jpg output.webp
        imgify-cli -all -quality=70 -format=jpeg
        imgify-cli -s -f=webp -d -e=png
`, "\x1b[0m");
};


module.exports = processArgs;