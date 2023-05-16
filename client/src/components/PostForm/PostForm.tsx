import React from 'react';
import './postForm.css';

const PostForm = () => {
  
  return (
    <div className="postform-container">
      <div className="postform-header">
      <h3>What's on your mind?</h3>
      </div>

    {/* {Auth.loggedIn() ? ( */}
        <>
      <form className="postform-form"
       
        // onSubmit={handleFormSubmit}
      >
        <div className="postform-textarea">
          <textarea
            name="postText"
            placeholder="Here's a new post..."
            // value={postText}           
            // onChange={handleChange}
          ></textarea>
        </div>      

        <div className="postform-button">
          <button  type="submit">
            Add Post
          </button>
        </div>
        {/* {error && (
          <div >
             {error.message}
          </div>
        )} */}
      </form>
      </>
      {/* ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )} */}
    </div>
  );
};
  
  export default PostForm;