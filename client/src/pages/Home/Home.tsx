import React from 'react';
import './home.css';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
// import Sidebar from '../../components/Sidebar/Sidebar';

import { QUERY_POSTS } from '../../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
 
  const posts = data?.posts || [];
  
    return (    
       <div className="home-container">
        <Header />   
        <main >
        <div className="home-postform-container">
          <PostForm />
        </div>
        <div className="home-postlist-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}          
              
            />
          )}
        </div>
        {/* <Sidebar /> */}
      </main>
      </div>
    
    );
  };
  
  export default Home;