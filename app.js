const express = require('express');
const http = require('http');
require('dotenv').config();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const productRoutes = require('./src/DAO/routes/product.route');
const cartRoutes = require('./src/DAO/routes/cart.route');
const messageRoutes = require('./src/DAO/routes/message.route'); 
const socketManager = require('./src/DAO/utils/socketManager');

const app = express();
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Rutas de productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
// Rutas del mensaje
app.use('/messages', messageRoutes);

// Servidor HTTP
const server = http.createServer(app);

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Inicializar el gestor de sockets
socketManager.initialize(server);

// Puerto
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
