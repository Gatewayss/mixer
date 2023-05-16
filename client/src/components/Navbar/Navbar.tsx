import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
 
  return (
   
    <div className="navbar-container">
      {/* {Auth.loggedIn() ? ( */}
      <>
        <Link  to="/canvas">
          <div className="nav-link">
          Canvas
          </div>
      
        </Link>
        <Link  to="/challenge">
        <div className="nav-link">
          Challenge
          </div>
        </Link>
        <div className="header-logout">
          <button  
          // onClick={logout}
          >Logout</button>
        </div>         
        
      </>
      {/* ) : (
      <>
        <Link to="/login">
        <div >
          Login
          </div>
        </Link>
        <Link to="/signup">
        <div >
          Signup
          </div>
        </Link>
      </>
      )} */}
    </div>

);
};
  
  export default Navbar;