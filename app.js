const express = require('express');
const cookieParser = require('cookie-parser')
const http = require('http');
const path = require('path');
require('dotenv').config();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const productRoutes = require('./src/DAO/routes/product.route');
const cartRoutes = require('./src/DAO/routes/cart.route');
const messageRoutes = require('./src/DAO/routes/message.route'); 
const socketManager = require('./src/DAO/utils/socketManager');
const userRoutes = require('./src/DAO/routes/user.route');
const Product = require('./src/DAO/models/Product.model');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/', userRoutes);

//cookies
app.use(cookieParser())

const hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'DAO', 'views'));

//Manejo de sesión

const secret = crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación!');
});

// Rutas de productos y carritos
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
// Rutas del mensaje
app.use('/messages', messageRoutes);

app.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.render('products', { user: req.session.user, products });
});

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
