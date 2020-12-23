import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import css from '../components/css/RegisterWindow.css';
import axios from '../utils';
import CloseIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';

import OTP from '../components/OTP';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function RegisterWindow(props) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [otp, setOTP] = useState(false);
  const [open, setOpen] = useState(false);
  const [ErrorMessage,setErrorMessage] = useState('');
  const handleOTP = () => {
    //mail gönderilcek
    setOTP(true);
  };


  const handleRegister = async () => {
    try {
      if (password !== secondPassword) {
        setErrorMessage("Passwords don't match")
        setOpen(true)
      }else{
      const url = 'auth/register';
      const response = await axios.post(url, { nickname, email, password });
      if (response.status == 200) {
        const url = 'auth/sendotp';
        const response = await axios.post(url, {email});
        handleOTP()
        //history.push("/");
      } else if (response.data.status === 0) {
        setErrorMessage(response.data.msg)
        setOpen(true)
      }
    }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={1000} message={ErrorMessage}/>
      <GlobalStyle></GlobalStyle>  
      {otp ? <OTP email={email} nickname={nickname} password={password}></OTP> :
      <div className='register-window'>
        <div className='CloseButton1'>
          <CloseIcon
            fontSize='large'
            onClick={props.handlecloseRegister}
          ></CloseIcon>{' '}
        </div>
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
      }
    </>
  );
}

export default RegisterWindow;
