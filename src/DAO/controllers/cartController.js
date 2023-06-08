const CartManager = require('../Mongo/CartManager.mongo');
const cartManager = new CartManager();

exports.getAllCarts = async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json(carts);
};

exports.getCartById = async (req, res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json(cart);
};

exports.createCart = async (req, res) => {
    try {
        const newCart = await cartManager.addCart(req.body.userId);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.addProductToCart = async (req, res) => {
    const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid, req.body.quantity);
    res.json(cart);
};

exports.removeProductFromCart = async (req, res) => {
    const cart = await cartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json(cart);
};

exports.updateProductQuantity = async (req, res) => {
    const cart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    res.json(cart);
};

exports.clearCart = async (req, res) => {
    const cart = await cartManager.clearCart(req.params.cid);
    res.json(cart);
};

exports.closeCart = async (req, res) => {
    try {
        const closedCart = await cartManager.closeCart(req.params.cid);
        res.status(200).json(closedCart);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
