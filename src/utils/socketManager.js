const socketIO = require('socket.io');

const initialize = (server) => {
  const io = socketIO(server);

  // Manejar la conexión de un cliente
  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Manejar la desconexión de un cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};

module.exports = { initialize };
