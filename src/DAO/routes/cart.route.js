const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Obtener todos los carritos
router.get('/', cartController.getAllCarts);

// Obtener un carrito por ID y renderizar la vista del carrito
router.get('/:cid', cartController.getCartById);

// Añadir un nuevo carrito
router.post('/', cartController.createCart);

// Añadir un producto a un carrito
router.post('/:cid/products/:pid', cartController.addProductToCart);

// Eliminar un producto de un carrito
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);

// Actualizar la cantidad de un producto en un carrito
router.put('/:cid/products/:pid', cartController.updateProductQuantity);

// Eliminar todos los productos de un carrito
router.delete('/:cid', cartController.clearCart);

module.exports = router;
