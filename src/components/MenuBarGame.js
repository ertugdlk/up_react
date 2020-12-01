 import React , {useState} from 'react'
 import css from '../components/css/MenuBarGame.css'
 import Logo from '../logo.png'

 function MenuBarGame(props){
    const [click, setClick] = useState(false);

     function handleDropdown() {
        if(click == false){
         setClick(true); 
        }
        else{
           setClick(false)
        }
      }

    return(
        <>
        <div>
                <li>
                     <button className="gameButton" onClick={handleDropdown}><img src={Logo}/> {props.data.name}</button>
                     {click?
                     <div class="dropdown-content">
                        <button>* Duel</button>
                        <button>* Events</button>
                        <button>* Leaderboard</button>
                     </div>:null}
                </li> 
        </div>

        </>
    )

 }

 export default MenuBarGame