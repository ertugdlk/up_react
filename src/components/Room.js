import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils';

import css from '../components/css/Room.css';
import Logo from '../logo.png';
import ClearIcon from '@material-ui/icons/Clear';
import Chatbox from '../components/Chatbox'

const Axios = require('axios');

function Room(props) {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(true);
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [team1,setTeam1] = useState([])
  const [team2,setTeam2] = useState([])

  useEffect(() => {
    async function RoomUsers() {
      const url = 'room/getdata';
      const body = { host: props.host };
      const response = await axios.post(url, body, { withCredentials: true });
      if (!response.data.users) {
        alert('no room with this host');
      } else {
        setUsers(response.data.users);
      }
    }

    RoomUsers();
  }, []);

  return (
    <>
      <div className='room-window'>
      <div className='CloseButton1'>
          {' '}
        </div>
        <div className='components'>
          <div className='team-1'>
            <h3 className="team-1-members">TEAM 1</h3>
            <ul>
            {team1.map((team1user) => (
              <li
                className='team-1-member'
              >{team1user.data}
              </li>))}
            </ul>
          </div>
          <div className='map-photo'>
          <img src={Logo} />
          </div>
          <div className='team-2'>
          <h3 className="team-2-members">TEAM 2</h3>
            <ul>
            {team2.map((team2user) => (
              <li
                className='team-2-member'
              >{team2user.data}
              </li>))}
            </ul>
          </div>
          <div className='gameDetails'>
            <span>Game Details</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Room;
