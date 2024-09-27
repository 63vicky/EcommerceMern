export const registerFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter Your User Name',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Your Password',
    componentType: 'input',
    type: 'password',
  },
];

export const LoginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter Your Email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter Your Password',
    componentType: 'input',
    type: 'password',
  },
];

export const addProductFormControls = [
  {
    name: 'title',
    label: 'Title',
    placeholder: 'Enter Product Title',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Enter Product Description',
    componentType: 'textarea',
  },
  {
    name: 'category',
    label: 'Category',
    // placeholder: 'Select Product Category',
    componentType: 'select',
    options: [
      { id: 'men', label: 'Men' },
      { id: 'women', label: 'Women' },
      { id: 'kids', label: 'Kids' },
      { id: 'accessories', label: 'Accessories' },
      { id: 'footwear', label: 'Footwear' },
    ],
  },
  {
    name: 'brand',
    label: 'Brand',
    // placeholder: 'Select Product Brand',
    componentType: 'select',
    options: [
      { id: 'nike', label: 'Nike' },
      { id: 'puma', label: 'Puma' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'levi', label: "Levi's" },
      { id: 'zara', label: 'Zara' },
      { id: 'h&m', label: 'H&M' },
    ],
  },
  {
    name: 'price',
    label: 'Price',
    placeholder: 'Enter Product Price',
    componentType: 'input',
    type: 'number',
  },
  {
    name: 'salePrice',
    label: 'Sale Price',
    placeholder: 'Enter Sale Price(optional)',
    componentType: 'input',
    type: 'number',
  },
  {
    name: 'totalStock',
    label: 'Total Stock',
    placeholder: 'Enter Total Stock',
    componentType: 'input',
    type: 'number',
  },
];

export const categoryOptionsMap = {
  men: 'Men',
  women: 'Women',
  kids: 'Kids',
  accessories: 'Accessories',
  footwear: 'Footwear',
};

export const brandOptionsMap = {
  nike: 'Nike',
  puma: 'Puma',
  adidas: 'Adidas',
  levi: "Levi's",
  zara: 'Zara',
  'h&m': 'H&M',
};

export const filterOptions = {
  category: [
    { id: 'men', label: 'Men' },
    { id: 'women', label: 'Women' },
    { id: 'kids', label: 'Kids' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'footwear', label: 'Footwear' },
  ],
  brand: [
    { id: 'nike', label: 'Nike' },
    { id: 'puma', label: 'Puma' },
    { id: 'adidas', label: 'Adidas' },
    { id: 'levi', label: "Levi's" },
    { id: 'zara', label: 'Zara' },
    { id: 'h&m', label: 'H&M' },
  ],
};

export const sortOptions = [
  { id: 'price-lowtohigh', label: 'Price: Low to High' },
  { id: 'price-hightolow', label: 'Price: High to Low' },
  { id: 'title-atoz', label: 'Title: A to Z' },
  { id: 'title-ztoa', label: 'Title: Z to A' },
];
