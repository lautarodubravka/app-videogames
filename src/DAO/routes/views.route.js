const express = require('express');
const router = express.Router();
const ProductManager = require('../components/ProductManager');
const productManager = new ProductManager('../components/products.json');
const socketIo = require('socket.io');

router.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('index', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.json(products); // Enviar los productos como respuesta JSON al cliente
});

// Configurar websockets
router.initializeWebSocket = function (server) {
  const io = socketIo(server);

  // Manejar la conexión de un cliente
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Manejar la creación de un nuevo producto
    productManager.on('productCreated', (product) => {
      socket.emit('productCreated', product);
    });

    // Manejar la eliminación de un producto
    productManager.on('productDeleted', (productId) => {
      socket.emit('productDeleted', productId);
    });

    // Manejar la desconexión de un cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};
productManager.on('productCreated', (product) => {
  if (io) {
      io.emit('productCreated', product);
  }
});

productManager.on('productDeleted', (productId) => {
  if (io) {
      io.emit('productDeleted', productId);
  }
});

module.exports = router;
