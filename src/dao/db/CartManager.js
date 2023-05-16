const Cart = require('../models/Cart');

class CartManager {
    async getCarts() {
        return await Cart.find({});
    }

    async getCartById(id) {
        return await Cart.findById(id);
    }

    async addCart(cart) {
        const newCart = new Cart(cart);
        await newCart.save();
    }

    async updateCart(id, updatedCart) {
        await Cart.findByIdAndUpdate(id, updatedCart);
    }

    async deleteCart(id) {
        await Cart.findByIdAndDelete(id);
    }
}

module.exports = CartManager;
