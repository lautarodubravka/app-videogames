const express = require('express');
const CartManager = require('../dao/db/CartManager');
const router = express.Router();

router.post('/', async (req, res) => {
    const cart = await cartManager.addCart();
    res.json(cart);
});

router.get('/:cid', async (req, res) => {
    const cart = await cartManager.getCartById(Number(req.params.cid));
    res.json(cart);
});

router.post('/:cid/products/:pid', async (req, res) => {
    const cart = await cartManager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
    res.json(cart);
});

module.exports = router;
