import path from "path";

export const UPLOAD_CONFIG = {
  AUDIO_DIRECTORY: path.join(process.cwd(), "uploads", "audio"),

  MAX_AUDIO_SIZE: 50 * 1024 * 1024, // 50 MB

  ALLOWED_AUDIO_TYPES: [
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/m4a",
    "audio/x-m4a",
    "audio/webm",
    "audio/ogg",
  ],
};