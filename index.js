const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { addUser, getUser, removeUser } = require('./helper');
const Room = require('./models/RoomModel');
const Message = require('./models/MessageModel');
dotenv.config({ path: '.env' });

io.on('connection', (socket) => {
  Room.find()
    .then((result) => {
      socket.emit('output-rooms', result);
    })
    .catch((err) => console.log(err));

  socket.on('create-room', (name) => {
    const room = new Room({ name });
    room
      .save()
      .then((result) => {
        io.emit('room-created', result);
      })
      .catch((err) => console.log(err));
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

    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    const msg = new Message(msgToStore);
    msg
      .save()
      .then((result) => {
        io.to(room_id).emit('message', result);
        callback();
      })
      .catch((err) => console.log(err));
  });

  socket.on('get-messages-history', (room_id) => {
    Message.find({ room_id })
      .then((result) => {
        socket.emit('output-messages', result);
      })
      .catch((err) => console.log(err));
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

http.listen(process.env.PORT, () => {
  console.log(`Connection server listening on port ${process.env.PORT}`);
});
