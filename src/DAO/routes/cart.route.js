const express = require('express');
const CartManager = require('../Mongo/CartManager.mongo');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Obtener todos los carritos
router.get('/', cartController.getAllCarts);

// Obtener un carrito por ID y renderizar la vista del carrito
router.get('/:cid', async (req, res) => {
    const cart = await CartManager.getCartById(req.params.cid);
    res.render('cart', { cart });
});

// Añadir un nuevo carrito
router.post('/', async (req, res) => {
    const cart = await CartManager.addCart();
    res.json(cart);
});

// Añadir un producto a un carrito
router.post('/:cid/products/:pid', async (req, res) => {
    const cart = await CartManager.addProductToCart(req.params.cid, req.params.pid);
    res.json(cart);
});

// Eliminar un producto de un carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cart = await CartManager.removeProductFromCart(req.params.cid, req.params.pid);
    res.json(cart);
});

// Actualizar la cantidad de un producto en un carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const cart = await CartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    res.json(cart);
});

// Eliminar todos los productos de un carrito
router.delete('/:cid', async (req, res) => {
    const cart = await CartManager.clearCart(req.params.cid);
    res.json(cart);
});

module.exports = router;
