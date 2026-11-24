
const fs = require('fs');
const path = require('path');

const toFileData = (file) => ({
    name: file.originalname,
    size: file.size,
    url: `/uploads/${file.filename}`,
});



// remove File from Upload Function
function removeFile(file) {
    if (!file?.url) return;
    const filePath = path.join(__dirname, '..', 'uploads', path.basename(file.url));
    fs.unlink(filePath, (err) => {
        if (err) console.log('Could not delete file:', err.message);
    });

}


module.exports = { toFileData, removeFile }