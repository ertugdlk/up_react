import React, { useState } from 'react';
import { Button } from '../components/Common/Button';
import LoginWindow from '../components/LoginWindow';
import RegisterWindow from '../components/RegisterWindow';
import { createGlobalStyle } from 'styled-components';
import Logo from '../logo.png';
import Footer from '../footer.png';
import JoinWin from '../joinnwin.png';
import Thumbs from '../thumbsupplayer.png';
import Vs from '../vs.png';
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
      <div className="homepage-div">
        <div>
        <span className="text-1">YOUR LEADING</span>
        <span className="text-2">COMPETETIVE GAMING PLATFORM</span>
        <button className="sign-up-now" onClick={handleClickCreateAccount}>SIGN UP NOW</button>
        </div>
        <img className="join" src={JoinWin}></img>
        <div>
        <span className="text-3">TRACK YOUR STATS</span>
        <span className="text-4">Do more than just play... Advanced stats let you track your progress as you climb through the ranks.</span>
        </div>
        <img className="thumbs" src={Thumbs}></img>
        <div>
        <span className="text-5">PLAY BETTER GAMES</span>
        <span className="text-6">Find others to play with in seconds! You'll get matched with equally ranked and like-minded gamers to improve your skill and learn from the best.</span>
        </div>
        <img className="vs" src={Vs}></img>
        <div>
          <span className="text-7">ARE YOU READY?</span>
          <button className="footer-button" onClick={handleClickCreateAccount}>CREATE ACCOUNT</button>
        </div>
        <img className="footer" src={Footer}></img>
      </div>
    </>
  );
}


export default Homepage;
