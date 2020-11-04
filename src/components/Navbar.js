import React, { useState, useEffect } from 'react';
import { Button } from './Common/Button';
import LoginWindow from './LoginWindow'
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [visible , setVisible] = useState(false)

  //const handleClick = () => setClick(!click)           <div className='menu-icon' onClick={handleClick}>
;
const handleClick = ()=> 
{
  setVisible(true)
}

  //window.addEventListener('resize', showButton);

  return (
    <>
      {visible ? <LoginWindow></LoginWindow> : null}
      <nav className='navbar'>
        <div className='navbar-container'>
            Başlık
          </div>
          <Button onClick={handleClick} buttonStyle='btn--outline'>Create Account</Button>
          <Button buttonStyle='btn--outline'>Login </Button>
      </nav>
    </>
  );
}

export default Navbar;