import React, { useState, useEffect } from 'react';
import { Button } from './Common/Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
            Başlık
          <div className='menu-icon' onClick={handleClick}>
          </div>
         
          {button && <Button buttonStyle='btn--outline'>Create Account</Button>}
          {button && <Button buttonStyle='btn--outline'>Login </Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;