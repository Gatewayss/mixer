import React, {FunctionComponent, MouseEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import { useQuery} from '@apollo/client';
import { QUERY_SINGLE_POST } from '../../utils/queries';
import "./postList.css"

import Auth from '../../utils/auth';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';

interface Post  {
  _id: string
  postText: string
  postPic: string
  postAuthor: string
  createdAt: string
}

type PostProps = {
  posts: any 
}

const PostList:FunctionComponent<PostProps> = ( {posts 
}) => {

  const [singlePostId, setSinglePostId] = useState('');  

  const { data } =  useQuery( QUERY_SINGLE_POST, {  
      variables: { 
        postId: singlePostId,  
      },
    }
  );

  const singlePost = data?.post || {};

  const getPostId = (event: MouseEvent<HTMLButtonElement>) => {
    const { value }: any  = event.target;   ;
    setSinglePostId(value);    
  };

  const closeComments = (event: MouseEvent<HTMLButtonElement>) => {    
    setSinglePostId("");
    console.log(singlePostId);
  };

  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  
  return (
    <div className="postlist-container">  
      {posts &&
        posts.map((post: Post ) => (
        <div className="post-container"key={post._id} >
          <h4>          
            <Link to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor}              
            </Link>  
            <p className="postdate">posted on {post.createdAt}</p>          
          </h4>
        {!post.postPic && ( 
        <div className="post-text-container">
          <p>{post.postText}</p>
        </div>
        )} 
        {post.postPic && (
          <div className="post-pic-container">
            <div className="post-pic">
              <img className="post-pic-image"src={post.postPic} alt='drawing'></img>
            </div>
          </div>
        )}
      

{Auth.loggedIn() ? (
        <div className="post-footer">       
          <div className="post-comment-link">                
          {post._id === singlePost._id ? (
            <div>           
              <button type="submit" onClick={closeComments}>Close Comments</button>
              <CommentForm postId={post._id} />
              <CommentList comments={singlePost.comments} />     
            </div>             
            ) : (           
              <button  type="submit" value={post._id} onClick= {getPostId}>Comments</button>
            )}
            
          </div>            
         
        </div>
         ) : null }
      </div>
      ))}
    </div>
);
};
  
  export default PostList;