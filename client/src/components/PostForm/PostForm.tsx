import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './postForm.css'

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
const [postText, setPostText] = useState('');
const [postPic, setPostPic] = useState('');

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

//

const uploadUrl = async (e: MouseEvent<HTMLButtonElement>) => {   
  e.preventDefault();
  try {
    const { data } = await addPost({     
      variables: {
        postPic,
        thoughtAuthor: Auth.getProfile().data.username,
      },
    });

    setPostPic('');
  } catch (err) {
    console.error(err);
  }
};

  const uploadImage = (files: any) => {
    const data = new FormData()
    data.append("file", files[0])    
    data.append("upload_preset", "ttq2s0sa")
    data.append("cloud_name","dkm1hkwdl")
    fetch("  https://api.cloudinary.com/v1_1/dkm1hkwdl/image/upload",{
      method:"post",
      body: data
    })
     .then(resp => resp.json())    
    .then(data => {
      
    setPostPic(data.url);     
   
    
    })
    .catch(err => console.log(err))
    }
  
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
        {/* <div className="postpic-button">
          <button  type="submit">
            Add Drawing
          </button>
        </div> */}
        </div>
        
        {error && (
          <div >
             {error.message}
          </div>
        )}
      </form>
      <div className="file-input">            
              <input id="file"  className="file" type="file" onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.currentTarget.files)}></input>
              <label htmlFor="file">Select A Drawing
              <p className="file-name"></p>
              </label>
            </div>  
            <div>
                <button className="save-btn"type="button" onClick={uploadUrl}>Save Drawing</button>
                </div>  
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