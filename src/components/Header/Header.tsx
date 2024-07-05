import React from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="nav">
      <div className="container header-container">
        <NavLink to="/" className="navbar-brand">Quotes Central</NavLink>
        <ul className={'nav-list'}>
          <li className={'nav-item'}>
            <NavLink
              to="/quotes"
              className={'nav-link'}
            >
              Quotes
            </NavLink>
          </li>
          <li className={'nav-item'}>
            <NavLink
              to="/add-quote"
              className={'nav-link'}
            >
              Submit new quote
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;