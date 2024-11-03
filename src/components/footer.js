// src/components/Footer.js

import React from 'react';
import '../assets/css/components.css'
import homeBtn from '../assets/img/homebtn.png';
import addBtn from '../assets/img/addbtn.png';
import settingBtn from '../assets/img/settingbtn.png';

const Footer = ({ onFileUploadClick, onSettingsClick }) => {
  return (
    <footer className="navbar">
      <button onClick={() => window.location.href = '/'}>
        <img className="homebtn" src={homeBtn} alt="Home" />
      </button>
      <div onClick={onFileUploadClick}>
        <img className="addbtn" src={addBtn} alt="Upload" />
      </div>
      <button onClick={onSettingsClick}>
        <img className="settingbtn" src={settingBtn} alt="Settings" />
      </button>
    </footer>
  );
};

export default Footer;
