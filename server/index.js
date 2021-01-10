const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { addUser, getUser, removeUser } = require('./helper');
const Room = require('./models/RoomModel');
dotenv.config({ path: '.env' });

io.on('connection', (socket) => {
  socket.on('create-room', (name) => {
    console.log(`The room recived is ${name}`);
    const room = new Room({ name });
    room.save().then((result) => {
      io.emit('room-created', result);
    });
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

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log('Connected DB sucessfully');
  })
  .catch(function (err) {
    console.log(err);
  });

http.listen(process.env.PORT, () => {
  console.log(`Connection server listening on port ${process.env.PORT}`);
});
