import React, { useState, ChangeEvent, FormEvent } from 'react';
import './commentForm.css'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_COMMENT } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CommentForm = ({ postId }: any) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log('this is working');

    try {
      const { data } = await addComment({       
        variables: {
        postId,
        commentText,
        commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    console.log(value);

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="commentform-container">    
      {Auth.loggedIn() ? (
      <>
      <p
        className={`m-0 ${
          characterCount === 280 || error ? 'text-danger' : ''
        }`}
      >
      
        {error && <span className="ml-2">{error.message}</span>}
      </p>
      <form className="comment-form"onSubmit={handleFormSubmit}>
        <div className="comment-textarea-container">
          <textarea
            name="commentText"
            placeholder="Add your comment..."
            value={commentText}
            className="commentform-textarea"
            style={{ lineHeight: '1.5' }}
            onChange={handleChange}
          ></textarea>
        </div>

        <div >
          <button className="commentform-button"type="submit">
            Add Comment
          </button>
        </div>
      </form>
      </>
      ) : (
        <p>
          You need to be logged in to comment. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
