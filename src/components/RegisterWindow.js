import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import css from '../components/css/RegisterWindow.css';
import axios from '../utils';

import OTP from '../components/OTP';
const Axios = require('axios');

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function RegisterWindow() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [otp, setOTP] = useState(false);

  const handleOTP = () => {
    setOTP(true);
  };

  const handleRegister = async (next) => {
    try {
      if (password !== secondPassword) {
        alert("Passwords don't match");
        next();
      }
      handleOTP();
      const url = 'auth/register';
      const response = await axios.post(url, { nickname, email, password });
      if (response.status == 200) {
        //history.push("/");
      } else if (response.data.status === 0) {
        alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      {otp ? <OTP></OTP> : null}
      <OTP></OTP>

      <div className='register-window'>
        <div className='register-modal'>
          <h2 className='register-title'>Create Account</h2>
          <label>
            Nickname
            <input
              className='register-input'
              type='text'
              name='nickname'
              onChange={(e) => setNickname(e.target.value)}
              required
            ></input>
          </label>
          <label>
            Mail
            <input
              className='register-input'
              type='text'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            ></input>
          </label>
          <label>
            Password
            <input
              className='register-input'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </label>
          <label>
            Confirm Password
            <input
              className='register-input'
              type='password'
              name='secondPassword'
              onChange={(e) => setSecondPassword(e.target.value)}
              required
            ></input>
          </label>
          <div>
            <button
              className='register-button'
              onClick={handleRegister}
              buttonStyle='btn--register'
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterWindow;
