import React, { useState } from 'react';
import { Button } from '../components/Common/Button';
import LoginWindow from '../components/LoginWindow';
import RegisterWindow from '../components/RegisterWindow';
import { createGlobalStyle } from 'styled-components';
import Logo from '../logo.png';
import { Grid } from '@material-ui/core';
import css from '../components/css/Homepage.css';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #010101;
  }`;

function Homepage(props) {
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClickLogin = () => {
    setVisible(true);
    setClick(false);
  };

  const handleClickCreateAccount = () => {
    setVisible(false);
    setClick(true);
  };

  const closeLogin = () => {
    setVisible(false);
  };

  const closeRegister = () => {
    setClick(false);
  };

  //window.addEventListener('resize', showButton);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <header className='header'>
        <div className='logo'>
          <a href='/'>
            <img src={Logo} href='/' />{' '}
          </a>
        </div>
        <Grid>
          {click ? (
            <RegisterWindow
              handlecloseRegister={closeRegister}
            ></RegisterWindow>
          ) : null}
          <Button
            onClick={handleClickCreateAccount}
            className='btn--navbar--createAccount'
          >
            Create <span className='span'>Account</span>
            <GlobalStyle />
          </Button>
          {visible ? (
            <LoginWindow handleLoginClose={closeLogin}></LoginWindow>
          ) : null}
          <Button onClick={handleClickLogin} className='btn--navbar--login'>
            Login
            <GlobalStyle />
          </Button>
        </Grid>
      </header>
    </>
  );
}

export default Homepage;
