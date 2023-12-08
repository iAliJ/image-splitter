const Splitter = require('../lib/splitter');
const download = require('../lib/download');

exports.splitter_uploadImage_post = async (req, res) => {
    // upload image to the server, then give back the image unique id
    console.log(req.file.path);
    console.log('Uploading image to the server...');
    // Send the file to the splitter
    try {
        const images = await Splitter.splitImage(req.file.path, req.file.filename, 2, 2);
        download.archiveData(images, req.file.filename);
        console.log(images);
        res.send('<h1>Image splitted successfully</h1>');
    }
    catch (err) {
        console.log(err);
    }
}

exports.splitter_getMetaData_get = (req, res) => {
    Splitter.getMetaData(imageUrl); 
}
