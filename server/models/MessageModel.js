const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    name: {
      type: 'string',
      required: true,
    },
    user_id: {
      type: 'string',
      required: true,
    },
    text: {
      type: 'string',
      required: true,
    },
    room_id: {
      type: 'string',
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
