// upload.js (or upload.ts)
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const { name, ext } = path.parse(file.originalname); // e.g. { name: "Advance_Prep_Backend", ext: ".pdf" }

    return {
      folder: "study-materials",
      resource_type: "raw",   // required for PDFs
      public_id: name,        // Advance_Prep_Backend
      format: ext.replace('.', ''), // pdf
      overwrite: true,
      flags: "attachment"
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;