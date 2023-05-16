import React from 'react';
import './singlePost.css';

import Header from '../../components/Header/Header';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';


const SinglePost = () => {
  
    return (
     <div className='singlepost-container'>
      <Header />
       <div >
        
         This is a single post
         <CommentList />
         <CommentForm />
        </div>
        </div>
   
    );
  };
  
  export default SinglePost;