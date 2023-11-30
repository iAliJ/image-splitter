const sharp = require('sharp');

async function getMetaData(imagePath) {
    const metadata = await sharp(imagePath).metadata();
    return metadata;
}

async function splitImage(imagePath, nx, ny) {
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
    
    while(topOffset != height && leftOffset != width) {
        await sharp(imagePath)
        .extract(
            {
                left: leftOffset, top: topOffset, width: pixelX, height:pixelY
            }
        )
        .toFile(`./output/underwater-${count}.png`);        

        leftOffset += pixelX;
        // if we reach edge of the image, go to the next row
        if(leftOffset == width) {
            leftOffset = 0;
            topOffset += pixelY;
        }
        count++;
    }
}

module.exports = {
    splitImage,
}