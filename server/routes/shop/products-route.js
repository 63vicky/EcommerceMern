const express = require('express');

const {
  getFilteredProducts,
  productDetails,
} = require('../../controllers/shop/product-controller');

const router = express.Router();

router.get('/get', getFilteredProducts);
router.get('/get/:id', productDetails);

module.exports = router;
