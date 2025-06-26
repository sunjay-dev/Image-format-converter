const logger  = require("./logger.js");

function processArgs() {
    const args = process.argv.slice(2);

    const isAll = args.includes('-all') || args.includes('-a');
    let quality = 80;
    let format = 'webp';
    let del = args.includes('-del') || args.includes('-delete');
    let preview = args.includes('-p') || args.includes('-preview') || args.includes('-pre');

    let supportedExtensions = ['.jpg', '.png', '.jpeg', '.avif', '.tiff'];

    if (args.includes('-help') ||  args.includes('-h')) {
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
            
            if(formatValue !== 'webp' && !supportedExtensions.includes('.webp')){
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

    return { inputPath, outputPath, format, quality, isAll, del, supportedExtensions, preview }
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
  -format=webp     Output format (webp, jpeg, png, avif, tiff)
  -ext=png         Convert only png files to desired format 
  -help            Show this help message
  -preview         show what will change 

Supported Formats:

Input: .jpg, .jpeg, .png, .webp, .tiff, .gif, .avif
Output: webp, jpeg, png, avif, tiff

Examples:
  imgify photo.jpg output.webp
  imgify -all -quality=70 -format=jpeg
`);
};

module.exports = processArgs;