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
    const pixelX = Math.floor(width / nx);
    const pixelY = Math.floor(height / ny);
    console.log(`image (W,H): (${width},${height})`);
    // There is loss of pixels because of the floor
    const lostPixelsX = width - (pixelX * nx);
    const lostPixelsY = height - (pixelY * ny);
    console.log(`lost pixels: (${lostPixelsX},${lostPixelsY})`);

    // offset will increase by amount of pixels each iteration
    let topOffset = 0;
    let leftOffset = 0;
    let count = 0;
    // output data
    let outputImagesPath = [];
    
    while(topOffset < height && leftOffset < width) {
        const imgPath = `./output/${imageName}-${count}.png`;
        outputImagesPath.push(imgPath);
        console.log(`left: ${leftOffset}, top: ${topOffset}, width: ${pixelX}, height:${pixelY}`)
        try{
            await sharp(imagePath)
            .extract(
                {
                    left: leftOffset, top: topOffset, width: pixelX, height:pixelY
                }
            )
            .toFile(imgPath);
        }
        catch(err){
            console.log("An error occurred:", err);
        }
        leftOffset += pixelX;
        // if we reach edge of the image, go to the next row
        console.log(`${leftOffset} >=? ${width}`)
        if(leftOffset + lostPixelsX >= width) {
            console.log(`reached max limit, moving to next line. X:${leftOffset}`);
            leftOffset = 0;
            topOffset += pixelY;
        }
        if(topOffset + lostPixelsY >= height){
            break;
        }
        
        count++;
    }

    return outputImagesPath;
}

module.exports = {
    splitImage,
    getMetaData
}