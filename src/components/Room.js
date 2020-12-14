import React, { useState, useEffect, useRef } from 'react';
import css from '../components/css/Room.css';
const Axios = require('axios');

function Room(props) {
  const [users, setUsers] = useState([]);

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
        <div className='components'>
          <div className='team-1'>
            <ul>
              {users.map((user) => (
                <li className='team-1_users'>{user}</li>
              ))}
            </ul>
          </div>
          <div className='map-photo'>
            <figure className='map'></figure>
          </div>
          <div className='team-2'>
            <ul>
              <li className='team-2_users'>{props.host}</li>
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
