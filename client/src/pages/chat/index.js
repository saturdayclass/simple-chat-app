import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';

const Chat = () => {
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const data = JSON.stringify(user);
  const { roomId, roomName } = useParams();
  return (
    <div>
      <Navbar />
      {(roomId, roomName)}
      <h1>Chat, {data}</h1>
      <Link to="/">
        <button>Go to home</button>
      </Link>
    </div>
  );
};

export default Chat;
