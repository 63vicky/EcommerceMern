const express = require('express');

const {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} = require('../../controllers/admin/product-controller');
const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.get('/get', fetchAllProducts);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
