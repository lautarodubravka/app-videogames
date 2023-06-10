const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const path = require('path')
require('dotenv').config()
const exphbs = require('express-handlebars')
const productRoutes = require('./DAO/routes/product.route')
const cartRoutes = require('./DAO/routes/cart.route')
const messageRoutes = require('./DAO/routes/message.route')
const socketManager = require('./DAO/utils/socketManager')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use('/public/js', express.static(path.join(__dirname, 'public/js')));

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'DAO/views/layouts'),
  helpers: {
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
    },
    json: function(context) {
      return JSON.stringify(context)
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'DAO/views'))

//Manejo de sesión


// Rutas de productos y carritos
app.use('/products', productRoutes)
app.use('/carts', cartRoutes)
// Rutas del mensaje
app.use('/messages', messageRoutes)

// Servidor HTTP
const server = http.createServer(app)

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Inicializar el gestor de sockets
socketManager.initialize(server);

// Puerto
const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`)
});