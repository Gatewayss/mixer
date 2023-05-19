import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './postForm.css'

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
const [postText, setPostText] = useState('');

const [addPost, { error }] = useMutation(ADD_POST, {   
    update(cache, { data: { addPost } }) {
      try {
        const { posts }: any = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (e) {
        console.error(e);
      }

      try {
      const { me }: any = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [...me.posts, addPost] } },
      });
    } catch (e) {
      console.error(e);
    }
    },
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await addPost({     
        variables: {
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });
 
      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

  if (name === 'postText' ) {
    setPostText(value);    
  }
};
  
  return (
    <div className="postform-container">
      <div className="postform-header">
      <h3>What's on your mind?</h3>
      </div>

    {Auth.loggedIn() ? (
        <>
      <form className="postform-form"
       
        onSubmit={handleFormSubmit}
      >
        <div >
          <textarea
          className="postform-textarea"
            name="postText"
            placeholder="Here's a new post..."
            value={postText}           
            onChange={handleChange}
          ></textarea>
        </div>      
        <div className="postform-btn-container">
        <div className="postform-button">
          <button  type="submit">
            Add Post
          </button>
        </div>
        <div className="postpic-button">
          <button  type="submit">
            Add Drawing
          </button>
        </div>
        </div>
        
        {error && (
          <div >
             {error.message}
          </div>
        )}
      </form>
      </>
       ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )} 
    </div>
  );
};
  
  export default PostForm;