import React, {FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import "./postList.css"

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

        <Link to={`/posts/${post._id}`}>
            Comment on this post.
        </Link>
      </div>
      ))}
    </div>
);
};
  
  export default PostList;