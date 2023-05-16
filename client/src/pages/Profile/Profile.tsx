import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom';


import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

const Profile = () => {
  
    return (     
       <div className="profile-container">
        <Header />
        <div className="pic-link">
        <Link className="pic-container" 
        to="/picture/me">
           <div className="profile-pic">
               <img className="image" src="" alt="user pic"></img>
             </div>
         </Link>
         </div>
        <div >
         This is the profile page
         </div>
         <div>
         <PostForm />
         <PostList />
         </div>
        </div>
   
    );
  };
  
  export default Profile;