import React, { useState, useEffect, useRef } from 'react';
import axios from '../utils';
import css from '../components/css/Room.css';
import Logo from '../logo.png';
import ClearIcon from '@material-ui/icons/Clear';
import { Segment, SegmentGroup } from 'semantic-ui-react';
import Countdown from 'react-countdown'

const Axios = require('axios');
const _ = require('lodash')

function Room(props) {
  const [chat, setChat] = useState(true);
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [team1, setTeam1] = useState([])
  const [team2,setTeam2] = useState([])
  const [startButton , setStartButton] = useState(false)
  const [start , setStart] = useState(false)
  const [gameInformation , setGameInformation] = useState('')

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

    RoomUsers();
  }, []);

  useEffect(() => {

    props.socket.on("newMessage" , (data) => {
      try{
        setMessages(messages => messages.concat({nickname: data.nickname,  msg:data.message}))
      }
      catch(err){
        throw err
      }
    })

    props.socket.on("countdownStart", (data)=> {
      try{
        setStart(true)
      }
      catch(error)
      {
        throw error
      }
    })

    props.socket.on("GameReadyStatus" , (data)=> {
      if(props.nickname == props.host)
      {
        if(data == 'all_ready'){
          setStartButton(true)
          alert(data)
        }
        else{
          setStart(false)
          setStartButton(false)
          alert(data)
        }
      }
      else{
        if(data == 'all_ready'){
        }
        else{
          setStart(false)
        }
      }
    })

    props.socket.on("newUserJoined", (data) => {
      if(data.nickname != props.nickname)
      {
        if(data.team == 1){
          setTeam1(team1 => team1.concat({nickname: data.nickname,  team:data.team, readyStatus: data.readyStatus}))
        }
        else{
          setTeam2(team2 => team2.concat({nickname: data.nickname,  team:data.team, readyStatus: data.readyStatus}))
        }
      }
    })

    props.socket.on("readyChange", async(data) => {
      console.log(data)
      const url = 'room/getdata';
      const response = await axios.post(url, {host: props.host},{ withCredentials: true });
      const allusers = response.data.users;
      const team1users = _.filter(allusers, function(user){
        return user.team == 1
      })
      setTeam1(team1users)
      const team2users = _.filter(allusers, function(user){
        return user.team == 2
      })
      setTeam2(team2users)
    })

    props.socket.on("teamChange", async (data) => {
      try{
        const url = 'room/getdata';
        const response = await axios.post(url, {host: props.host},{ withCredentials: true });
        const allusers = response.data.users;
        const team1users = _.filter(allusers, function(user){
          return user.team == 1
        })
        setTeam1(team1users)
        const team2users = _.filter(allusers, function(user){
          return user.team == 2
        })
        setTeam2(team2users)

        /*
        if(data.oldTeam == 1)
        {
          var tempTeam = team1
          var removedTeam = _.remove(tempTeam, (teamMember) => {
            return teamMember == data.nickname
          })

          setTeam1(tempTeam)

          setTeam2(team2 => team2.concat(data.nickname))
        }
        else{
          var tempTeam = team2
          var removedTeam = _.remove(tempTeam, (teamMember) => {
            return teamMember == data.nickname
          })

          setTeam1(tempTeam)

          setTeam1(team1 => team1.concat(data.nickname))
        }
        */
      }
      catch(err)
      {
        throw err
      }
    })
  }, [])

  const handleSendMessage = () => {
    const data = {host: props.host, nickname: props.nickname, msg: message}
    props.socket.emit("message", (data))
  }

  const handleTeamSwap = () => {
    const data = {host: props.host, nickname: props.nickname}
    props.socket.emit("changeTeam" , (data))
  }

  const handleReady = () => {
    const data = {host: props.host, nickname: props.nickname}
    props.socket.emit("ready" , (data))
  }

  const handleStart = () =>{
    const data = {host: props.host}
    props.socket.emit("countdown", (data))
  }

  const handleStartMatch = async () => {
    const url = 'rcon/setupmatch'
    const response = await axios.post(url, {host:props.host} , {withCredentials: true })
    setGameInformation(response.data.server)
  }

  const checkGameInformation = () => {
    if(gameInformation !== ''){
      return gameInformation
    }
    if(start)
    {
      return <Countdown  date={Date.now() + 10000} onComplete={ () => handleStartMatch()} />
    }
    else{
      return <img className='map' src={Logo}></img>
    }

  }

  return (
    <>
      <div className='room-window'>
      <div className='CloseButton1'>
          {' '}
        </div>
        <div className='components'>
          <div className='team-1'>
            <button onClick={handleTeamSwap} className="team-buttons">TEAM 1</button>
            <ul>
                {team1.map((member) => {
                return <li className='team-users'>{member.nickname} {member.readyStatus ? 'Ready' : 'Unready'}</li>
              })}
            </ul>
          </div>
          <div className='map-photo'>
              {checkGameInformation()}
          </div>
          <div className='team-2'>
          <button onClick={handleTeamSwap} className="team-buttons">TEAM 2</button>
            <ul>
              {team2.map((member) => {
                return <li className='team-users'>{member.nickname} {member.readyStatus ? 'Ready' : 'Unready'}</li>
                  })}
            </ul>
          </div>
          <div className='gameDetails'>
            <span>Game Details</span>
          </div>
          <SegmentGroup>
            <Segment>
            <div className="chat">
            <div className= "chat-field">
                  {messages.map((message) => {
                    return <span className="chat-message">{message.nickname}: {message.msg}</span>
                  })}
            </div>
          </div>
          </Segment>
          <input className="chat-input" onChange={ (e) => setMessage(e.target.value)}></input>
            <button className="chat-send" onClick={handleSendMessage}>SEND</button>
          </SegmentGroup>
          {props._host ? null : <button onClick={handleReady} className="ready-button">READY</button> }
          {startButton ? <button className="ready-button" onClick={handleStart}>START</button> : null }
        </div>
      </div>
    </>
  );
}

export default Room;
