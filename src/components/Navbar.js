import React, { useState } from 'react';
import { Button } from './Common/Button';
import LoginWindow from './LoginWindow';
import CreateAccountWindow from './CreateAccountWindow';
import './Navbar.css';

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
  
      {visible ? <LoginWindow></LoginWindow> : null}
      <nav className='navbar'>
        <div className='navbar-container'>
            Başlık
          </div>
          <Button onClick={handleClickLogin} className="LoginButton" id="Login" buttonStyle='btn--outline'>Login </Button>
        {click?<CreateAccountWindow></CreateAccountWindow>:null}
          <Button onClick={handleClickCreateAccount} className="CreateAccountButton"id="Create Account" buttonStyle='btn--outline'>Create Account</Button>
      </nav>
    </>
  );
}

export default Navbar;