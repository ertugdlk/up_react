import React, { useEffect } from 'react'
import ClearIcon from '@material-ui/icons/Clear'

/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
import { baseUrl } from '../utils/helpers'
/* -------------------------------------------------------------------------- */

import Logo from '../logo.png'
import css from '../components/css/GamesList.css'
import CenterModal from './UI/CenterModal'
import { AddPhotoAlternateSharp } from '@material-ui/icons'
import Snackbar from "@material-ui/core/Snackbar"
import { SnackbarContent } from "@material-ui/core"
// const Axios = require('axios');

function GamesList(props) {
  const [games, setGames] = React.useState([])
  const [existingGames,setExistingGames] = React.useState([])
  const [ErrorMessage, setErrorMessage] = React.useState("")
  const [snackbar, setSnackbar] = React.useState(false)

  useEffect(() => {
    async function GameCards() {
      try{
      const url = 'detail/allgames'
      const response = await axios.get(url, { withCredentials: true })
      if (response.data) {
        setGames(response.data)
      }
    }catch(err){
      alert("We couldn't get the games from our server")
    }
    }
  

    async function userGames() {
      try{
      const url = 'detail/games';
      const response = await axios.get(url, { withCredentials: true });
      setExistingGames(response.data);
    }catch(err){
      alert("We couldn't get your games!")
    }

    }

    GameCards()
    userGames()
  }, [])

 

  const handlePlatformIntegration = (platform) => {
    try{
    //check user's exist steam account
    for (let i = 0; i < existingGames.length; i++) {
     if(games[i].name===existingGames[i].name){
       setErrorMessage("Game already added")
       setSnackbar(true)
     }
    }
    //If platform is steam redirect to steam authentication
   if (platform == '5f9a84fca1f0c0b83de7d696' && existingGames.length<games.length) {
      window.open(baseUrl + 'steam/auth', '_self')
    } else{
      setErrorMessage("All games are added")
      setSnackbar(true)
    }
  }catch(err){
    alert("Steam integration failed")
  }
  }

  const handleSnack = () => {
    setSnackbar(false)
  }

  return (
    <>        
    <Snackbar
    open={snackbar}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={1000}
    message={ErrorMessage}
    onClose={handleSnack}
  >
    <SnackbarContent
      style={{
        backgroundColor: "#00ff60",
        color: "black",
        justifyContent: "center",
        fontWeight: "bolder",
        fontSize: "14px",
      }}
      message={<span id="client-snackbar">{ErrorMessage}</span>}
    />
  </Snackbar>
      <CenterModal>
        <div className='GamesList'>
          <div className='CloseButton1'>
            {' '}
            <ClearIcon
              fontSize='large'
              onClick={props.onClose}
            ></ClearIcon>{' '}
          </div>
          <div class='wrapper'>
            <div className='cards'>
              {games.map((game) => (
                <div
                  className='card'
                  onClick={() => handlePlatformIntegration(game.platform)}
                >
                  <figure key={game.name}>
                    <img loading="lazy" src={game.img} />
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CenterModal>
    </>
  )
}

export default GamesList
