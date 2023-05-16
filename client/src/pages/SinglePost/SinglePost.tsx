import React from 'react';
import './singlePost.css';

import Header from '../../components/Header/Header';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';


const SinglePost = () => {
  
    return (
     
       <div>
        <Header />
         This is a single post
         <CommentList />
         <CommentForm />
        </div>
   
    );
  };
  
  export default SinglePost;