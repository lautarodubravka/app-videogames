const CartManager = require('../../dao/db/CartManager');
const cartManager = new CartManager();

exports.getAllCarts = async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json(carts);
};

exports.getCartById = async (req, res) => {
    const cart = await cartManager.getCartById(req.params.id);
    res.json(cart);
};

exports.createCart = async (req, res) => {
    await cartManager.addCart(req.body);
    res.status(201).send();
};

exports.updateCart = async (req, res) => {
    await cartManager.updateCart(req.params.id, req.body);
    res.status(200).send();
};

exports.deleteCart = async (req, res) => {
    await cartManager.deleteCart(req.params.id);
    res.status(200).send();
};
