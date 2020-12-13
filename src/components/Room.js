import React, { useState, useEffect, useRef } from 'react';
import css from '../components/css/Room.css';
const Axios = require('axios');

function Room(props) {
  const [users, setUsers] = useState([]);

  useEffect( () => {
    async function RoomUsers() {
      const url = 'http://localhost:5000/room/getdata';
      const body = {hosy: props.host}
      const response = await Axios.post(url, body ,{ withCredentials: true });
      setUsers(response.data.users);
      console.log(response)
    }

    RoomUsers()
  } , [])
  return (
    <>
    <div className="room-window">
    <div className="components">
      <div className="team-1">
          <ul>
           {users.map((host) => (
              <li data={host} className="team-1_users"></li>
            ))}
          </ul>
        </div>
        <div className="map-photo">
          <figure className="map">
          </figure>
        </div>
      <div className="team-2">
      <ul>
            {users.map((host) => (
              <li data={host} className="team-2_users"></li>
            ))}
          </ul>
      </div>
      <div className="gameDetails">
        <span>Game Details</span>
      </div>
      </div>
      </div>
    </>
  );
}

export default Room;
