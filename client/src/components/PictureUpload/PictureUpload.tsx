import React, { useState, ChangeEvent, MouseEvent } from 'react';
import './pictureUpload.css';
import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Header from '../Header/Header';
import { useQuery } from '@apollo/client';
import {  useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_PROFILEPIC } from '../../utils/mutations';

const PictureUpload = () => {

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  const [url, setUrl] = useState('');
  const [addProfilePic, { error }] = useMutation(ADD_PROFILEPIC);     

  const uploadUrl = async (e: MouseEvent<HTMLButtonElement>) => {   
    e.preventDefault();
    try {
      const { data } = await addProfilePic({
        variables: {
          profilePic: url,          
        },
      });

      setUrl('');
     
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
        
      setUrl(data.url);     
     
      
      })
      .catch(err => console.log(err))
      }

  
  return (
     
    <div>      
      <Header />    
   {!url && (
         
        <div className="upload-pic-container">
            <div className="upload-profile-pic">
                <img className="upload-image" 
                src='https://res.cloudinary.com/dkm1hkwdl/image/upload/v1684264594/blank-profile-picture-gc25a26fa6_1280_copy_ve1thb.jpg' alt="user pic"></img>
            </div>
                
          <div className="file-input">            
            <input id="file"  className="file" type="file" 
            onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.currentTarget.files)}
            ></input>
            <label htmlFor="file">Select New Profile Picture
            <p className="file-name"></p>
            </label>
               
          </div>      
          
        </div>
    )}        
    
  
      {url && (
            <div className="preview-pic-container">              
                        
                <div className="preview-profile-pic">
                  <img className="preview-image" src={url} alt="user pic"></img>
                </div>
                <div className="button-container">         
          <div className="change-file-input">            
            <input id="change-file"  className="change-file" type="file" onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.target.files)}></input>
            <label htmlFor="change-file">Select Different Picture
            <p className="file-name"></p>
            </label>
          </div>         
        </div>      
                <div>
                <button className="save-btn"type="button" onClick={uploadUrl}>Save New Profile Picture</button>
                </div>
            </div>
         )}
 
      </div> 
    )
};
  
  export default PictureUpload;