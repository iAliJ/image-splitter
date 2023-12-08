const Splitter = require('../lib/splitter');

exports.splitter_uploadImage_post = (req, res) => {
    // upload image to the server, then give back the image unique id
    console.log(req.file);
    console.log('Uploading image to the server...');

    res.send('<h1>Upload done...</h1>');
}

exports.splitter_getMetaData_get = (req, res) => {
    Splitter.getMetaData(imageUrl); 
}