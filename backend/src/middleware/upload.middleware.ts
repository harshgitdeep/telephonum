import multer from "multer";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { UPLOAD_CONFIG } from "../config/upload.config";

// Create uploads directory if it doesn't exist
if (!fs.existsSync(UPLOAD_CONFIG.AUDIO_DIRECTORY)) {
  fs.mkdirSync(UPLOAD_CONFIG.AUDIO_DIRECTORY, {
    recursive: true,
  });
}

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, UPLOAD_CONFIG.AUDIO_DIRECTORY);
  },

  filename(req, file, cb) {
    const extension = path.extname(file.originalname);

    cb(null, `${randomUUID()}${extension}`);
  },
});

// File filter
const fileFilter: multer.Options["fileFilter"] = (
  req,
  file,
  cb
) => {
  if (
    UPLOAD_CONFIG.ALLOWED_AUDIO_TYPES.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed."));
  }
};

// Multer instance
const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: UPLOAD_CONFIG.MAX_AUDIO_SIZE,
  },
});

export default upload;