import React, { useState } from 'react';
import { Button } from './Common/Button';
import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';
import styled , {createGlobalStyle} from 'styled-components'
import Logo from '../logo.png'
import { Grid } from '@material-ui/core';


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #010101;
  }`

function Homepage() {
  const [click, setClick] = useState(false);
  const [visible , setVisible] = useState(false)

;
const handleClickLogin = ()=> 
{
  setVisible(true);
  setClick(false);
  
}

const handleClickCreateAccount = ()=> 
{
  setClick(true);
  setVisible(false);
}

  //window.addEventListener('resize', showButton);

  
  return (
    <>
    <GlobalStyle></GlobalStyle>
    <NavigationBar>
    <LogoSize>
    <a href="/"><img src={Logo} href='/'/> </a>
      </LogoSize>
      <Grid>
      {click ? <RegisterWindow></RegisterWindow> : null}
          <Button onClick={handleClickCreateAccount} className='btn--navbar--createAccount'>Create <Span>Account</Span><GlobalStyle/></Button>
        {visible?<LoginWindow></LoginWindow>:null}
          <Button onClick={handleClickLogin} className='btn--navbar--login'>Login<GlobalStyle/></Button>
      </Grid>
      </NavigationBar>
      </>
  );
}

const NavigationBar = styled.header`
    background-color: #16161b;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    position: fixed;
    width:100%;
    top: 0;
    left:0;
    z-index: 999;
  `;

const LogoSize = styled.div`
  position: absolute;
  top:-40px;
  left:0;
`;

const Span = styled.span`
  color:#00FF60
`;

export default Homepage;