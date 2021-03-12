const fs = require('fs');
const path = require('path');

const validTypes = ['jpg', 'jpeg', 'png'];

module.exports = (userfile, filename, callback) => {
    const extension = path.extname(userfile);
    isValidExt = validTypes.indexOf(extension.substring(1)) !== -1;

    if (!isValidExt) {
        const err = 'Unsupported file extension'
        console.error(err);

        return callback(err);
    }

    const assetsPath = `${__dirname}/../assets`;
    const filepath = `${assetsPath}/images/${filename}${extension}`;

    console.log('filepath', filepath);
    fs.createReadStream(userfile)
        .pipe(fs.createWriteStream(filepath))
        .on('finish', () => callback(undefined, filepath));
}
