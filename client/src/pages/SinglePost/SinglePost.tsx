import React from 'react';
import './singlePost.css';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Header from '../../components/Header/Header';
import CommentList from '../../components/CommentList/CommentList';
import CommentForm from '../../components/CommentForm/CommentForm';

import { QUERY_SINGLE_POST } from '../../utils/queries';

const SinglePost = () => {

  const { postId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
  
    variables: { postId: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
    return (
     <div className='singlepost-container'>
        <div className='singlepost-header'>
          <Header />
        </div>

        <div className='singlepost-block'>

          <div className='singlepost-content'>  
            <div>

              <h3 className='singlepost-title'>
                {post.postAuthor} <br />
                <span >
                  had this thought on {post.createdAt}
                </span>
              </h3>   
            </div>       
           
            <div className="singlepost-text" >
              <blockquote>
                {post.postText}
              </blockquote>
            </div>
          </div>
        </div>

      <div className='singlepost-comment-container'>
        <div className="singlepost-commentlist">
          <CommentList comments={post.comments} />
        </div>        
        <div className='singlepost-commentform'>
          <CommentForm postId={post._id} />
        </div>
      </div>
     
    </div>
   
    );
  };
  
  export default SinglePost;