import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from '../utils';
import ClearIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {makeStyles,createStyles} from "@material-ui/core/styles";
import css from '../components/css/LoginWindow.css';
import { BorderAllRounded } from '@material-ui/icons';

const Axios = require('axios');
const Cookie = require('js-cookie');

//const URL = ''

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width:"150px",
      color: "white",
      "&.Mui-focused": {
        color:'white',
        borderColor: 'green'
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green"
      },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
        color:"green"
      },
    }
  }
    },
  )
);

function LoginWindow(props) {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [open, setOpen] = useState(true);
  const [nicknameError,setNicknameError] = useState(false);
  const [nicknameHelperText,setNicknameHelperText] = useState('');
  const [passwordError,setPasswordError] = useState(false);
  const [passwordHelperText,setPasswordHelperText] = useState('');
  const classes = useStyles();


  const handleSteam = async () => {};

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async () => {
    try {
      const url = 'auth/login';
      const response = await axios.post(
        url,
        { nickname, password },
        {withCredentials: true}
      );
      if (response.status == 200) {
        history.push('/dashboard');
      } else {
        setOpen(true)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Snackbar open={open} anchorOrigin={{vertical: 'top',horizontal: 'center'}} autoHideDuration={10000000} onClose={handleClose} ><SnackbarContent style={{
            backgroundColor:'#00ff60',
            color:'black',
            justifyContent:'center',
            fontWeight:'bolder',
            fontSize:'14px',
            borderRadius:'10px'
    }}
    message={<span id="client-snackbar">Login Failed</span>}
  /></Snackbar>
      <GlobalStyle></GlobalStyle>
      <div className='login-window'>
        <div className='CloseButton1'>
          <ClearIcon
            fontSize='large'
            onClick={props.handleLoginClose}
          ></ClearIcon>{' '}
        </div>
        <div className='login-modal'>
          <h2 className='login-title'>Login</h2>
          <label className='labels'>Username</label>
          <TextField id="standard-basic" onChange={(e)=> setNickname(e.target.value)} required error={nicknameError} helperText={nicknameHelperText} className={classes.root} InputProps={{className: classes.root}}/>
          <label className='labels'>Password</label>
          <TextField id="standard-basic" onChange={(e)=> setPassword(e.target.value)} type="password" required error={passwordError} helperText={passwordHelperText}  className={classes.root} InputProps={{className: classes.root}}/>
          <button className='login-button' onClick={handleLogin}>
            Login
          </button>
          <button className='login-steam-button'>
            <img className="steam-logo"
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
