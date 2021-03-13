import React, { useState, useEffect, useRef, useCallback } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
/* -------------------------------------------------------------------------- */
import css from '../components/css/MapSelection.css'
import CenterModal from './UI/CenterModal'
import { set } from 'js-cookie'

function MapSelection(props) {
  const [maps, setMaps] = useState([])
  const [teamOneChooser, setTeamOneChooser] = useState('')
  const [teamTwoChooser, setTeamTwoChooser] = useState('')
  const [gameInformation, setGameInformation] = useState([])
  const [gameUrl, setGameUrl] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [currentHost, setCurrentHost] = useState('')
  const [priority, setPriority] = useState([])
  const [currentChooser, setCurrentChooser] = useState({
    teamOne: true,
    teamTwo: false,
  })

  useEffect(() => {
    setCurrentHost(props.host)
  }, [props.host])

  //IMPROVEMENT İLERİSİNN İŞİ
  //banlanan mapler localstorage ta tutlup kontrol edilebilir. oda da başladığında local storage da roomid si ile güncel mapler tutulabilir

  useEffect(() => {
    console.log('All props', props)
  }, [])

  const disableButton = (index) => {
    if (currentChooser.teamOne && teamOneChooser.nickname === props.nickname) {
      if (maps.length !== 1) {
        const bannedMap = index
        // socket io emit ban
        props.socket.emit('mapselection', {
          host: currentHost,
          bannedMap,
          team: 1,
        })
      }
      setCurrentChooser({
        teamOne: false,
        teamTwo: true,
      })
    }
    if (currentChooser.teamTwo && teamTwoChooser.nickname === props.nickname) {
      if (maps.length !== 1) {
        const bannedMap = index
        // socket io emit ban
        props.socket.emit('mapselection', {
          host: currentHost,
          bannedMap,
          team: 1,
        })
      }
      setCurrentChooser({
        teamOne: true,
        teamTwo: false,
      })
    }
  }

  const setLastMapAction = async () => {
    const url = 'room/setlastmap'
    const response = await axios.post(
      url,
      { host: currentHost, last_map: maps[0] },
      { withCredentials: true }
    )
    console.log('setLastMapAction', response)
    if (response) {
      fetchMyGameInfo()
    }
    fetchMyGameInfo()
  }

  const fetchMyGameInfo = async () => {
    const url = 'rcon/setupmatch'
    const response = await axios.post(
      url,
      { host: currentHost },
      { withCredentials: true }
    )

    console.log('fetchMyGameInfo', response)
    setGameInformation(response.data)
  }

  //Host mu koontrol et
  useEffect(() => {
    if (maps.length === 1 && props.nickname === currentHost) {
      setLastMapAction()
    }
  }, [maps])

  useEffect(() => {
    if (maps.length === 0) {
      async function GameMaps() {
        const url = 'room/getmaps'
        const response = await axios.post(
          url,
          { gameName: 'CSGO' },
          { withCredentials: true }
        )
        console.log('GameMaps', response)
        if (response.data) {
          setMaps(response.data.maps)
        }
      }
      GameMaps()
    }

    setTeamOneChooser(props.team1[0])
    setTeamTwoChooser(props.team2[0])
  }, [])

  useEffect(() => {
    const url = 'steam://connect/' + gameInformation
    props.socket.on('nextTurn', ({ bannedMap, team }) => {
      setMaps(maps.splice(bannedMap, 1))
    })
  })

  if ((teamOneChooser != '' || teamTwoChooser != '') && maps.length !== 1) {
    return (
      <>
        <div className='map-room-window'>
          <div class='wrapper'>
            <div className='maps'>
              {maps.map((map, index) => (
                <li className='map-list'>
                  <button className='map' onClick={() => disableButton(index)}>
                    <span>{maps[index]}</span> {/*Buraya image gelecek*/}
                  </button>
                </li>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='map-room-window'>
          <div class='wrapper'>
            <div className='maps'>
              <div>
                <span>{gameInformation}</span>
                <a href={'url'} class='btn btn-primary'>
                  Join the Game
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default MapSelection
