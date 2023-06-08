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

exports.getAllProducts = async (req, res) => {
  const { limit, page, query, sort } = req.query;
  try {
    const products = await productManager.getProducts(query, limit, page, sort);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
