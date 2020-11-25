import React, {useEffect} from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import Logo from '../logo.png'
import css from '../components/css/GamesList.css'
const Axios = require('axios')


function GamesList(props) {
const [games, setGames] = React.useState([])

  useEffect(()=> {
    async function GameCards(){
      const url = "http://localhost:5000/detail/allgames"
      const response = await Axios.get(url, {withCredentials:true})
      if(response.data){
        setGames(response.data)
      }
    }
    
    GameCards()
  }, [])

    return(
        <>
          <div className='GamesList'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
              <div class="wrapper">

                <div className="cards">
                          {games.map(game => (
                            <div className="card">
                              <figure key={game.name}>
                              <img src={game.img}/>
                              </figure>
                            </div>
                          ))}
                </div>
              </div>
          </div>
        </>
    )
}

export default GamesList