// package the images in a zip
// require modules
const fs = require('fs');
const archiver = require('archiver');

exports.archiveData = (paths, archiveName) => {
    // create a file to stream archive data to.
    const output = fs.createWriteStream('./output/' + archiveName + '.zip');
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    
    archive.pipe(output);
    
    // add files to the archive
    paths.forEach(path => {
        archive.append(fs.createReadStream(path), { name: `${path}.png` });
        
    });
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
}
// send the zip file to the server to be downloaded