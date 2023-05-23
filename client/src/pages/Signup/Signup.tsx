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
            <div>
              {error.message}
            </div>
          )}
          <div className="yes-account">
            <p className="yes-acct-tag">Already have an account?</p>
            <Link className="login-link" to="/login">
              <button className="go-login-btn" >Login instead</button>
            </Link>
          </div>  
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-logo">
        <Link className="signup-home-link"to="/"> <h2 className="signup-logo-header">
              <span className="m">M</span>
              <span className="i">I</span>
             <span className="signup-icon"><FontAwesomeIcon icon={faPaintbrushPencil} flip="vertical" /></span>
              <span className="e">E</span>
              <span className="r">R</span>
          </h2></Link>
          <p className="signup-tag">Artist block? Mix it up.</p>  
        </div>

      </div>
    </div>
  </main>
  );
};

export default Signup;
