import React, { useState, FormEvent, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaintbrushPencil } from '@fortawesome/pro-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import './login.css';

import Swal from 'sweetalert2';
import Auth from '../../utils/auth';

const Login = (props: any) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'You have been logged in successfully.',
      });
    } catch (e) {
      console.error(e);

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'An error occurred during login.',
      });
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="logo">
           <Link className="login-home-link" to="/" ><h1 className="logo-header">
              <span className="m">M</span>
              <span className="i">I</span>
              <span className="login-icon">
                <FontAwesomeIcon icon={faPaintbrushPencil} flip="vertical" />
              </span>
              <span className="e">E</span>
              <span className="r">R</span>
            </h1></Link>
            <p className="logo-tag">Artist block? Mix it up.</p>
          </div>
        </div>

        <div className="login-right">
          <div className="login-right-container">
            <form className="login-form" onSubmit={handleFormSubmit}>
              <input
                className="login-input"
                placeholder="Email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="login-input"
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="login-btn"
                style={{ cursor: 'pointer' }}
                type="submit"
                onClick={() => {
                  Swal.fire({
                    title: 'Logging In...',
                    allowOutsideClick: false,
                    didOpen: () => {
                      Swal.showLoading();
                    },
                  });
                }}
              >
                Login
              </button>
            </form>
            {error && <div>{error.message}</div>}
            <div className="no-account">
              <p className="no-acct-tag">Don't have an account?</p>
              <Link className="signup-link" to="/signup">
                <button className="go-signup-btn">Sign up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;