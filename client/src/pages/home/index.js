import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';
import RoomList from '../../components/RoomList';

const Home = () => {
  const { user, setUser } = useContext(UserContext);

  const data = JSON.stringify(user);
  const rooms = [
    {
      name: 'Room1',
      id: '123',
    },
    {
      name: 'Room2',
      id: '1234',
    },
  ];

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
      <Navbar />
      <div class="container">
        <div class="row">
          <div class="col s12 m7">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
                <span class="card-title">Welcome, {user ? user.name : ''}</span>
                <div class="row">
                  <form class="col s12">
                    <div class="row">
                      <div class="input-field col s12">
                        <input
                          placeholder="Enter a rooom name"
                          id="rooms"
                          type="text"
                          class="validate"
                        />
                        <label for="rooms">Rooms</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="card-action">
                <Link to="/" onClick={setAsJohn}>
                  SET AS JHON
                </Link>
                <Link to="/" onClick={setAsKepo}>
                  SET AS KEPO
                </Link>
              </div>
            </div>
          </div>
          <div class="col s12 m5 offset-1">
            <RoomList rooms={rooms} />
          </div>
        </div>
        <h1>Home, {data}</h1>
        <button onClick={setAsKepo}>Login as Kepo</button>
        <button onClick={setAsJohn}>Login as John</button>
        <Link to="/chat">
          <button>Go to chat</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
