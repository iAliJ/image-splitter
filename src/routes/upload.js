const express = require('express');
const router = express.Router();

'/upload'
router.get('/', (req, res) => {
    // Show the upoad page
    console.log('Uploading image to the server...');
    res.render('upload');
});

module.exports = router;