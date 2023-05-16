import React from 'react';
import './home.css';

import PostForm from '../../components/PostForm/PostForm';
import PostList from '../../components/PostList/PostList';
import Sidebar from '../../components/Sidebar/Sidebar';

const Home = () => {
  
    return (
      <main>
       <div>
        This is the home page

        <PostForm />
         <PostList />
         <Sidebar />
      </div>
      </main>
    );
  };
  
  export default Home;