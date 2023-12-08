const sharp = require('sharp');

async function getMetaData(imagePath) {
    const metadata = await sharp(imagePath).metadata();
    return metadata;
}

async function splitImage(imagePath, imageName, nx, ny) {
    // Get the width and height of the image
    const metadata = await getMetaData(imagePath);
    const width = metadata.width;
    const height = metadata.height;
    const pixelX = width / nx;
    const pixelY = height / ny;
    // offset will increase by amount of pixels each iteration
    let topOffset = 0;
    let leftOffset = 0;
    let count = 0;
    // output data
    let outputImagesPath = [];
    
    while(topOffset != height && leftOffset != width) {
        const imgPath = `./output/${imageName}-${count}.png`;
        outputImagesPath.push(imgPath);
        await sharp(imagePath)
        .extract(
            {
                left: leftOffset, top: topOffset, width: pixelX, height:pixelY
            }
        )
        .toFile(imgPath);      

        leftOffset += pixelX;
        // if we reach edge of the image, go to the next row
        if(leftOffset == width) {
            leftOffset = 0;
            topOffset += pixelY;
        }
        count++;
    }

    return outputImagesPath;
}

module.exports = {
    splitImage,
    getMetaData
}