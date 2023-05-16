const express = require('express');
const http = require('http');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const productRoutes = require('../routes/productRoutes');
const cartRoutes = require('../routes/cartRoutes');
const socketManager = require('../utils/socketManager');

const app = express();
app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Rutas de productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Crear el servidor HTTP
const server = http.createServer(app);

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb+srv://lautarodubravka:I1hoszNfQu74N0e5@app-videogames.bmtnzim.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Inicializar el gestor de sockets
socketManager.initialize(server);

// Puerto de escucha
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
