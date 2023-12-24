// package the images in a zip
// require modules
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

// TODO... This should be moved into a relevant module
exports.archiveData = async (paths, archiveName) => {
    // create a file to stream archive data to.
    const output = fs.createWriteStream('./output/archive-' + archiveName + '.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });

    archive.on('error', function(err) {
      throw err;
    });
    
    archive.pipe(output);
    
    // add files to the archive
    paths.forEach(path => {
      archive.append(fs.createReadStream(path), { name: `${path}.png` });
    });
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    return await archive.finalize();
}

// send the zip file to the server to be downloaded
exports.downloadZipFile = (req, res, filePath) => {
  res.sendFile(filePath);
}