const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/upload');
const router = express.Router();
const upload = multer({ dest: './public/data/uploads/' })

router.post('/', upload.single('image'), uploadController.splitter_uploadImage_post);

module.exports = router;