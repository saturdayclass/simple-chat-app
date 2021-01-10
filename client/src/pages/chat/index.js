import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';
import io from 'socket.io-client';
let socket;

const Chat = () => {
  const BASE_URL = 'localhost:7000';
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
    socket.on('message', (message) => {
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
      {(roomId, roomName)}
      <h1>Chat, {data}</h1>
      <pre>{JSON.stringify(messages, null, '\t')}</pre>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) =>
            e.key === 'Enter' ? sendMessage(e.target.value) : null
          }
        />
        <button>Send Message</button>
      </form>
    </div>
  );
};

export default Chat;
