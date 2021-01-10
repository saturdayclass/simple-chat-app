const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 7000;
const { addUser, getUser, removeUser } = require('./helper');
io.on('connection', (socket) => {
  socket.on('create-room', (name) => {
    console.log(`The room recived is ${name}`);
  });

  socket.on('join', ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });

    socket.join(room_id);

    if (error) {
      console.log('join error', error);
    } else {
      console.log('join success', user);
    }
  });

  socket.on('sendMessage', (message, room_id, callback) => {
    const user = getUser(socket.id);
    console.log(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log(msgToStore);
    io.to(room_id).emit('message', msgToStore);
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
  });
});

http.listen(PORT, () => {
  console.log(`Connection server listening on port ${PORT}`);
});
