import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import './postForm.css'

import { ADD_POST } from '../../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const PostForm = () => {
const [postText, setPostText] = useState('');
const [postPicUrl, setPostPicUrl] = useState('');
const [isChecked, setIsChecked] = useState(false);

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
          isChecked: isChecked,
        },
      });
 
      setPostText('');
      setIsChecked(false); 
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
        postPic: postPicUrl,
        isChecked: isChecked,
        thoughtAuthor: Auth.getProfile().data.username,
      },
    });

    setPostPicUrl('');
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
      
    setPostPicUrl(data.url);     
   
    
    })
    .catch(err => console.log(err))
    }
  
  return (
    <div className="postform-container"> 

      {Auth.loggedIn() ? (
      <div className="postform"> 
      <div className="postform-body"> 
      {!postPicUrl && (       
        <form className="postform-form" onSubmit={handleFormSubmit}>
          <div className="postform-textarea-container">
            <textarea
              className="postform-textarea"
              name="postText"              
              value={postText}           
              onChange={handleChange}
            ></textarea>
          </div>      
          <div className="postform-btn-container">
            <div className="postform-button">
              <button className="postform-btn-label" type="submit">Add Post</button>
            </div>      
          </div>
          
          {error && (
            <div className="error-message">
              {error.message}
            </div>
          )}
          <div className="challenge">
          <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} /> &nbsp;Challenge of the day
          </div>
        </form>
      )}

        {!postPicUrl && (
          <div className="postfile-input">            
            <input id="postfile"  className="postfile" type="file" onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.currentTarget.files)}></input>
            <label htmlFor="postfile"> Add Picture
                <p className="postfile-name"></p>
            </label>
          </div> 
          )} 

          {postPicUrl && (
          <div className="preview-container">  
            <div className="preview-postpic-container">           
              <div className="preview-post-pic">
                <img className="preview-postimage" src={postPicUrl} alt="post pic"></img>
              </div>
            </div>
              <div className="postpic-button-container">         
                <div className="change-postfile-input">            
                  <input id="change-postfile"  className="change-postfile" type="file" onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.target.files)}></input>
                  <label htmlFor="change-postfile">Select Different Picture
                    <p className="postfile-name"></p>
                  </label>
                </div>         
                 
                <div className="postsave-button container">
                  <button className="post-save-btn"type="button" onClick={uploadUrl}>Post Picture</button>
                </div>
              </div>   
            
          </div> 
          )}
        
      </div>
      </div>
       ) : null
      } 
    </div>
  );
};
  
  export default PostForm;