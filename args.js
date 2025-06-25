const logger  = require("./logger.js");

function processArgs() {
    const args = process.argv.slice(2);

    const isAll = args.includes('-all');
    let quality = 80;
    let format = 'webp';
    let del = args.includes('-del') || args.includes('--delete');
    let dry = args.includes('-dry') || args.includes('--dry');

    let supportedExtensions = ['.jpg', '.png', '.jpeg', '.avif', '.tiff', '.heif'];

    if (args.includes('-help') || args.includes('--help')) {
        showHelp();
        process.exit(0);
    }

    let supportedExtArg = args.find(arg => arg.startsWith('-ext'));
    if (supportedExtArg) {
        const supportedExtValue = supportedExtArg.split('=')[1];
        const validExts = ['jpg', 'jpeg', 'png', 'webp'];

        if (validExts.includes(supportedExtValue)) {
            supportedExtensions = ['.' + supportedExtValue]
        }
        else {
            logger.error(`Invalid extension. Use: ${validExts.join(', ')}`);
            process.exit(1);
        }
    }


    let qualityArg = args.find(arg => arg.startsWith('-quality'));
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

    let formatArg = args.find(arg => arg.startsWith('-format'));
    if (formatArg) {
        let formatValue = formatArg.split('=')[1].toLowerCase();

        const validFormats = ['webp', 'avif', 'jpeg', 'png', 'tiff', 'heif'];

        if (validFormats.includes(formatValue)) {
            format = formatValue;
            
            if(formatValue !== 'webp' && !supportedExtensions.includes('.webp')){
                supportedExtensions.push('.webp');
                supportedExtensions = supportedExtensions.filter(ext => ext !== `.${formatValue}`);
            }
        }
        else if (formatValue === 'jpg') {
            logger.error('Sorry JPG not supported. Try JPEG instead.');
            process.exit(1);
        }
        else {
            logger.error(`Invalid format. Choose from: ${validFormats.join(', ')}`);
            process.exit(1);
        }
    }

    const positional = args.filter(arg => !arg.startsWith('-'));
    const inputPath = positional[0];
    const outputPath = positional[1];

    return { inputPath, outputPath, format, quality, isAll, del, supportedExtensions, dry }
}



const showHelp = () => {
    logger.log(`
[INFO] Imgify - Image Converter CLI

Usage:
  imgify input.jpg [output.webp]
  imgify -all [-format=webp] [-quality=80]
  imgify -help

Options:
  -all             Convert all .jpg/.jpeg/.png in the current folder
  -quality=80      Set output quality (0–100). Default: 80
  -format=webp     Output format (webp, jpeg, png, avif, tiff, heif)
  -ext=png         Convert only png files to desired format 
  -help, --help    Show this help message

Examples:
  imgify photo.jpg output.webp
  imgify -all -quality=70 -format=jpeg
`);
};

module.exports = processArgs;