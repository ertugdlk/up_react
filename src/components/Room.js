import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils';
import css from '../components/css/Room.css';
import Logo from '../logo.png';
import ClearIcon from '@material-ui/icons/Clear';
import Chatbox from '../components/Chatbox'

const Axios = require('axios');
const _ = require('lodash')

function Room(props) {
  const [chat, setChat] = useState(true);
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
<<<<<<< HEAD
  const [team1, setTeam1] = useState([]);
=======
  const [team1, setTeam1] = useState([])
  const [team2,setTeam2] = useState([])
>>>>>>> b9883926dd29458e038df26bf2f7cdf0c11bb8b9

  useEffect(() => {
    async function RoomUsers() {
      const url = 'room/getdata';
      const body = { host: props.host };
      const response = await axios.post(url, body, { withCredentials: true });
      if (!response.data.users) {
        alert('no room with this host');
      } else {
        const allusers = response.data.users;
        const team1users = _.filter(allusers, function(user){
          return user.team == 1
        })
        setTeam1(team1users)
        const team2users = _.filter(allusers, function(user){
          return user.team == 2
        })
        setTeam2(team2users)
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
            <h3 className="team-headers">TEAM 1</h3>
            <ul>
                {team1.map((member) => {
                return <li className='team-users'>{member.nickname}</li>
              })}
            </ul>
          </div>
          <div className='map-photo'>
          <img className="map" src={Logo} />
          </div>
          <div className='team-2'>
          <h3 className="team-headers">TEAM 2</h3>
            <ul>
              {team2.map((member) => {
                return <li className='team-users'>{member.nickname}</li>
                  })}
            </ul>
          </div>
          <div className='gameDetails'>
            <span>Game Details</span>
          </div>
          <div className="chat">
            <span className="chat-field">chat alanı olacak</span>
            <input className="chat-input"></input>
            <button className="chat-send">SEND</button>
          </div>
          <button className="ready-button">READY</button>
        </div>
      </div>
    </>
  );
}

export default Room;
