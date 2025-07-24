import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const getUploadMiddleware = (folderName) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpg", "png", "jpeg", "webp"],
    },
  });

  return multer({ storage });
};

export default getUploadMiddleware;
