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
  const [team1, setTeam1] = useState([])
  const [team2,setTeam2] = useState([])

  useEffect(() => {
    async function RoomUsers() {
      if (!props.roomResponse.users) {
        alert('no room with this host');
      } else {
        const allusers = props.roomResponse.users;
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
    props.socket.on("newMessage" , (data) => {
      try{
        setMessages(messages => messages.concat({nickname: data.nickname,  msg:data.message}))
      }
      catch(err){
        throw err
      }
    })
    RoomUsers();
  }, []);

  const handleSendMessage = () => {
    const data = {host: props.host, nickname: props.nickname, msg: message}
    props.socket.emit("message", (data))
  }


  return (
    <>
      <div className='room-window'>
      <div className='CloseButton1'>
          {' '}
        </div>
        <div className='components'>
          <div className='team-1'>
            <button className="team-buttons">TEAM 1</button>
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
          <button className="team-buttons">TEAM 2</button>
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
            <div className= "chat-field">
                  {messages.map((message) => {
                    return <span>{message.nickname}: {message.msg}</span>
                  })}
            </div>
            <input className="chat-input" onChange={ (e) => setMessage(e.target.value)}></input>
            <button className="chat-send" onClick={handleSendMessage}>SEND</button>
          </div>
          <button className="ready-button">READY</button>
        </div>
      </div>
    </>
  );
}

export default Room;
