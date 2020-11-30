 import React , {useState} from 'react'
 import css from '../components/css/MenuBarGame.css'
 import Logo from '../logo.png'

 function MenuBarGame(props){
    const [click, setClick] = useState(false);

     function handleDropdown() {
        setClick(true); 
      }

    return(
        <>
        <div>
            <ul>
                <li>
                     <button className="gameButton" onClick={handleDropdown}><img src={Logo}/> {props.data.name}</button>
                     {click?
                     <div class="dropdown-content">
                        <a href="#">Duel</a>
                        <a href="#">Events</a>
                        <a href="#">Leaderboards</a>
                     </div>:null}
                </li> 

                <li>
                     <button className="gameButton" onClick={handleDropdown}><img src={Logo}/> {props.data.name}</button>
                     {click?
                     <div class="dropdown-content">
                        <a href="#">Duel</a>
                        <a href="#">Events</a>
                        <a href="#">Leaderboards</a>
                     </div>:null}
                </li> 
            </ul>
        </div>

        </>
    )

 }

 export default MenuBarGame