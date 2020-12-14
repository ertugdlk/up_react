/* ------------------------------ MAIN IMPORTS ------------------------------ */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
/* -------------------------------------------------------------------------- */

/* --------------------------------- IMAGES --------------------------------- */
import Logo from '../../logo.png';
import Bag from '../../bag_icon.png';
/* -------------------------------------------------------------------------- */

/* ------------------------------- APP IMPORTS ------------------------------ */
import MenuBarGame from '../../components/MenuBarGame';
import { getAllUserGames } from '../../actions';
/* -------------------------------------------------------------------------- */

/* --------------------------------- HELPERS -------------------------------- */
import axios from '../../utils';
import { baseUrl } from '../../utils/helpers';
/* -------------------------------------------------------------------------- */

/* --------------------------------- SOCKETS -------------------------------- */
const socketio = require('socket.io-client');
const socket = socketio(baseUrl, {
  transports: ['websocket'],
});
/* -------------------------------------------------------------------------- */

const LeftPane = (props) => {
  /* --------------------------------- STATES --------------------------------- */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userName, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [account, setAccount] = useState(false);
  const [gamesList, setGamesList] = useState(false);
  const [menubarGames, setMenubarGames] = useState([]);
  /* -------------------------------------------------------------------------- */

  const history = useHistory();

  useEffect(() => {
    props.getAllUserGames();
  }, []);

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
      }
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
    userSteam();
  }, []);

  const handleAccount = () => {
    setAnchorEl(null);
    setAccount(true);
  };

  const handleAddGame = () => {
    setGamesList(true);
  };

  return (
    <div className='MenuBar'>
      <div className='menubar-user'>
        <div className='menubar-userpic'>
          <img src={Logo} className='img-responsive' alt=''></img>
        </div>
        <div class='menubar-nickname'>{userName}</div>
        <div className='menubar-mail'>{email}</div>
        <div className='balance'>
          <img src={Bag} className='menubar-icon'></img>123,456
        </div>
        <div className='menubar-buttons'>
          <div className='btn-container'>
            <button onClick={handleAccount}>Deposit</button>
          </div>
          <div className='btn-container'>
            <button onClick={handleAccount}>Withdraw</button>
          </div>
        </div>
      </div>
      <button className='AddGame' onClick={handleAddGame}>
        Add Game
      </button>
      <div className='MenuBarGame'>
        <ul>
          {props.userGames.map((game) => (
            <MenuBarGame data={game}></MenuBarGame>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { userGames: state.userGames };
};

export default connect(mapStateToProps, { getAllUserGames })(LeftPane);
