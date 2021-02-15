import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import Photo1 from '../Photo1.png'
import Bag from '../bag_icon.png'
import searchicon from '../search_icon.png'
import Filter from '../filter_icon.png'
import { Grid } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import IconButton from '@material-ui/core/IconButton'
import { Menu, MenuItem } from '@material-ui/core'
import css from '../components/css/Dashboard.css'
import { useHistory } from 'react-router-dom'
import GameRoomRow from '../components/Common/GameRoomRow'
import MyAccount from '../components/MyAccount'
import GamesList from '../components/GamesList'
import CreateGame from '../components/CreateGame'
import MenuBarGame from '../components/MenuBarGame'
import { NavigateBefore, SportsHockeyRounded } from '@material-ui/icons'
import { connect } from 'react-redux'

import {
  getAllGameRooms,
  addNewGame,
  getMatchData,
  changeGameHost,
  removeGameRoom,
} from '../actions/index'

import Room from '../components/Room'
import MapSelection from '../components/MapSelection'
// import { Menu } from 'semantic-ui-react';
/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils'
import { baseUrl } from '../utils/helpers'
import LeftPane from '../components/Dashboard/LeftPane'
import CenterModal from '../components/UI/CenterModal'
import VerificationForm from '../components/VerificationForm'
import { set } from 'js-cookie'

/* -------------------------------------------------------------------------- */
const _ = require('lodash')
const Axios = require('axios')
const socketio = require('socket.io-client')
const socket = socketio(baseUrl, {
  transports: ['websocket'],
})

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #16161b;
  }`

function Dashboard(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [gamesList, setGamesList] = useState(false)
  const [account, setAccount] = useState(false)
  const [create, setCreate] = useState(false)
  const [menubarGames, setMenubarGames] = useState([])
  const [gameRoom, setGameRoom] = useState(false)
  const [selectedHost, setSelectedHost] = useState('')
  const [roomResponse, setRoomResponse] = useState({})
  const [returnButton, setReturnButton] = useState(false)
  const [_host, setHost] = useState(false)
  const [session, setSession] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('')
  const [errorbar, setErrorBar] = useState(false)
  const [mapSelect, setMapSelect] = useState(false)
  const [gameRoomsList, setGameRooomList] = useState([])
  const [searchWord, setSearchWord] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [preventCreate, setPreventCreate] = useState(false)
  const [verificationForm, setVerificationForm] = useState(false)
  const [balance,setBalance] = useState(0)
  const [steamName,setSteamName] = React.useState('')
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleRoomOpen = () => {
    setOpenModal(true)
  }

  const handleVerificationForm = () => {
    setVerificationForm(true)
  }

  useEffect(() => {
    setTimeout(() => setErrorBar(), 5000)
  })

  // const [rooms, setRooms] = useState([]);
  const history = useHistory()

  useEffect(() => {
    /* --------------------------- Redux Get All Rooms -------------------------- */
    props.getAllGameRooms()

    /* -------------------------------------------------------------------------- */

    socket.on('hostChanged', ({ host, newHost }) => {
      props.changeGameHost(host, newHost)
      if (selectedHost == host) {
        setSelectedHost(newHost)
      }
    })

    socket.on('HostLeft', async ({ host, newHost }) => {
      setSelectedHost(newHost.nickname)
      if (userName == newHost) {
        const url = 'room/getdata'
        const response = await axios.post(
          url,
          { host: selectedHost },
          { withCredentials: true }
        )
        setRoomResponse(response.data)
      }
    })

    socket.on('roomDeleted', ({ host }) => {
      props.removeGameRoom(host)
    })

    socket.on('userCountChange', (data) => {
      props.getMatchData(data.host, data.positive)
      console.log(data)
    })

    socket.on('newRoom', (data) => {
      props.addNewGame(data)
    })

    socket.on('roomData', (data) => {
      setRoomResponse(data)
      setGameRoom(true)
      handleRoomOpen()
    })

    socket.on('roomCreated', (data) => {
      setSelectedHost(data.host)
      setRoomResponse(data)
      setGameRoom(true)
      handleRoomOpen()
    })

    socket.on('Error', (msg) => {
      setErrorMessage(msg)
      setErrorBar(true)
    })

    socket.on('openedRoom', (data) => {
      setSelectedHost(data.room.host)
      if (data.room.host == data.nickname) {
        setHost(true)
      }
      setRoomResponse(data.room)
      setReturnButton(true)
    })
  }, [])
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function userInfo() {
      try {
        const url = 'auth/me'
        const response = await axios.get(url, { withCredentials: true })

        if (response.status == 200) {
          if (response.data.nickname) {
            setUsername(response.data.nickname)
            setEmail(response.data.email)
            setSession(true)
          } else {
            if (response.data.output.statusCode == 401) {
              return history.push('/')
            }
          }
        } else {
          if (response.data.output.statusCode) {
            return history.push('/')
          }
        }

        socket.emit('login', response.data.nickname)
      } catch (error) {
        throw error
        //history.push("/")
      }
    }

    async function userGames() {
      const url = 'detail/games'
      const response = await axios.get(url, { withCredentials: true })
      if (!response.data.output) {
        setMenubarGames(response.data)
      } else {
        return history.push('/')
      }
    }

    async function userSteam() {
      const url = 'detail/info'
      const response = await axios.get(url, { withCredentials: true })
      if (props.steam) {
        if (props.steam == response.data) {
          setErrorMessage('Your Steam Integrated to our system')
          setErrorBar(true)
          setSteamName(response.data)
        } else {
          setErrorMessage('no match')
          setErrorBar(true)
        }
      }
    }

    userInfo()
    userGames()
    userSteam()
    setGameRooomList(props.roomsRedux)
  }, [props.roomsRedux])

  const handleSearch = (event) => {
    setSearchWord(event.target.value)
    var fiteredRoomies = props.roomsRedux.filter((room) => {
      if (room.host.indexOf(searchWord) !== -1) return room
    })
    setGameRooomList(fiteredRoomies)
  }

  const handleGameRoom = async (host, gameName) => {
    const result = _.find(menubarGames, (game) => {
      return game.name == gameName
    })
    const url2 = 'room/checkjoined'
    const response2 = await axios.post(
      url2,
      { nickname: userName },
      { withCredentials: true }
    )

    const url3 = 'room/checkblacklist'
    const response3 = await axios.post(
      url3,
      { host: host },
      { withCredentials: true }
    )

    if (
      result === undefined ||
      response2.data.status === 0 ||
      response3.data.status === 0
    ) {
      if (result === undefined) {
        setErrorBar(true)
        setErrorMessage("You don't have " + gameName)
      } else if (response2.data.status === 0) {
        setErrorBar(true)
        setErrorMessage('Already in a room ')
        setPreventCreate(true)
      } else if (response3.data.status === 0) {
        setErrorBar(true)
        setErrorBar('You are kicked')
      } else {
        setErrorBar(true)
        setErrorBar('Undefined Error')
      }
    } else {
      const data = { host: host, nickname: userName }
      socket.emit('join', data)
      setSelectedHost(host)
    }
  }

  const handleAccount = () => {
    // setAnchorEl(null);
    setAccount(true)
  }

  const handleAddGame = () => {
    setGamesList(true)
  }

  const handleAccountClose = () => {
    setAccount(false)
  }
  const handleCreateClose = () => {
    setCreate(false)
  }

  const handleListClose = () => {
    setGamesList(false)
  }

  const handleVerificationFormClose = () => {
    setVerificationForm(false)
  }

  const handleCreateClick = () => {
    if (menubarGames.length == 0) {
      setErrorMessage('Add some Games First')
      setErrorBar(true)
    } else if (preventCreate === true) {
      setCreate(false)
      setErrorBar(true)
      setErrorMessage('Already in a room')
    } else {
      setCreate(true)
    }
  }

  const handleReturnGame = async () => {
    const url = 'room/getdata'
    const response = await axios.post(
      url,
      { host: selectedHost },
      { withCredentials: true }
    )
    setRoomResponse(response.data)
    setGameRoom(true)
    handleRoomOpen()
  }

  const handleCreateRoom = (data) => {
    data.host = userName
    setCreate(false)
    setHost(true)
    socket.emit('create', data)
    // props.getAllGameRooms();
  }

  const handleLogout = () => {
    async function logout() {
      const url = 'auth/logout'
      await axios.get(url, { withCredentials: true })
    }

    // setAnchorEl(null);
    logout()
    history.push('/')
  }

  const handleSteam = () => {
    async function steamauth() {
      window.open(baseUrl + 'steam/auth', '_self')
    }
    steamauth()
  }

  const handleCloseRoom = () => {
    setGameRoom(false)
  }

  const handleMapSelectClose = () => {
    setMapSelect(false)
  }

  // console.log(props.roomsRedux);
  return (
    <>
      {errorbar ? (
        <div className='errorbar'>
          <span>{ErrorMessage}</span>
        </div>
      ) : null}
      {session ? (
        <div>
          {gamesList ? <GamesList onClose={handleListClose}></GamesList> : null}
          {account ? (
            <CenterModal>
              <MyAccount
                userName={userName}
                onClose={handleAccountClose}
                email={email}
              ></MyAccount>
            </CenterModal>
          ) : null}
          {create ? (
            <CreateGame
              onCreate={handleCreateRoom}
              onClose={handleCreateClose}
              games={menubarGames}
            ></CreateGame>
          ) : null}
          {mapSelect ? (
            <MapSelection onClose={handleMapSelectClose}></MapSelection>
          ) : null}
          {verificationForm ? (
            <VerificationForm onClose={handleVerificationFormClose} />
          ) : null}
          {gameRoom ? (
            <Room
              openModal={openModal}
              host={selectedHost}
              socket={socket}
              nickname={userName}
              roomResponse={roomResponse}
              _host={_host}
              handleCloseModal={handleCloseModal}
            ></Room>
          ) : null}
          <GlobalStyle></GlobalStyle>
          <div className='Header'>
            <Grid>
              <div className='dashboard-logo'>
                <a className='LogoLink' href='/dashboard'>
                  <img src={Logo} />
                </a>
              </div>
              <div className='HeaderRightMenu'>
                <button onClick={handleAccount}>Account Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </Grid>
          </div>

          <div className='Container'>
            <div className='Slider'>
              <img className='img1' src={Photo1}></img>
            </div>
            <div className='GameFilter'>
              <button className='open-games'>Open Games</button>
              <button className='private-games'>Private Games</button>
              <div className='search-game'>
                <img src={searchicon} className='search-image'></img>
                <input
                  onChange={(e) => handleSearch(e)}
                  onKeyUp={(e) => handleSearch(e)}
                  value={searchWord}
                  className='search-gameID'
                  placeholder='Search Game ID'
                ></input>
              </div>
              <div className='filter-game'>
                <img src={Filter} className='filter-image'></img>
                <button className='filter-games'>Filter</button>
              </div>
              <button className='Random'>Random</button>
              <button className='Create' onClick={handleCreateClick}>
                {' '}
                New Game{' '}
              </button>
              {returnButton ? (
                <button className='return-button' onClick={handleReturnGame}>
                  Return to Game
                </button>
              ) : null}
            </div>
            <GameRoomRow
              data={gameRoomsList}
              onJoin={(host, gameName) => handleGameRoom(host, gameName)}
            ></GameRoomRow>
          </div>

          {/* -------------------------------- LEFT PANE ------------------------------- */}

          <LeftPane
            userName={userName}
            handleAddGame={handleAddGame}
            handleVerificationForm={handleVerificationForm}
            handleVerificationFormClose={handleVerificationFormClose}
            verificationForm={verificationForm}
            balance={balance}
            steamName = {steamName}
          />

          {/* /* -------------------------------- LEFT PANE ------------------------------- */}

          <div className='SocialBar'></div>
        </div>
      ) : null}
    </>
  )
  //deposit ve withdraw butonlarÄ±na geÃ§ici olarak handleAccount fonksiyonu atandÄ±, para iÅŸlemleri entegre edilince dÃ¼zeltilmeli.
  //sidebar menÃ¼de username gÃ¶steriliyor olmalÄ± ama maili tutmadÄ±ÄŸÄ±mÄ±z iÃ§in o gÃ¶zÃ¼kmÃ¼yor, dÃ¼zeltilmeli.
  //balance'a ÅŸimdilik kendim bir deÄŸer girdim ama daha sonra kullanÄ±cÄ±nÄ±n deÄŸeri {balance} veya baÅŸka bir ÅŸekilde gÃ¶sterilmeli.
}

const mapStateToProps = (state) => {
  return {
    roomsRedux: state.roomsRedux,
  }
}


export default connect(mapStateToProps, {
  getAllGameRooms,
  addNewGame,
  getMatchData,
  changeGameHost,
  removeGameRoom,
})(Dashboard)