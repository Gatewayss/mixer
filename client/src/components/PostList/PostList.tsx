import React, {FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import "./postList.css"

interface Post  {
  _id: string
  postText: string
  postAuthor: string
  createdAt: string
}

type PostProps = {
  posts: any 
}

const PostList:FunctionComponent<PostProps> = ( {posts 
}) => {
  if (!posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  
  return (
    <div className="postlist-container">  
      {posts &&
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
      ))}
  </div>
);
};
  
  export default PostList;