const { imageUploadUtil } = require('../../helpers/cloudinary');
const Products = require('../../models/Products');

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    console.log(err, 'product-controller');
    res.json({
      success: false,
      message: 'error occurred',
    });
  }
};

// add New
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Products({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreatedProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product Added',
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred',
    });
  }
};

//get all products

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Products.find({});

    res.status(200).json({ success: true, data: listOfProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred',
    });
  }
};

//edit existing
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProducts = await Products.findById(id);

    if (!findProducts) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    findProducts.title = title || findProducts.title;
    findProducts.description =
      description === '' ? '' : description || findProducts.description;
    findProducts.category = category || findProducts.category;
    findProducts.brand = brand || findProducts.brand;
    findProducts.price = price === '' ? 0 : price || findProducts.price;
    findProducts.salePrice =
      salePrice === '' ? 0 : salePrice || findProducts.salePrice;
    findProducts.totalStock =
      totalStock === '' ? 0 : totalStock || findProducts.totalStock;
    findProducts.image = image || findProducts.image;

    await findProducts.save();

    res.status(200).json({
      success: true,
      data: findProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred',
    });
  }
};

//delete
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred',
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
