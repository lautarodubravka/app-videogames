const { EventEmitter } = require('events');
const Product = require('../models/Product');

class ProductManager extends EventEmitter {
  constructor() {
    super();
  }

  addProduct = async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    this.emit('productCreated', newProduct);
  }

  getProducts = async () => {
    return await Product.find({});
  }

  getProductById = async (id) => {
    return await Product.findById(id);
  }

  updateProduct = async (id, updatedProduct) => {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    this.emit('productUpdated', product);
  }

  deleteProduct = async (id) => {
    await Product.findByIdAndDelete(id);
    this.emit('productDeleted', id);
  }
}

module.exports = ProductManager;