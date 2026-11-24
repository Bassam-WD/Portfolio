const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const allowedTypes = {
    profileImage: ["image/jpeg", "image/png", "image/webp"],
    cvFile: ["application/pdf"],
    coverImage: ["image/jpeg", "image/png", "image/webp"],
};


const fileFilter = (req, file, cb) => {
    if (allowedTypes[file.fieldname]?.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type for ${file.fieldname}`));
    }
};


module.exports = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });