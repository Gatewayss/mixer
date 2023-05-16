import React from 'react';
import './profile.css';

import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

const Profile = () => {
  
    return (     
       <div>
        <Header />
         This is the profile page
         <PostForm />
         <PostList />
         
        </div>
   
    );
  };
  
  export default Profile;