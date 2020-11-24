import React, {useEffect,useState} from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import Photo1 from '../Photo1.png'
import Bag from '../bag_icon.png'
import {Grid} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Menu, MenuItem} from '@material-ui/core'
import Css from '../components/css/Dashboard.css'
import { useHistory } from "react-router-dom"; 
import GameRoomRow from '../components/Common/GameRoomRow'
import MyAccount from '../components/MyAccount'
import GamesList from '../components/GamesList'
import CreateGame from '../components/CreateGame'
const Axios = require('axios')

function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [gamesList, setGamesList] = useState(false);
  const [account, setAccount] = useState(false);
  const [rooms, setRooms]  =  useState([])
  const [create  ,  setCreate ] =  useState(false)
  const history = useHistory();
  const socketio = require('socket.io-client') 
  
  const socket = socketio('http://localhost:5000/', {transports: ['websocket'], upgrade: false , autoConnect: false})

  socket.open()

  useEffect( async ()=> {
    const url = "http://localhost:5000/auth/me"
    const response = await Axios.get(url , {withCredentials: true})
    if(response.status == 200)
    {
      setUsername(response.data.nickname)
    }

    socket.emit('client_info' , { id: userName })
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAccount = () =>{
    setAnchorEl(null)
    setAccount(true)
  };

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

  const handleCreateClick = ()  => 
  {
    setCreate(true)
  }

  const handleCreateRoom = (data) => {
    data.host = 'phybarin'
    setCreate(false)
    const newArr = rooms
    newArr.push(data)
    setRooms(newArr)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    history.push("/");
  }


  const createRoom = () => {
    const gameobject = { GameId: '123', GameName: 'CSGO', GameMap: 'DUST2', GameType: '1V1', EntryFee: '10USD', Reward: '15USD', CreatedAt: '12.11.2020', Host: 'ERCE' }
    //socket.emit("create" , gameobject )
  }
    return(
        <>
        {gamesList ? <GamesList onClose={handleListClose}></GamesList> : null}
        {account ? <MyAccount onClose={handleAccountClose}></MyAccount> : null}
        {create ? <CreateGame onCreate={handleCreateRoom} onClose={handleCreateClose}></CreateGame> : null}
        <GlobalStyle></GlobalStyle>
        <div className='Header'>
          <Grid zIndex={999} >
            <LogoSize>
            <a  className='LogoLink'  href='/dashboard' ><img src={Logo} /></a>
            </LogoSize>
            <div style={{alignSelf:"center"}}>
            <Avatar></Avatar>
            <span className='Nickname'> {userName}</span>
            <ArrowMenu>
              <IconButton style={{ color: 'white' }} aria-label="menu" size="small" aria-haspopup="true" onClick={handleClick}>
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </ArrowMenu> 
            </div> 
             <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAccount}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        </div>

        <div className='Container'>
          <div className='Slider'>
            <img className='img1' src={Photo1}></img>
          </div>
          <div className='GameFilter'>
            <button className='Create' onClick={handleCreateClick}> Create Game </button>
          </div>
          <div className='Games'>
              <div className='GameRoomHeader'>
                <div className='GRHeaderColumn' >
                  <span>
                  Room
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Game
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Time
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Type
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Host
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Map
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Fee
                </span>
                </div>
                <div className='GRHeaderColumn' >
                  <span>
                  Reward
                </span>
                </div>
              </div>
                {
                  rooms.map( room => 
                    <GameRoomRow data={room}></GameRoomRow>
                    )
                }
          </div>
        </div>
        <div className='MenuBar'>
          <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center">
          </Grid>
          <div style={{alignSelf:"center"}}>
            <Avatar></Avatar>
            <span className='Nickname'> {userName}</span>
            <span className='Email'> {email}</span>
            <img className='BagIcon' src={Bag}/>
            
            
            </div> 
          <button className='AddGame' onClick={handleAddGame}>Add Game</button>
        </div>
        <div  className= 'SocialBar'></div>
        </>
    )
      //Line 193'teki kod için mail classı oluştur veya inline css yap
  }
const GlobalStyle = createGlobalStyle`
  body {
    background-color:#19191f;
  }
`

const LogoSize = styled.div`
  position: absolute;
  top:-40px;
  width: 130px;
  height: 40px;
`;

const Avatar = styled.div`
  width:40px;
  height:40px;
  position:absolute;
  top:10px;
  right:250px;
  border-radius: 50px;
  border: 3px solid #00ff60;
`
const ArrowMenu = styled.div`
  top:20px;
  right:80px;
  position:absolute;
`

export default Dashboard
