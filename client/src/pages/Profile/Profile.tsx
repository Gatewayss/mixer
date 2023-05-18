import React from 'react';
import './profile.css';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';
import { Link } from 'react-router-dom';

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
    //  <Header/>
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
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
      </div>
    );
  }
  
    return (     
      <div className="profile-container">
        <div className="profile-header-container">
          <Header /> 
        </div>
         
        <div className="pic-link">
          {!userParam && (
            <Link className="pic-container" to="/picture/me">
            <div className="profile-pic">
                <img className="image" src={user.profilePic} alt="user pic"></img>
              </div>
            </Link>
          )} 
        </div>
        <div className="pic-link">
            {userParam && (
              <div className="pic-container" >
                <div className="profile-pic">
                    <img className="image" src={user.profilePic} alt="user pic"></img>
                  </div>
              </div>
            )}
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