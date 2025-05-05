import multer from 'multer';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
        const mimes = {
            "image/jpeg": ".jpeg",
            "image/jpg": ".jpg",
            "image/png": ".png"
        };
        cb(null, `${Date.now()}-${file.originalname}${mimes[file.mimetype]}`);

    }

});

const upload = multer({storage});
export default upload;