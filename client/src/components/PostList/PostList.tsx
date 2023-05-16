import React from 'react';
import './postList.css';

const PostList = () => {
  
  return (
    <div className="postlist-container">
      <div>
      This is the post list
      </div>
      {/* {posts &&
        posts.map((post: Post ) => (
          <div key={post._id} >
          <h4 >          
              <Link
               
                to={`/profiles/${post.postAuthor}`}
              >
                {post.postAuthor} <br />
                <span >
                  had this post on {post.createdAt}
                </span>
              </Link>            
          </h4>
          <div >
            <p>{post.postText}</p>
          </div>
          <Link
           
            to={`/posts/${post._id}`}
          >
            Join the discussion on this post.
          </Link>
        </div>
      ))} */}
  </div>
);
};
  
  export default PostList;