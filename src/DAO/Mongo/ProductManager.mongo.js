const { EventEmitter } = require('events');
const Product = require('../models/Product.model');

class ProductManager extends EventEmitter {
  constructor() {
    super();
  }

  addProduct = async (product) => {
    const newProduct = new Product(product);
    await newProduct.save();
    this.emit('productCreated', newProduct);
  }

  getProducts = async (query, limit, page, sortQuery) => {
    try {
        const products = await Product.find(query)
                                      .limit(limit)
                                      .skip((page - 1) * limit)
                                      .sort(sortQuery);

        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        return {
          status: 'success',
          payload: products,
          totalPages: totalPages,
          page: page,
          prevPage: hasPrevPage ? page - 1 : null,
          nextPage: hasNextPage ? page + 1 : null,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
          prevLink: hasPrevPage ? `/products?page=${page - 1}` : null,
          nextLink: hasNextPage ? `/products?page=${page + 1}` : null
        };
    } catch (err) {
        console.error(err);
        throw err;
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
