import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import css from '../components/css/RegisterWindow.css';
import axios from '../utils';
import CloseIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {makeStyles,createStyles} from "@material-ui/core/styles";
import OTP from '../components/OTP';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: "white",
      backgroundColor:"#1b1c23",
      width:"150%",
      marginLeft:"-20%",
      marginBottom:"10px",
      borderRadius:"10px",
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiOutlinedInput-root': {
        color:"white",
        '& fieldset': {
          //borderColor: 'red',
        },
        '&:hover fieldset': {
          //borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00ff60',
        },
      },
    }
    },
  )
);

function RegisterWindow(props) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();
  const [otp, setOTP] = useState(false);
  const [open, setOpen] = useState(false);
  const [ErrorMessage,setErrorMessage] = useState('');
  const [passwordError,setPasswordError] = useState(false);
  const [nicknameError,setNicknameError] = useState(false);
  const [emailError,setEmailError] = useState(false);
  const [secondPasswordError,setSecondPasswordError] = useState(false);
  const [passwordHelperText,setPasswordHelperText] = useState('');
  const [secondPasswordHelperText,setSecondPasswordHelperText] = useState('');
  const [nicknameHelperText,setNicknameHelperText] = useState('');
  const [emailHelperText,setEmailHelperText] = useState ('');
  const classes = useStyles();
  const filter =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleOTP = () => {
    //mail gönderilcek
    setOTP(true);
  };


  const handleRegister = async () => {
    try {
      if (password !== secondPassword) {
        setPasswordHelperText("Passwords don't match!")
        setSecondPasswordHelperText("Passwords don't match!")
        setSecondPasswordError(true)
        setPasswordError(true)
      }if(nickname===''){
        setNicknameHelperText("Nickname field is empty!")
        setNicknameError(true)
      }if(password===''){
        setPasswordHelperText("Password field is empty!")
        setPasswordError(true)
      }if(secondPassword===''){
          setSecondPasswordHelperText("Password field is empty!")
          setSecondPasswordError(true)
      }if(email===''){
        setEmailHelperText("Email field is empty!")
        setEmailError(true)
      }if (password===secondPassword && password.length>0 && secondPassword.length>0){
        setSecondPasswordError(false)
        setPasswordError(false)
        setSecondPasswordHelperText('')
        setPasswordHelperText('')
      }if(nickname!==''){
        setNicknameError(false)
        setNicknameHelperText('')
      }
      if (!filter.test(email.value)) {
        setEmailHelperText("Invalid Email")
        setEmailError(true)
      }if(email!=='' && filter.test(email)){
        setEmailHelperText('')
        setEmailError(false)
        
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
      throw new Error("Something went wrong")
    }
  };


  return (
    <>
      <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={1000}><SnackbarContent style={{
      backgroundColor:'#00ff60',
      color:'black',
      justifyContent:'center',
      fontWeight:'bolder',
      fontSize:'14px',
      borderRadius:'10px'
    }}
    message={<span id="client-snackbar">{ErrorMessage}</span>}
  /></Snackbar>
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
          <TextField variant="outlined" placeholder="Nickname"  onChange={(e)=> setNickname(e.target.value)} required error={nicknameError} helperText={nicknameHelperText} className={classes.root}/>
          <TextField variant="outlined" placeholder="Email"  onChange={(e)=> setEmail(e.target.value)} type="email" required error={emailError} helperText={emailHelperText} className={classes.root}/>
          <TextField variant="outlined" placeholder="Password"  onChange={(e)=> setPassword(e.target.value)}   type="password" required error={passwordError} helperText={passwordHelperText}  className={classes.root}/>
          <TextField  variant="outlined" placeholder="Confirm Password" onChange={(e)=> setSecondPassword(e.target.value)}   type="password" required error={secondPasswordError} helperText={secondPasswordHelperText} className={classes.root} />
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
