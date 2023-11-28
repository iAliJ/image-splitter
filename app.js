const sharp = require('sharp');

cropImage();

async function getMetaData() {
    const metadata = await sharp('./img/underwater.png').metadata();
    return metadata;
}

async function cropImage() {
    // Get the width and height of the image
    const metadata = await getMetaData();
    const width = metadata.width;
    const height = metadata.height;
    // we will split it in 2x2 for now
    const nx = 2;
    const ny = 2;
    const pixelX = width / nx;
    const pixelY = height / ny;
    // offset will increase by amount of pixels each iteration
    let topOffset = 0;
    let leftOffset = 0;
    let count = 0;

    while(topOffset != height && leftOffset != width) {
        await sharp('./img/underwater.png')
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