const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 7000;
io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('create-room', (name) => {
    console.log(`The room recived is ${name}`);
  });
});

http.listen(PORT, () => {
  console.log(`Connection server listening on port ${PORT}`);
});
