import React, { useState, useEffect, useRef } from 'react';
import css from '../components/css/MenuBarGame.css';
import Logo from '../logo.png';

function MenuBarGame(props) {
  const [click, setClick] = useState(false);
  const dropdown = useRef();
  const btn = useRef();

  useEffect(() => {
    if (click)
      btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`;
    else btn.current.style.marginBottom = 0;
  }, [click]);
  
  function handleDropdown() {
    setClick(!click);
  }

  return (
    <>
      <div>
        <li>
          <button className='gameButton' onClick={handleDropdown} ref={btn}>
            <img loading="lazy" src={Logo} /> {props.data.name}
          </button>
          {click ? (
            <div className='dropdown-content' ref={dropdown}>
              <button className="dropdown-button">Duel</button>
              <button className="dropdown-button">Events</button>
              <button className="dropdown-button">Leaderboard</button>
            </div>
          ) : null}
        </li>
      </div>
    </>
  );
}

export default MenuBarGame;
