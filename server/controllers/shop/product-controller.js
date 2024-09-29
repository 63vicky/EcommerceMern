const Products = require('../../models/Products');

const getFilteredProducts = async (req, res) => {
  try {
    const { brand = [], category = [], sortBy = 'price-lowtohigh' } = req.query;

    let filters = {};

    if (category.length > 0) {
      filters.category = { $in: category.split(',') };
    }

    if (brand.length > 0) {
      filters.brand = { $in: brand.split(',') };
    }

    let sort = {};

    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1;
        break;

      case 'price-hightolow':
        sort.price = -1;
        break;
      case 'title-atoz':
        sort.title = 1;
        break;
      case 'title-ztoa':
        sort.title = -1;
        break;
      default:
        sort.price = 1;
        break;
    }

    const products = await Products.find(filters).sort(sort);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred',
    });
  }
};

module.exports = { getFilteredProducts };
