const Splitter = require('../lib/splitter');
const download = require('../lib/download');
const path = require('path');

exports.splitter_uploadImage_post = async (req, res) => {
    // upload image to the server, then give back the image unique id
    console.log(req.file.path);
    console.log('Uploading image to the server...');
    const x = req.body.xdim;
    const y = req.body.ydim;
    // Send the file to the splitter
    try {
        const images = await Splitter.splitImage(req.file.path, req.file.filename, x, y);
        await download.archiveData(images, req.file.filename);
        const rootPath = path.resolve(__dirname, '..', '..');
        const outputPath = path.join(rootPath, 'output');
        const filePath = path.join(outputPath,'archive-' + req.file.filename + '.zip');
        // I need help with this part, how to download the file
        res.setHeader('Content-type','application/zip');
        await res.send(filePath);
    }
    catch (err) {
        console.log(err);
    }
}

exports.splitter_DownloadZip_get = async (filePath, req, res) => {
    // send back the file to the server
    res.sendFile(filePath);
}

exports.splitter_getMetaData_get = (req, res) => {
    Splitter.getMetaData(imageUrl); 
}
