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
import GamesList from '../GamesList';
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
    userGames();
    props.getAllUserGames();
  }, []);

  const handleAccount = () => {
    setAnchorEl(null);
    setAccount(true);
  };

  const handleAddGame = () => {
    setGamesList(true);
  };

  async function userGames() {
    const url = 'detail/games';
    const response = await axios.get(url, { withCredentials: true });
    setMenubarGames(response.data);
  }

  return (
    <div className='MenuBar'>
      <div className='menubar-user'>
        <div className='menubar-userpic'>
          <img src={Logo} className='img-responsive' alt=''></img>
        </div>
        <div class='menubar-nickname'>{props.userName}</div>
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
      <button className='AddGame' onClick={props.handleAddGame}>
        Add Game
      </button>
      <div className='MenuBarGame'>
        <ul>
          {menubarGames.map((game) => (
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
