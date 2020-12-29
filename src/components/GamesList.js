import React, { useEffect } from 'react'
import ClearIcon from '@material-ui/icons/Clear'

/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
import { baseUrl } from '../utils/helpers'
/* -------------------------------------------------------------------------- */

import Logo from '../logo.png'
import css from '../components/css/GamesList.css'
// const Axios = require('axios');

function GamesList(props) {
  const [games, setGames] = React.useState([])

  useEffect(() => {
    async function GameCards() {
      const url = 'detail/allgames'
      const response = await axios.get(url, { withCredentials: true })
      if (response.data) {
        setGames(response.data)
      }
    }

    GameCards()
  }, [])

  const handlePlatformIntegration = (platform) => {
    //check user's exist steam account

    //If platform is steam redirect to steam authentication
    if (platform == '5f9a84fca1f0c0b83de7d696') {
      window.open(baseUrl + 'steam/auth', '_self')
    }
  }

  return (
    <>
      <div class='outer'>
        <div class='middle'>
          <div class='inner'>
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
                        <img src={game.img} />
                      </figure>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GamesList
