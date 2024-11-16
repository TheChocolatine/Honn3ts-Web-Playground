const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve frontend

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('create-object', (data) => {
    socket.broadcast.emit('create-object', data); // Share with others
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
