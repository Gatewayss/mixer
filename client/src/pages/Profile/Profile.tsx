import React from 'react';
import './profile.css';

import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

const Profile = () => {
  
    return (
     
       <div>
         This is the profile page
         <PostForm />
         <PostList />
         
        </div>
   
    );
  };
  
  export default Profile;