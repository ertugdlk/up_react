import React, { useState } from 'react';
import Logo from '../logo.png';
import FirstStep from "../first_step.jpg"
import SecondStep from "../second_step.jpg"
import ThirdStep from "../third_step.jpg"
import FourthStep from "../fourth_step.jpg"
import FifthStep from "../fifth_step.jpg"
import { Button } from '../components/Common/Button';
import { createGlobalStyle } from 'styled-components';
import LoginWindow from '../components/LoginWindow';
import RegisterWindow from '../components/RegisterWindow';
import { Grid } from '@material-ui/core';   
import { useHistory } from 'react-router-dom';
import css from '../components/css/NotFoundPage.css';



const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #010101;
  }`;

function NotFoundPage(props) {

    const history = useHistory();

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
        <div className="deneme">
        <div className="nf-logo">
            <a href='/'>
              <img loading="lazy" src={Logo}/>
            </a>
          </div>
            <p className="nf-img-description">
            SOMETHING WENT WRONG.
            <br></br>
            THIS MIGHT BE CAUSED BY YOUR PRIVACT SETTINGS.
            <br></br>
            PLEASE APPLY THE STEPS BELOW:
            </p>
        <div className="steps-container">
        <span className="steps-instructions">Step 1: Click on your Steam Username</span>
        <img loading="lazy" src={FirstStep} className="steps" alt="first-step"></img>
        <span className="steps-instructions">Step 2: In the menu below, click on Privacy Settings</span>
        <img loading="lazy" src={SecondStep} className="steps" alt="second-step"></img>
        <span className="steps-instructions">Step 3: In this menu, please apply the following changes</span>
        <img loading="lazy" src={ThirdStep} className="steps" alt="third-step"></img>
        <span className="steps-instructions">Step 4: Click on My Profile and change it to public</span>
        <img loading="lazy" src={FourthStep} className="steps" alt="fourth-step"></img>
        <span className="steps-instructions">Step 5: Click on Game Details and change it to public</span>
        <img loading="lazy" src={FifthStep} className="steps" alt="fifth-step"></img>
        </div>
        </div>
      </>
    );
  }
  
export default NotFoundPage;