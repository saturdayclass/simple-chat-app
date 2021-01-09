import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const data = JSON.stringify(user);
  const setAsKepo = () => {
    const kepo = {
      name: 'Kepo',
      email: 'kepo@dot.com',
      password: '123',
      id: '1',
    };
    setUser(kepo);
  };

  const setAsJohn = () => {
    const john = {
      name: 'John',
      email: 'john@mail.com',
      password: '123',
      id: 2,
    };

    setUser(john);
  };

  return (
    <div>
      <Navbar>
        <h1>Home, {data}</h1>
        <button onClick={setAsKepo}>Login as Kepo</button>
        <button onClick={setAsJohn}>Login as John</button>
        <Link to="/chat">
          <button>Go to chat</button>
        </Link>
      </Navbar>
    </div>
  );
};

export default Home;
