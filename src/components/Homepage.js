import React, { useState } from 'react';
import { Button } from './Common/Button';
import LoginWindow from './LoginWindow';
import RegisterWindow from './RegisterWindow';
import styled from 'styled-components'
import Logo from '../logo.png'
import { Grid } from '@material-ui/core';

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
    <NavigationBar>
    <LogoSize>
            <img src={Logo}/>
      </LogoSize>
      <Grid>
      {click ? <RegisterWindow></RegisterWindow> : null}
          <Button onClick={handleClickCreateAccount} buttonStyle='btn--navbar--createAccount'>Create Account</Button>
        {visible?<LoginWindow></LoginWindow>:null}
          <Button onClick={handleClickLogin} buttonStyle='btn--navbar--login'>Login</Button>
      </Grid>
      </NavigationBar>
    </>
  );
}

const NavigationBar = styled.header`
    background-color: #16161b;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: fixed;
    width:100%;
    top: 0;
    left:0;
    z-index: 999;
  `;

const LogoSize = styled.div`
  position: absolute;
  top:-40px;
  width: 130px;
  height: 40px;
  left:0;
`;

const Name = styled.div`

    color:#fff;
    display: fixed;
    align-items: center;
    height: 100%;
    padding: 0 28rem;
    cursor:pointer;   
`;
export default Homepage;