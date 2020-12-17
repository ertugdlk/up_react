import React, { useState, useEffect, useRef } from 'react';
import css from '../components/css/Room.css';
import Logo from '../logo.png';
import ClearIcon from '@material-ui/icons/Clear';
import Chatbox from '../components/Chatbox'

const Axios = require('axios');

function Room(props) {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState(true);
  useEffect(() => {
    async function RoomUsers() {
      const url = 'http://localhost:5000/room/getdata';
      const body = { host: props.host };
      const response = await Axios.post(url, body, { withCredentials: true });
      if(!response.data.users){
        alert("no room with this host")
      }
      else{
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
          <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon>{' '}
        </div>
        <div className='components'>
          <div className='team-1'>
            <h3 className="team-headers">TEAM 1</h3>
            <ul>
                <li className='team-users'>{props.host}</li>
                <li className='team-users'>{props.host}</li>
                <li className='team-users'>{props.host}</li>
                <li className='team-users'>{props.host}</li>
                <li className='team-users'>{props.host}</li>
            </ul>
          </div>
          <div className='map-photo'>
          <img src={Logo} />
          </div>
          <div className='team-2'>
          <h3 className="team-headers">TEAM 2</h3>
            <ul>
              <li className='team-users'>{props.host}</li>
              <li className='team-users'>{props.host}</li>
              <li className='team-users'>{props.host}</li>
              <li className='team-users'>{props.host}</li>
              <li className='team-users'>{props.host}</li>
            </ul>
          </div>
          <div className='gameDetails'>
            <span>Game Details</span>
          </div>
          {chat ? (<Chatbox></Chatbox>) : null}
        </div>
      </div>
    </>
  );
}

export default Room;
