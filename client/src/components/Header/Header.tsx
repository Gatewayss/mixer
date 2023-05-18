import React, { MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintbrushPencil } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom';
import "./header.css"
import Navbar from '../../components/Navbar/Navbar';

import Auth from '../../utils/auth';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';


import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';


const Header = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
   const user = data?.me || data?.user || {};
 
  

  // const logout = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   Auth.logout();
  // };
  
    return (     
    //   <header className="header-container">     
    //     <div className="header-logo">
    //       <Link  to="/">
    //         <h1 className="header-title">Mixer</h1>
    //       </Link>       
    //     </div>

    //   <div className="header-navbar">
    //     <Navbar />
    //   </div>

    //   <div className="header-profile">   
    //   {Auth.loggedIn() ? (
    //       <>   
    //     <Link className="header-pic-container" to="/me">
    //       <div className="header-profile-pic">
    //         <img className="header-image" 
    //         src={user.profilePic} alt="user pic"></img>
    //       </div>
    //     </Link>   
    //     </>
    //       ) : null }      
    //   </div>
    // </header>

    <header className="main-header">
      <div className="header-container">       
        <Link className="home-link" to="/">
          <h1 className="header-logo">                    
              <span className="m">m</span>
              <span className="i">i</span>
              <span className="header-icon"><FontAwesomeIcon icon={faPaintbrushPencil} flip="vertical" /></span>
              <span className="e">e</span>
              <span className="r">r</span>                   
            </h1>
        </Link>       
        <div className="header-navbar">
       <Navbar />
      </div> 
        <div className="header-profile-info">
      {Auth.loggedIn() ? (
          <>
           <Link className="header-pic-container" to="/me">       
           
            <div className="header-profile-pic">
              <img className="header-image" src={user.profilePic} alt="user pic"></img>
             </div>
       </Link>
       {/* <div>
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
            </div> */}
          </>
               ) : null }      
      </div>
      </div>
    </header>
   
    );
  };
  
  export default Header;