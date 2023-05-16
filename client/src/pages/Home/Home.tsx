import React from 'react';
import './home.css';

import Header from '../../components/Header/Header';
import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
// import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  
    return (    
       <div>
       <Header />
        This is the home page
        <PostForm />
        <PostList />
        {/* <Sidebar /> */}
      </div>
    
    );
  };
  
  export default Home;