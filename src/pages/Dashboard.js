import React, {useEffect,useState} from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import Photo1 from '../Photo1.png'
import {Grid , Button , Container } from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Menu, MenuItem} from '@material-ui/core'
import Css from '../components/css/Dashboard.css'
import { useHistory } from "react-router-dom"; 
import GameRoomRow from '../components/Common/GameRoomRow'
import MyAccount from '../components/MyAccount'
const Axios = require('axios')

function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuBar, setmenuBar] = React.useState('')
  const [userName, setUsername] = React.useState('')
  const [account, setAccount] = useState(false);
  const [rooms, setRooms]  =  useState([])
  const history = useHistory();
  const socketio = require('socket.io-client') 
  
  const socket = socketio('http://localhost:5000/', {transports: ['websocket'], upgrade: false , autoConnect: false})

  socket.open()

  useEffect( async ()=> {
    const arr = [{ GameId: '123', GameName: 'CSGO', GameMap: 'DUST2', GameType: '1V1', EntryFee: '10USD', Reward: '15USD', CreatedAt: '12.11.2020', Host: 'ERCE' }]
    setRooms(arr)
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
    setAccount(true)
  };

  const handleClickAway = () => {
    setAccount(false)
  }

  const handleLogout = () => {
    history.push("/");
  }

  const createRoom = () => {
    const gameobject = { GameId: '123', GameName: 'CSGO', GameMap: 'DUST2', GameType: '1V1', EntryFee: '10USD', Reward: '15USD', CreatedAt: '12.11.2020', Host: 'ERCE' }
    //socket.emit("create" , gameobject )
  }
    return(
        <>
        <GlobalStyle></GlobalStyle>
        <div className='Header'>
          <Grid zIndex={999} >
            <LogoSize>
            <img src={Logo}/>
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
            <img src ={Photo1} className='img1'></img>
          </div>
          <div className='Games'>
              <button className='Create' onClick={createRoom}> Create Game </button>
              <div className='GameRoomHeader'>
                <span >Room</span>
                <span >Game</span>
                <span >Time</span>
                <span >Type</span>
                <span >Host</span>
                <span  >Map</span>
                <span >Fee</span>
                <span >Reward</span>
              </div>
                  <GameRoomRow data = {rooms}></GameRoomRow>
          </div>
          {account ? <MyAccount></MyAccount> : null}
        </div>

        <div className='MenuBar'>
          <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center">
          </Grid>
          <PlayButton>Play</PlayButton>
          <button className='News'>News</button>
        </div> 
        </>
    )

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

const PlayButton = styled.button`
    width: 140px;
    height: 50px;
    border: none;
    position:relative;
    color: #000000;
    font-size: 17px;
    font-weight: 400;
    line-height: 40px;
    color: #f1f1f1;
    background-color: #16161b;
    &:hover {
      background-color: #00ff60;
      border-color: #f1f1f1;
      color: #000000;
  }
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