const express = require('express');
const multer = require('multer');
const router = express.Router();

// Handle the file upload
const upload = multer({ dest: './public/data/uploads/' })
'/upload'
router.post('/', upload.single('image'),(req, res) => {
    // upload image to the server, then give back the image unique id
    console.log(req.file);
    console.log('Uploading image to the server...');

    res.send('<h1>Upload done...</h1>');
});

module.exports = router;