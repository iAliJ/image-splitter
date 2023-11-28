const sharp = require('sharp');

cropImage();
async function getMetaData() {
    const metadata = await sharp('./img/underwater.png').metadata();
    console.log(metadata);
}
async function cropImage(height, width) {
    await sharp('./img/underwater.png')
    .extract(
        {
            left: 0, top: 0, width: 300, height:300
        }
    )
    .toFile('underwater-cropped.png');
}