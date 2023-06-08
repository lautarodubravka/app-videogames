const ProductManager = require('../Mongo/ProductManager.mongo');
const productManager = new ProductManager();

exports.createProduct = async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    let query;
    try {
      query = JSON.parse(req.query.query);
    } catch (error) {
      query = req.query.query || {};
    }
    const sort = req.query.sort;

    let sortQuery = {};
    if(sort === 'asc') {
        sortQuery = { price: 1 };
    } else if(sort === 'desc') {
        sortQuery = { price: -1 };
    }

    const products = await productManager.getProducts(query, limit, page, sortQuery);
    res.render('products', { products: products });
  } catch (err) {
    res.status(500).send({ message: 'An error occurred while retrieving products.' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    await productManager.updateProduct(req.params.id, req.body);
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.id);
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
