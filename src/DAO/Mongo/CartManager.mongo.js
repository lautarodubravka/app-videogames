const mongoose = require('mongoose');
const Cart = require('../models/Cart.model');

class CartManager {
  async getCarts() {
    return await Cart.find({});
  }

  async getCartById(id) {
    return await Cart.findById(id).populate('products.product');
  }

  async addCart(userId) {
    const newCart = new Cart({userId: userId});
    await newCart.save();
    return newCart;
}

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await Cart.findById(cartId);
    cart.products.push({ product: productId, quantity });
    await cart.save();
    return await cart.populate('products.product').execPopulate();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    cart.products = cart.products.filter(product => product.product.toString() !== productId);
    await cart.save();
    return await cart.populate('products.product').execPopulate();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    const product = cart.products.find(product => product.product.toString() === productId);
    product.quantity = quantity;
    await cart.save();
    return await cart.populate('products.product').execPopulate();
  }

  async clearCart(cartId) {
    const cart = await Cart.findById(cartId);
    cart.products = [];
    await cart.save();
    return cart;
  }
  
  async closeCart(cartId) {
    const cart = await Cart.findById(cartId);
    if (!cart.active) {
        throw new Error("El carrito ya está cerrado.");
    }
    cart.active = false;
    await cart.save();
    return cart;
}
}

module.exports = CartManager;
