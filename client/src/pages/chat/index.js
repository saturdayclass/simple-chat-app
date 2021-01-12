import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';
import io from 'socket.io-client';
import Message from '../../components/Message';
let socket;

const Chat = () => {
  const BASE_URL = 'http://gabut-chat-app.herokuapp.com';
  const { roomId, roomName } = useParams();
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io(BASE_URL);
    if (user !== null) {
      socket.emit('join', {
        name: user.name,
        room_id: roomId,
        user_id: user.id,
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.emit('get-messages-history', roomId);
    socket.on('output-messages', (messages) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, roomId, () => {
        setMessage('');
      });
    }
  };

  const data = JSON.stringify(user);
  return (
    <div>
      <Navbar />
      <Message data={messages} userId={data.id} />
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
        <button>Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
