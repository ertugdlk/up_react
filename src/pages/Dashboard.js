import React, { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Logo from '../logo.png';
import Photo1 from '../Photo1.png';
import Bag from '../bag_icon.png';
import searchicon from '../search_icon.png';
import Filter from '../filter_icon.png';
import { Grid } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import { Menu, MenuItem } from '@material-ui/core';
import css from '../components/css/Dashboard.css';
import { useHistory } from 'react-router-dom';
import GameRoomRow from '../components/Common/GameRoomRow';
import MyAccount from '../components/MyAccount';
import GamesList from '../components/GamesList';
import CreateGame from '../components/CreateGame';
import MenuBarGame from '../components/MenuBarGame';
import { NavigateBefore, SportsHockeyRounded } from '@material-ui/icons';
import { connect } from 'react-redux';
import {
  getAllGameRooms,
  addNewGame,
  getMatchData,
  changeGameHost,
  removeGameRoom,
} from '../actions/index';
import Room from '../components/Room';
// import { Menu } from 'semantic-ui-react';
/* --------------------------------- HELPERS -------------------------------- */
import axios from '../utils';
import { baseUrl } from '../utils/helpers';
import LeftPane from '../components/Dashboard/LeftPane';

/* -------------------------------------------------------------------------- */

const Axios = require('axios');
const socketio = require('socket.io-client');
const socket = socketio(baseUrl, {
  transports: ['websocket'],
});

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #16161b;
  }`;

function Dashboard(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [gamesList, setGamesList] = useState(false);
  const [account, setAccount] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [create, setCreate] = useState(false);
  const [menubarGames, setMenubarGames] = useState([]);
  const [gameRoom, setGameRoom] = useState(false);
  const [selectedHost, setSelectedHost] = useState('');
  const [roomResponse, setRoomResponse] = useState({});
  const [returnButton, setReturnButton] = useState(false);
  const [_host, setHost] = useState(false);
  // const [rooms, setRooms] = useState([]);
  const history = useHistory();

  useEffect(() => {
    /* --------------------------- Redux Get All Rooms -------------------------- */
    props.getAllGameRooms();
    /* -------------------------------------------------------------------------- */

    /* ------------------------------- CHANGE HOST ------------------------------ */
    // props.changeGameHost('paramHost', 'paramNewHost');
    /* -------------------------------------------------------------------------- */
    /* ------------------------------- REMOVE ROOM ------------------------------ */
    // props.removeGameRoom('game room data');
    /* -------------------------------------------------------------------------- */

    socket.on('userCountChange', (data) => {
      console.log(data);
      props.getMatchData(data.host, data.positive);
    });

    socket.on('newRoom', (data) => {
      props.addNewGame(data);
    });

    socket.on('roomData', (data) => {
      setRoomResponse(data);
      setGameRoom(true);
    });

    socket.on('roomCreated', (data) => {
      setSelectedHost(data.host);
      setRoomResponse(data);
      setGameRoom(true);
    });

    socket.on('Error', (msg) => {
      alert(msg);
    });

    socket.on('openedRoom', (data) => {
      setSelectedHost(data.room.host);
      if (data.room.host == data.nickname) {
        setHost(true);
      }
      setRoomResponse(data.room);
      setReturnButton(true);
    });
  }, []);
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function userInfo() {
      try {
        const url = 'auth/me';
        const response = await axios.get(url, { withCredentials: true });

        if (response.status == 200) {
          if (response.data.nickname) {
            setUsername(response.data.nickname);
          } else {
            if (response.data.output.statusCode == 401) {
              history.push('/');
            }
          }
        }

        socket.emit('login', response.data.nickname);
      } catch (error) {
        throw error;
        //history.push("/")
      }
    }

    async function userGames() {
      const url = 'detail/games';
      const response = await axios.get(url, { withCredentials: true });

      setMenubarGames(response.data);
    }

    async function userSteam() {
      const url = 'detail/info';
      const response = await axios.get(url, { withCredentials: true });

      if (props.steam) {
        if (props.steam == response.data) {
          alert('Your Steam Integrated to our system');
        } else {
          alert('no match');
        }
      }
    }

    userInfo();
    userGames();
    userSteam();
  }, []);

  const handleGameRoom = async (host) => {
    const data = { host: host, nickname: userName };
    socket.emit('join', data);
    setSelectedHost(host);
  };

  const handleAccount = () => {
    // setAnchorEl(null);
    setAccount(true);
  };

  const handleAddGame = () => {
    setGamesList(true);
  };

  const handleAccountClose = () => {
    setAccount(false);
  };
  const handleCreateClose = () => {
    setCreate(false);
  };

  const handleListClose = () => {
    setGamesList(false);
  };

  const handleCreateClick = () => {
    if (menubarGames.length == 0) {
      alert('Add some Games First');
    } else {
      setCreate(true);
    }
  };

  const handleReturnGame = () => {
    setGameRoom(true);
  };

  const handleCreateRoom = (data) => {
    data.host = userName;
    setCreate(false);
    setHost(true);
    socket.emit('create', data);
    // props.getAllGameRooms();
  };

  const handleLogout = () => {
    async function logout() {
      const url = 'auth/logout';
      await axios.get(url, { withCredentials: true });
    }

    // setAnchorEl(null);
    logout();
    history.push('/');
  };
  const handleSteam = () => {
    async function steamauth() {
      window.open(baseUrl + 'steam/auth', '_self');
    }
    steamauth();
  };

  const handleCloseRoom = () => {
    setGameRoom(false);
  };
  // console.log(props.roomsRedux);
  return (
    <>
      {gamesList ? <GamesList onClose={handleListClose}></GamesList> : null}
      {account ? (
        <MyAccount userName={userName} onClose={handleAccountClose}></MyAccount>
      ) : null}
      {create ? (
        <CreateGame
          onCreate={handleCreateRoom}
          onClose={handleCreateClose}
          games={menubarGames}
        ></CreateGame>
      ) : null}

      {gameRoom ? (
        <Room
          host={selectedHost}
          socket={socket}
          nickname={userName}
          roomResponse={roomResponse}
          _host={_host}
          handleCloseRoom={handleCloseRoom}
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
              Return to Existing Game
            </button>
          ) : null}
        </div>
        <GameRoomRow
          data={props.roomsRedux}
          onJoin={(host) => handleGameRoom(host)}
        ></GameRoomRow>
      </div>

      {/* -------------------------------- LEFT PANE ------------------------------- */}

      <LeftPane userName={userName} gamesList={gamesList} />

      {/* /* -------------------------------- LEFT PANE ------------------------------- */}

      <div className='SocialBar'></div>
    </>
  );
  //deposit ve withdraw butonlarına geçici olarak handleAccount fonksiyonu atandı, para işlemleri entegre edilince düzeltilmeli.
  //sidebar menüde username gösteriliyor olmalı ama maili tutmadığımız için o gözükmüyor, düzeltilmeli.
  //balance'a şimdilik kendim bir değer girdim ama daha sonra kullanıcının değeri {balance} veya başka bir şekilde gösterilmeli.
}

const mapStateToProps = (state) => {
  return {
    roomsRedux: state.roomsRedux,
    matchData: state.matchInfo,
  };
};

export default connect(mapStateToProps, {
  getAllGameRooms,
  addNewGame,
  getMatchData,
  changeGameHost,
  removeGameRoom,
})(Dashboard);
