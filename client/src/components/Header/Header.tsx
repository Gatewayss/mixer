import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintbrushPencil } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom';
import "./header.css"

import Auth from '../../utils/auth';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';


import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';


const Header = () => {

  const { loading, data } = useQuery(QUERY_ME);
   const user = data?.me || {};
  
  
  return (     
    <header className="header-container">
      <div>       
        <Link className="home-link" to="/">
          <h1 className="header-logo">                    
              <span className="m">M</span>
              <span className="i">I</span>
              <span className="header-icon"><FontAwesomeIcon icon={faPaintbrushPencil} flip="vertical" /></span>
              <span className="e">E</span>
              <span className="r">R</span>                   
            </h1>
        </Link> 
      </div>      
      
      <div className="header-profile-info">
          {Auth.loggedIn() ? (
          <>
           <Link className="header-pic-container" to="/me">   
              
              <div className="header-profile-pic">
                <img className="header-image" src={user.profilePic} alt="user pic"></img>
             </div>
           
            </Link>    
          </>
      ) : (
        <>
          <Link to="/login">
          <div className="header-login">
            Login
            </div>
          </Link>
          <Link to="/signup">
          <div className="header-signup">
            Signup
            </div>
          </Link>
        </>
        )} 
      </div>
    </header>
   
    );
  };
  
  export default Header;