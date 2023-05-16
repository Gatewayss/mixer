import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';


const Header = () => {
  
    return (     
      <header className="header-container">     
        <div className="header-logo">
          <Link  to="/">
            <h1 className="header-title">Mixer</h1>
          </Link>       
        </div>

      <div className="header-navbar">
        <Navbar />
      </div>

      <div className="header-profile">      
        <Link className="header-pic-container" to="/me">
          <div className="header-profile-pic">
            <img className="header-image" 
            src="https://res.cloudinary.com/dkm1hkwdl/image/upload/v1684264594/blank-profile-picture-gc25a26fa6_1280_copy_ve1thb.jpg" alt="user pic"></img>
          </div>
        </Link>         
      </div>
    </header>
   
    );
  };
  
  export default Header;