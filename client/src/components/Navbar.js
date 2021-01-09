import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="green">
        <div className="container">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo right">
              ChatApp
            </Link>
            <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>

            <ul id="nav-mobile" className="left hide-on-med-and-down">
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/">SignUp</Link>
              </li>
              <li>
                <Link to="/">Chat</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/">SignUp</Link>
        </li>
        <li>
          <Link to="/">Chat</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
