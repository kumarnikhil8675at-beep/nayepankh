import multer from 'multer';
import path from 'path';

// Use memory storage so we get the buffer to upload to ImageKit
const storage = multer.memoryStorage();

// Since files can technically be images, videos, or PDFs, we won't strictly enforce mime types 
// globally here. We will just enforce file size limits or handle extensions naturally.
export const upload = multer({ 
    storage,
    limits: { fileSize: 500000000 } // approx 500mb limit for massive videos
});
