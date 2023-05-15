const express = require('express');
const productRoutes = require('../api/products');
const cartRoutes = require('../api/carts');

const app = express();
app.use(express.json());

const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Aquí definimos la ruta base para los productos y carritos.
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Incluir la configuración de websockets
const server = app.listen(8080, () => console.log('Server running on port 8080'));
const io = require('socket.io')(server);

// Inicializar websockets en el router de productos
productRoutes.initializeWebSocket(server);

// Manejar la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
