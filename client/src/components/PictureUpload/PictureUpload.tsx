import React from 'react';
import './pictureUpload.css';
import Header from '../../components/Header/Header';

const PictureUpload = () => {
  
  return (
     
    <div>      
      <Header />    
   {/* {!url && ( */}
         
        <div className="upload-pic-container">
            <div className="upload-profile-pic">
                <img className="upload-image" 
                src='https://res.cloudinary.com/dkm1hkwdl/image/upload/v1684264594/blank-profile-picture-gc25a26fa6_1280_copy_ve1thb.jpg' alt="user pic"></img>
            </div>
                
          <div className="file-input">            
            <input id="file"  className="file" type="file" 
            // onChange= {(e: ChangeEvent<HTMLInputElement>)=> uploadImage(e.currentTarget.files)}
            ></input>
            <label htmlFor="file">Select New Profile Picture
            <p className="file-name"></p>
            </label>
               
          </div>      
          
        </div>
   {/* )}        
    
  
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
         )}*/}
 
      </div> 
    )
};
  
  export default PictureUpload;