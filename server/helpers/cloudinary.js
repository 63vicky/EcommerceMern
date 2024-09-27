const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'drto6utqx',
  api_key: '173929148887678',
  api_secret: 'YixFNq0kXMyiPvzWcQ1GFl8O_T4',
});

const storage = new multer.memoryStorage();

const imageUploadUtil = async (file) => {
  const result = cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });

  return result;
};

const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };
