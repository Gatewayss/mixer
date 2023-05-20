import React from 'react';
import './home.css';
import { useQuery } from '@apollo/client';
import Navbar from '../../components/Navbar/Navbar';
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
        <div className="home-header-container">
          <Header />  
        </div>  
        <div className="header-navbar">
       <Navbar />
      </div>     
        <div className="home-postform-header">
        <h2>
          <span className="mix">Mix</span ><span className="it">it</span>
          <span className="up">up</span><span className="dash">~</span> 
          Think Differently. Create Differently. Share.
        </h2>
      </div>
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
       
      </div>
    
    );
  };
  
  export default Home;