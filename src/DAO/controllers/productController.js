const ProductManager = require('../Mongo/ProductManager.mongo');

const productManager = new ProductManager();

exports.createProduct = async (req, res) => {
  const product = await productManager.addProduct(req.body);
  res.json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await productManager.getProducts(req.query);
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await productManager.getProductById(req.params.id);
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await productManager.updateProduct(req.params.id, req.body);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await productManager.deleteProduct(req.params.id);
  res.json({ status: 'success' });
};
