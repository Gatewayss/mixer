import React from 'react';
import './profile.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import PictureUpload from '../../components/PictureUpload/PictureUpload';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const Profile = () => {
  const { username: userParam }: any = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  
  
  if (Auth.loggedIn() 
  && Auth.getProfile().data.username === userParam
  ) {
     <Header/>
    return <Navigate to="/me" />;
  }

  if (loading) {
    <Header/>
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <div>
        <Header/>  
      <h4>
        You need to be logged in to see this. 
      </h4>
      </div>
    );
  }
  
    return (     
      <div className="profile-container">
        <div className="profile-header-container">
          <Header /> 
        </div>
        <div className="profile-navbar">
          <Navbar />
        </div>
        <div className="profile-pics-container">
        <div className="me-pic">
          {!userParam && (        
            <PictureUpload />
          )} 
        </div>
        <div className="user-pic">
            {userParam && (
              <div className="pic-container" >
                <div className="profile-pic">
                    <img className="image" src={user.profilePic} alt="user pic"></img>
                  </div>
              </div>
            )}
        </div>
        </div> 
      <div className="profile-post-container">

        <div className="profile-name">
          <h2 >
            Viewing {userParam ? `${user.username}'s` : 'your'} profile
          </h2>
        </div>

        {!userParam && (
        <div className="profile-postform-container">
          <PostForm />
        </div>
        )}

        <div className="profile-postlist-container">
          <PostList posts={user.posts} />
        </div>

      </div>
    </div>
  );
};
  
  export default Profile;