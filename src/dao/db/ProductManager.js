const { EventEmitter } = require('events');
const Product = require('../models/Product');
const mongoose = require('mongoose');

class ProductManager extends EventEmitter {
  constructor() {
    super();
  }

  addProduct = async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    this.emit('productCreated', newProduct);
  }

  getProducts = async (query, limit, page, sort) => {
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: sort === 'desc' ? '-price' : 'price'
    };

    const searchQuery = {};
    if (query.category) {
      searchQuery.category = query.category;
    }
    if (query.available) {
      searchQuery.available = query.available;
    }

    const products = await Product.paginate(searchQuery, options);
    
    return {
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
      nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null,
    }
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
