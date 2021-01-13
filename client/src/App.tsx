import React, { useState } from 'react';
import * as dotenv from 'dotenv';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './UserContext';
import './App.css';
import Chat from './pages/chat';
import Home from './pages/home';
dotenv.config();

const App: React.FC = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/chat/:roomId/:roomName" component={Chat} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
