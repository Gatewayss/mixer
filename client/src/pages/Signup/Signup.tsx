import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintbrushPencil } from '@fortawesome/pro-regular-svg-icons'
import { Link } from 'react-router-dom';
import './signup.css'

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // <main >
    //   <div >
    //     <div >
    //       <h4 >Sign Up</h4>
    //       <div >
    //         {data ? (
    //           <p>
    //             Success! You may now head{' '}
    //             <Link to="/">back to the homepage.</Link>
    //           </p>
    //         ) : (
    //           <form onSubmit={handleFormSubmit}>
    //             <input
    //               className="form-input"
    //               placeholder="Your username"
    //               name="username"
    //               type="text"
    //               value={formState.username}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="Your email"
    //               name="email"
    //               type="email"
    //               value={formState.email}
    //               onChange={handleChange}
    //             />
    //             <input
    //               className="form-input"
    //               placeholder="******"
    //               name="password"
    //               type="password"
    //               value={formState.password}
    //               onChange={handleChange}
    //             />
    //             <button
                 
    //               style={{ cursor: 'pointer' }}
    //               type="submit"
    //             >
    //               Submit
    //             </button>
    //           </form>
    //         )}

    //         {error && (
    //           <div>
    //             {error.message}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </main>
    <main className="signup-container">
    <div className="signup-card">
      <div className="signup-left">
        <div className="signup-left-container">
          <h2 className="signup-header">Sign Up</h2>        
          <form className="signup-form" onSubmit={handleFormSubmit}>
            <input
              className="signup-input"
              placeholder="Username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <input
              className="signup-input"
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <button
              className="signup-btn"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Sign up
            </button>
          </form>         
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
          <div className="yes-account">
            <p className="yes-acct-tag">Already have an account?</p>
            <Link className="login-link" to="/login">
              <button className="go-login-btn" >Login</button>
            </Link>
          </div>  
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-logo">
          <h2 className="signup-logo-header">
              <span className="m">m</span>
              <span className="i">i</span>
              <span className="signup-icon"><FontAwesomeIcon icon={faPaintbrushPencil} flip="vertical" /></span>
              <span className="e">e</span>
              <span className="r">r</span>
          </h2>
          <p className="signup-tag">Artist block? Mix it up.</p>  
        </div>

      </div>
    </div>
  </main>
  );
};

export default Signup;
