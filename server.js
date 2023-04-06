const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const PORT = process.env.PORT || 3000;

let connections = 0;

io.on('connection', (socket) => {
  connections++;
  io.emit('activeUsers', connections);

  socket.on('disconnect', () => {
    connections--;
    io.emit('activeUsers', connections);
  });
});

server.listen(PORT, () => {
  console.log(`Socket.io server started on port ${PORT}`);
});