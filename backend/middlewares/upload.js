import multer from 'multer';

const getUploadMiddleware = () => {
  return multer({ storage: multer.memoryStorage() });
};

export default getUploadMiddleware;
