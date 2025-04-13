
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const generateQRCode = async (data, outputFilePath) => {
    try {
        const directory = path.dirname(outputFilePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, {recursive: true});
        }

        // Generate and save the QR code to the specified file path
        await QRCode.toFile(outputFilePath, data);
        return `/uploads/qrCodes/${path.basename(outputFilePath)}`; // Return the relative URL
    } catch (error) {
        throw new Error(`Error generating QR Code: ${error.message}`);
    }
};

module.exports = generateQRCode;
