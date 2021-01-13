import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';
import io from 'socket.io-client';
import Message from '../../components/Message';
let socket: any;

interface IMessage {
  name: String;
  user_id: String;
  text: String;
  room_id: String;
}

const Chat = () => {
  // eslint-disable-next-line
  const { roomId, roomName } = useParams<any>();
  // eslint-disable-next-line
  const { user, setUser } = useContext<null | any | string>(UserContext);
  const [message, setMessage] = useState<any>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
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
    socket.on('output-messages', (messages: any) => {
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message: any) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, roomId, () => {
        setMessage('');
      });
    }
  };

  const data: any = JSON.stringify(user);
  console.log(data);
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
