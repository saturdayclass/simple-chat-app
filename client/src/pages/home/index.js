import React, { useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Navbar from '../../components/Navbar';
import RoomList from '../../components/RoomList';
let socket;

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const BASE_URL = 'localhost:7000';
  useEffect(() => {
    socket = io(BASE_URL);
    return () => {
      socket.emit('disconnet');
      socket.off();
    };
  }, [BASE_URL]);

  const data = JSON.stringify(user);
  const [room, setRoom] = useState('');
  const rooms = [
    {
      name: 'Room1',
      _id: '123',
    },
    {
      name: 'Room2',
      _id: '1234',
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

  const hendleSubmit = (e) => {
    e.preventDefault();
    socket.emit('create-room', room);
    console.log(room);
    setRoom('');
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col s12 m7">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">
                  Welcome, {user ? user.name : ''}
                </span>
                <div className="row">
                  <form className="col s12" onSubmit={hendleSubmit}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          placeholder="Enter a rooom name"
                          id="rooms"
                          type="text"
                          value={room}
                          onChange={(e) => setRoom(e.target.value)}
                          className="validate"
                        />
                        <label for="rooms">Rooms</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card-action">
                <Link to="/" onClick={setAsJohn}>
                  SET AS JHON
                </Link>
                <Link to="/" onClick={setAsKepo}>
                  SET AS KEPO
                </Link>
              </div>
            </div>
          </div>
          <div className="col s12 m5 offset-1">
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
