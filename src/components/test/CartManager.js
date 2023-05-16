const fs = require('fs').promises;

class CartManager {
    constructor(path) {
        this.path = path;
    }

    readCarts = async () => {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (err) {
            return [];
        }
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8');
    }

    addCart = async () => {
        const carts = await this.readCarts();
        const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newCart = { id, products: [] };
        carts.push(newCart);
        await this.writeCarts(carts);
        return newCart;
    }

    getCartById = async (id) => {
        const carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }

    addProductToCart = async (cartId, productId) => {
        const carts = await this.readCarts();
        const cart = carts.find(cart => cart.id === cartId);
        if (cart) {
            const product = cart.products.find(product => product.product === productId);
            if (product) {
                product.quantity += 1;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }
            await this.writeCarts(carts);
            return cart;
        }
    }
}

module.exports = CartManager;
