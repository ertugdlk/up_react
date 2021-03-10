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
  const [team1FirstIndex, setTeam1FirstIndex] = useState('')
  const [team2FirstIndex, setTeam2FirstIndex] = useState('')
  const [gameInformation, setGameInformation] = useState([])
  const [gameUrl, setGameUrl] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState('')
  const [currentHost, setCurrentHost] = useState('')

  useEffect(() => {
    setCurrentHost(props.host)
  }, [props.host])
  const [priority,setPriority] = useState([])

  //IMPROVEMENT İLERİSİNN İŞİ
  //banlanan mapler localstorage ta tutlup kontrol edilebilir. oda da başladığında local storage da roomid si ile güncel mapler tutulabilir

  const disableButton = (index) => {
    // socket io emit ban
    if (maps.length !== 1) {
      const bannedMap = index
      props.socket.emit('mapselection', {
        host: currentHost,
        bannedMap,
        team: 1,
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
        if (response.data) {
          setMaps(response.data.maps)
        }
      }
      GameMaps()
    }

    setTeam1FirstIndex(props.team1[0].nickname)
    setTeam2FirstIndex(props.team2[0].nickname)
  }, [])

  useEffect(() => {
    const url = 'steam://connect/' + gameInformation
    props.socket.on('nextTurn', ({ bannedMap, team }) => {
      setMaps(maps.splice(bannedMap, 1))
    })
  })

  // useEffect(async () => {
  //   const url = 'rcon/setupmatch'
  //   const response = await axios.post(
  //     url,
  //     { host: props.host },
  //     { withCredentials: true }
  //   )

  //   console.log('setupmatch', response)
  //   setGameInformation(response.data)
  // })


  //priority diye bir variable oluştur, eğer priority team1firstindex'e eşitse map disable edilebilsin, daha sonra maps length 1 ise priorityi team2FirstIndex'e eşitle ve map disable edebilsin.
  //


  if ((team1FirstIndex != '' || team2FirstIndex != '') && maps.length !== 1) {

    if(maps.length===2){
      setPriority(team1FirstIndex)
    }

    if(priority===team1FirstIndex){
      return(
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
    } else{
      return(
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
  } else if((team1FirstIndex != '' || team2FirstIndex != '') && maps.length == 1) {
    setPriority(team2FirstIndex)

    if(priority===team2FirstIndex){
      return(
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
    } else{
      return(
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
}

export default MapSelection
