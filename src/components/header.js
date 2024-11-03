// src/components/Header.js

import React from 'react';
import '../assets/css/components.css'
import { Link } from 'react-router-dom'; // if you're using React Router

const Header = () => {
  return (
    <header className="header">
      <h1><Link to="/">Gallery</Link></h1>
    </header>
  );
};

export default Header;
