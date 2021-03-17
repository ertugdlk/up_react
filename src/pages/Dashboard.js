import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import Photo1 from '../Photo1.png'
import Door from "../logout-icon.png"
import Bag from '../bag_icon.png'
import searchicon from '../search_icon.png'
import Cart from "../shopping-cart.png"
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
  getFreeGameRooms,
  getPaidGameRooms,
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
import Payment from '../components/UI/Payment'

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
  const [avatar,setAvatar] = useState([])
  const [balance, setBalance] = useState(0)

  const [paymentModal, setPaymentModal] = useState(false)

  const [freeGameList, setFreeGameList] = useState([])
  const [paidGameList, setPaidGameList] = useState([])

  const [isFreeGame, setIsFreeGame] = useState(true)

  useEffect(() => {
    const getApiUrl = window.location.href.split('api=')[1]
    if (getApiUrl) {
      console.log('Current Path', getApiUrl)
      axios.defaults.baseURL = getApiUrl
    }
  }, [])

  const handPaymentModalOpen = () => {
    setPaymentModal(true)
  }
  const handPaymentModalClose = () => {
    setPaymentModal(false)
  }

  const changeGameMethodToFree = () => {
    setIsFreeGame(true)
  }
  const changeGameMethodToPaid = () => {
    setIsFreeGame(false)
  }

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
    props.getFreeGameRooms()
    props.getPaidGameRooms()
    /* -------------------------------------------------------------------------- */

    socket.on('hostChanged', ({ host, newHost }) => {
      try {
        props.changeGameHost(host, newHost)
        if (selectedHost == host) {
          setSelectedHost(newHost)
        }
      } catch (err) {
        throw new Error("Couldn't change room data")
      }
    })

    socket.on('HostLeft', async ({ host, newHost }) => {
      try {
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
      } catch (err) {
        throw new Error("Couldn't change room data")
      }
    })

    socket.on('roomDeleted', ({ host }) => {
      try {
        props.removeGameRoom(host)
      } catch (err) {
        throw new Error("Couldn't delete room")
      }
    })

    socket.on('userCountChange', (data) => {
      try {
        props.getMatchData(data.host, data.positive)
      } catch (err) {
        throw new Error("Couldn't change room data")
      }
    })

    socket.on('newRoom', (data) => {
      try {
        props.addNewGame(data)
      } catch (err) {
        throw new Error("Couldn't create room")
      }
    })

    socket.on('roomData', (data) => {
      try {
        setRoomResponse(data)
        setGameRoom(true)
        handleRoomOpen()
      } catch (err) {
        throw new Error("Couldn't get room data")
      }
    })

    socket.on('roomCreated', (data) => {
      try {
        setSelectedHost(data.host)
        setRoomResponse(data)
        setGameRoom(true)
        handleRoomOpen()
      } catch (err) {
        throw new Error("Couldn't make the required changes")
      }
    })

    socket.on('Error', (msg) => {
      try {
        setErrorMessage(msg)
        setErrorBar(true)
      } catch (err) {
        throw new Error("Couldn't set the error message")
      }
    })

    socket.on('openedRoom', (data) => {
      try {
        setSelectedHost(data.room.host)
        if (data.room.host == data.nickname) {
          setHost(true)
        }
        setRoomResponse(data.room)
        setReturnButton(true)
      } catch (err) {
        throw new Error("Couldn't open room")
      }
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
        throw new Error("Couldn't get user info")
        //history.push("/")
      }
    }

    async function userGames() {
      try {
        const url = 'detail/games'
        const response = await axios.get(url, { withCredentials: true })
        if (!response.data.output) {
          setMenubarGames(response.data)
        } else {
          return history.push('/')
        }
      } catch (err) {
        throw new Error("Couldn't get your games")
      }
    }

    async function userSteam() {
      try {
        const url = 'detail/info'
        const response = await axios.get(url, { withCredentials: true })
        if (props.steam) {
          if (props.steam == response.data) {
            setErrorMessage('Your Steam Integrated to our system')
            setErrorBar(true)
          } else {
            setErrorMessage('no match')
            setErrorBar(true)
          }
        }
      } catch (err) {
        throw new Error("Couldn't get your Steam info")
      }
    }

  async function userAvatar () {
    try{
    const url = "detail/steamavatar"
    const response = await axios.get(url,{withCredentials:true});
    if(response.data ===""){
      setAvatar(Logo)
    }else
      setAvatar(response.data)
  }catch(err){
    alert("We couldn't get your avatar")
  }
  }

    props.getFreeGameRooms()
    props.getPaidGameRooms()
    userInfo()
    userGames()
    userSteam()
    userAvatar()
    setGameRooomList(props.paidGames)
    setPaidGameList(props.paidGames)
    setFreeGameList(props.freeGameList)
  }, [props.roomsRedux])

  const handleSearch = (event) => {
    try {
      setSearchWord(event.target.value)
      var fiteredRoomies = props.paidGames.filter((room) => {
        if (room.host.indexOf(searchWord) !== -1) return room
      })
      setGameRooomList(fiteredRoomies)
    } catch (err) {
      throw new Error("Couldn't search!")
    }
  }

  const handleGameRoom = async (host, gameName) => {
    try {
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
    } catch (err) {
      throw new Error("Couldn't change room data")
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
    try {
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
    } catch (err) {
      throw new Error('Something went wrong')
    }
  }

  const handleReturnGame = async () => {
    try {
      const url = 'room/getdata'
      const response = await axios.post(
        url,
        { host: selectedHost },
        { withCredentials: true }
      )
      setRoomResponse(response.data)
      setGameRoom(true)
      handleRoomOpen()
    } catch (err) {
      throw new Error("Couldn't process your request")
    }
  }

  const handleCreateRoom = (data) => {
    try {
      data.host = userName
      setCreate(false)
      setHost(true)
      socket.emit('create', data)
      // props.getAllGameRooms();
    } catch (error) {
      throw new Error("Couldn't create room")
    }
  }

  const handleLogout = () => {
    try {
      async function logout() {
        const url = 'auth/logout'
        await axios.get(url, { withCredentials: true })
      }

      // setAnchorEl(null);
      logout()
      history.push('/')
    } catch (err) {
      throw new Error("Couldn't change room data")
    }
  }

  
  const handleSteam = () => {
    try {
      async function steamauth() {
        window.open(baseUrl + 'steam/auth', '_self')
      }
      steamauth()
    } catch (err) {
      throw new Error("Couldn't process your request")
    }
  }

  const handleCloseRoom = () => {
    setGameRoom(false)
  }

  const handleMapSelectClose = () => {
    setMapSelect(false)
  }

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
                  <img style={{ width: '187px', height: '50px' }} src={Logo} />
                </a>
              </div>
              <div className="shop">
                <img src={Cart} alt="shopping-cart" className="shopping-cart-img"></img>
                <span className="shop-text">MARKET</span>
              </div>
              <div className='HeaderRightMenu'>
              <div className="header-user">
              <img src={avatar} className="img-responsive-header" alt="User-pic"></img>
              <div>
              <button class="header-nickname" onClick={handleAccount}>{userName}</button>
              </div>
              </div>
                <button onClick={handleLogout} className="logout-button"> <img src={Door} className="logout-icon" alt="Logout"></img></button>
              </div>
            </Grid>
          </div>

          <div className='Container'>
            <div className='Slider'>
              <img className='img1' src={Photo1}></img>
            </div>
            <div className='GameFilter'>
              <button className='open-games' onClick={changeGameMethodToPaid}>
                Paid Games
              </button>
              <button
                className='private-games'
                onClick={changeGameMethodToFree}
              >
                Free Games
              </button>
              <div className='search-game'>
                <img src={searchicon} className='search-image'></img>
                <input
                  onChange={(e) => handleSearch(e)}
                  onKeyUp={(e) => handleSearch(e)}
                  value={searchWord}
                  className='search-gameID'
                  placeholder='Search Host Nickname'
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
            {/* <GameRoomRow
              data={props.roomsRedux}
              onJoin={(host, gameName) => handleGameRoom(host, gameName)}
            ></GameRoomRow> */}
            {isFreeGame ? (
              <>
                <GameRoomRow
                  type='FREE'
                  data={props.freeGames}
                  onJoin={(host, gameName) => handleGameRoom(host, gameName)}
                ></GameRoomRow>
                <div>FREEEEEEEEEEEEEEEEEEEEEEEEEEEEE</div>
              </>
            ) : (
              <GameRoomRow
                type='PAID'
                data={props.paidGames}
                onJoin={(host, gameName) => handleGameRoom(host, gameName)}
              ></GameRoomRow>
            )}
          </div>

          {/* -------------------------------- LEFT PANE ------------------------------- */}

          <LeftPane
            userName={userName}
            handleAddGame={handleAddGame}
            handleVerificationForm={handleVerificationForm}
            handleVerificationFormClose={handleVerificationFormClose}
            verificationForm={verificationForm}
            balance={balance}
            handPaymentModalOpen={handPaymentModalOpen}
          />

          {/* -------------------------------- LEFT PANE ------------------------------- */}

          <div className='SocialBar'></div>
        </div>
      ) : null}
      <Payment
        paymentModal={paymentModal}
        handPaymentModalClose={handPaymentModalClose}
      />
    </>
  )
  //deposit ve withdraw butonlarÄ±na geÃ§ici olarak handleAccount fonksiyonu atandÄ±, para iÅŸlemleri entegre edilince dÃ¼zeltilmeli.
  //sidebar menÃ¼de username gÃ¶steriliyor olmalÄ± ama maili tutmadÄ±ÄŸÄ±mÄ±z iÃ§in o gÃ¶zÃ¼kmÃ¼yor, dÃ¼zeltilmeli.
  //balance'a ÅŸimdilik kendim bir deÄŸer girdim ama daha sonra kullanÄ±cÄ±nÄ±n deÄŸeri {balance} veya baÅŸka bir ÅŸekilde gÃ¶sterilmeli.
}

const mapStateToProps = (state) => {
  return {
    roomsRedux: state.roomsRedux,
    freeGames: state.freeGames,
    paidGames: state.paidGames,
    matchData: state.matchInfo,
  }
}

export default connect(mapStateToProps, {
  getAllGameRooms,
  addNewGame,
  getMatchData,
  changeGameHost,
  removeGameRoom,
  getFreeGameRooms,
  getPaidGameRooms,
})(Dashboard)
