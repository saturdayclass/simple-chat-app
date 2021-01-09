import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Chat = () => {
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const data = JSON.stringify(user);
  return (
    <div>
      <h1>Chat, {data}</h1>
      <Link to="/">
        <button>Go to home</button>
      </Link>
    </div>
  );
};

export default Chat;
