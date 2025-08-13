import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    // Save file with original name + timestamp
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;