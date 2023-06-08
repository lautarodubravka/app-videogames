const express = require('express');
const router = express.Router();
const ProductManager = require('../Mongo/ProductManager.mongo');
const productManager = new ProductManager();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    const { limit, page, query, sort } = req.query;
    try {
        const products = await productManager.getProducts({ limit, page, query, sort });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para obtener un producto por ID
router.get('/:pid', async (req, res) => {
    const product = await productManager.getProductById(req.params.pid);
    res.json(product);
});

// Ruta para agregar un nuevo producto
router.post('/', async (req, res) => {
    await productManager.addProduct(req.body);
    res.sendStatus(200);
});

// Ruta para actualizar un producto por ID
router.put('/:pid', async (req, res) => {
    await productManager.updateProduct(req.params.pid, req.body);
    res.sendStatus(200);
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
    await productManager.deleteProduct(req.params.pid);
    res.sendStatus(200);
});

module.exports = router;
