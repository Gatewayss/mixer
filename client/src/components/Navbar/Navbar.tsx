import React, { MouseEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
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
    // <Navigate to="/login"/>
  };
 
  return (
   
    <div className="navbar-container">
      {Auth.loggedIn() ? (
      <>
        <Link className="navbar-canvas" to="/canvas">
          <div className="nav-link">
          Canvas
          </div>
      
        </Link>
        <Link  className="navbar-challenge" to="/challenge">
        <div className="nav-link">
          Challenge
          </div>
        </Link>
        <div className="navbar-logout">
          <button className="navbar-logout-label" 
          onClick={logout}
          >Logout</button>
        </div>         
        
      </>
       ) : null }    
      
    </div>

);
};
  
  export default Navbar;