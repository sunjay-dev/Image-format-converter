function processArgs() {
    const args = process.argv.slice(2);

    const isAll = args.includes('-all');
    let quality = 80;
    let format = 'webp';
    let del = args.includes('-del') || false;


    let qualityArg = args.find(arg => arg.startsWith('-quality'));
    if (qualityArg) {
        const qualityValue = parseInt(qualityArg.split('=')[1]);
        if (!isNaN(qualityValue) && qualityValue >= 0 && qualityValue <= 100) {
            quality = qualityValue;
        }
        else {
            console.error("❌ Invalid quality value. Use 0–100.");
            process.exit(1);
        }
    }

    let formatArg = args.find(arg => arg.startsWith('-format'));
    if (formatArg) {
        let formatValue = formatArg.split('=')[1].toLowerCase();

        const validFormats = ['webp', 'avif', 'jpeg', 'png', 'tiff', 'heif'];

        if (validFormats.includes(formatValue)) {
            format = formatValue;
        }
        else if (formatValue === 'jpg') {
            console.error('❌ Sorry JPG not supported. Try JPEG instead.');
            process.exit(1);
        }
        else {
            console.error(`❌ Invalid format. Choose from: ${validFormats.join(', ')}`);
            process.exit(1);
        }
    }

    const positional = args.filter(arg => !arg.startsWith('-'));
    const inputPath = positional[0];
    const outputPath = positional[1];

    return { inputPath, outputPath, format, quality, isAll, del }
}

module.exports = processArgs;