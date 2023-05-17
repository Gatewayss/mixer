import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.css"

import Auth from '../../utils/auth';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';


import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';


const Navbar = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
   const user = data?.me || data?.user || {};

  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Auth.logout();
  };
 
  return (
   
    <div className="navbar-container">
      {Auth.loggedIn() ? (
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
          onClick={logout}
          >Logout</button>
        </div>         
        
      </>
       ) : (
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
      )} 
    </div>

);
};
  
  export default Navbar;