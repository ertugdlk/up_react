import React, { useState } from 'react';
import { Button } from './Common/Button';
import LoginWindow from './LoginWindow';
import CreateAccountWindow from './CreateAccountWindow';
import styled from 'styled-components'

function Navbar() {
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
      {click ? <CreateAccountWindow></CreateAccountWindow> : null}
        <Name >
            UnknownPros
        </Name>
          <Button onClick={handleClickCreateAccount} buttonStyle='btn--navbar--createAccount'>Create Account</Button>
        {visible?<LoginWindow></LoginWindow>:null}
          <Button onClick={handleClickLogin} buttonStyle='btn--navbar--login'>Login</Button>
      </NavigationBar>
    </>
  );
}

const NavigationBar = styled.header`
    background: linear-gradient(90deg, rgb(28, 27, 27) 0%, rgb(26, 23, 23) 100%);
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;
  `;

const Name = styled.div`

    color:#fff;
    display: fixed;
    align-items: center;
    height: 100%;
    padding: 0 28rem;
    cursor:pointer;   
`;
export default Navbar;