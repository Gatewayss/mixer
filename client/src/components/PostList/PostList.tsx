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
        <div className="post1"key={post._id} >
          <h4 className="post2">          
            <Link className="post3"to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor} <br />
              <span className="post4">{post.createdAt}</span>
            </Link>            
          </h4>
        <div className="post5">
          <p className='post6'>{post.postText}</p>
        </div>
        {post.postPic && (
          <div className="post-pic-container">
            <div className="post-pic">
              <img src={post.postPic} alt='drawing'></img>
            </div>
          </div>
        )}

        <Link className='post7'to={`/posts/${post._id}`}>
            Join the discussion on this post.
        </Link>
      </div>
      ))}
    </div>
);
};
  
  export default PostList;