import React, {useEffect} from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import Logo from '../logo.png'
import css from '../components/css/GamesList.css'
const Axios = require('axios')


function GamesList(props) {
const [games, setGames] = React.useState([])

  useEffect(()=> {
    async function GameCards(){
      const url = "http://localhost:5000//detail/allgames"
      const response = await Axios.get(url, {withCredentials:true})
        setGames(response.data)
    }
    

    GameCards()
  }, [])

    return(
        <>
          <div className='GamesList'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
            <div class="wrapper">

<div className="cards">
<div className="card">
          {games.map(game => (
            <figure key={game.name}>
               { game.name == 'CSGO' ? <img src="https://steamcdn-a.akamaihd.net/steam/apps/578080/library_600x900.jpg"/> : null }
               { game.name == 'PUBG' ? <img src="https://steamcdn-a.akamaihd.net/steam/apps/578080/library_600x900.jpg"/> : null }
            </figure>
          ))}
 </div>
</div>
</div>
    </div>
        </>
    )
}

export default GamesList