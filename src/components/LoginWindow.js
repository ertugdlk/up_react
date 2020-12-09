import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import css from '../components/css/LoginWindow.css';

const Axios = require('axios');
const Cookie = require('js-cookie');

//const URL = ''

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function LoginWindow() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSteam = async () => {};

  const handleLogin = async () => {
    try {
      const url = 'http://localhost:5000/auth/login';
      const response = await Axios.post(
        url,
        { nickname, password },
        { withCredentials: true }
      );

      if (response.status == 200) {
        history.push('/dashboard');
      } else {
        console.log('invalid login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className='login-window'>
        <div className='login-modal'>
          <h2 className='login-title'>Login</h2>
          <label>Username</label>
          <input
            className='login-input'
            onChange={(e) => setNickname(e.target.value)}
            type='text'
            name='username'
            required
          />
          <label>Password</label>
          <input
            className='login-input'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            required
          />
          <button className='login-button' onClick={handleLogin}>
            Login
          </button>
          <button className='login-steam-button'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg'
              height='20px'
            />
            Login with Steam
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginWindow;
