import React from 'react';
import './singlePost.css';

import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

const SinglePost = () => {
  
    return (
     
       <div>
         This is a single post
         <CommentList />
         <CommentForm />
        </div>
   
    );
  };
  
  export default SinglePost;