/* ------------------------------ MAIN IMPORTS ------------------------------ */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
/* -------------------------------------------------------------------------- */

/* --------------------------------- IMAGES --------------------------------- */
import Logo from "../../logo.png"
import Bag from "../../bag_icon.png"
import Support from "../../life-ring.png"
import Pencil from "../../pencil.png"
import Discord from "../../discord.png"
/* -------------------------------------------------------------------------- */

/* ------------------------------- APP IMPORTS ------------------------------ */
import MenuBarGame from '../../components/MenuBarGame'
import { getAllUserGames } from '../../actions'
import GamesList from '../GamesList'
/* -------------------------------------------------------------------------- */

/* --------------------------------- HELPERS -------------------------------- */
import axios from '../../utils'
import { baseUrl } from '../../utils/helpers'
/* -------------------------------------------------------------------------- */

/* --------------------------------- SOCKETS -------------------------------- */
const socketio = require('socket.io-client')
const socket = socketio(baseUrl, {
  transports: ['websocket'],
})
/* -------------------------------------------------------------------------- */

const LeftPane = (props) => {
  /* --------------------------------- STATES --------------------------------- */
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [userName, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [account, setAccount] = useState(false)
  const [gamesList, setGamesList] = useState(false)
  const [menubarGames, setMenubarGames] = useState([])
  const [avatar, setAvatar] = useState([])
  const [balance, setBalance] = useState([])
  const [verified, setVerified] = useState(false)
  const [steamName, setSteamName] = React.useState('')
  /* ------------ -------------------------------------------------------------- */

  const history = useHistory()

  useEffect(() => {
    userBalance()
    userAvatar()
    userGames()
    props.getAllUserGames()
    userSteam()
  }, [])

  const handleAccount = () => {
    setAnchorEl(null)
    setAccount(true)
  }

  const handleAddGame = () => {
    setGamesList(true)
  }

  async function userAvatar() {
    const url = 'detail/steamavatar'
    const response = await axios.get(url, { withCredentials: true })
    try{
    if (response.data === '') {
      setAvatar(Logo)
    } else setAvatar(response.data)
  }catch(err){
    alert("We couldn't get your avatar")
  }
  }

  async function userBalance() {
    const url = 'wallet/getbalance'
    const response = await axios.get(url, { withCredentials: true })
    try{
    if (response.data.status === 0) {
      setBalance('Not Verified')
      setVerified(false)
    } else {
      setBalance(response.data.balance)
      setVerified(true)
    }
  }catch(err){
    alert("We couldn't get your balance")
  }
  }
  async function userGames() {
    try{
    const url = 'detail/games'
    const response = await axios.get(url, { withCredentials: true })
    setMenubarGames(response.data)
    }catch(err){
    alert("We couldn't get your games")
    }
  }

  async function userSteam() {
    try{
    const url = 'detail/info'
    const response = await axios.get(url, { withCredentials: true })
    setSteamName(response.data)
    }catch(err){
    alert("We couldn't get your Steam username")
    }
  }

  return (
    <div className="MenuBar">
      <div className="menubar-user">
        <div className="menubar-userpic">
          <img src={avatar} className="img-responsive" alt="User-pic"></img>
        </div>
        <div class='menubar-nickname'>{props.userName}</div>
        <div class='menubar-nickname'>
          {' '}
          <br></br>
          <img
            height='20px'
            width='auto'
            src='https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg'
          />{' '}
          {steamName}{' '}
        </div>
        <div className='menubar-mail'>{email}</div>
        <div className='balance'>
          <img src={Bag} className='menubar-icon'></img>
          {verified ? (
            <span>{balance}</span>
          ) : (
            <button
              className='balance-button'
              onClick={props.handleVerificationForm}
            >
              {balance}
            </button>
          )}
          {verified ? (
            <button onClick={props.handPaymentModalOpen}>
              <span className='up'> UP</span>
            </button>
          ) : <button onClick={props.handleVerificationForm}>
          <span className='up'> UP</span>
        </button>}
        </div>
        <div className="menubar-buttons">
          <div className="btn-container">
          {verified? (<button onClick={props.handPaymentModalOpen}>Deposit</button>):<button onClick={props.handleVerificationForm}>Deposit</button>} 
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

      <div className="bottom-left">
        <div className="support-container">
          <img src={Support} alt="Support" className="support"></img>
          <button className="bottom-left-text">Support</button>
        </div>
        <div className="legal-conditions-container">
          <img src={Pencil} alt="Legal Conditions" className="legal-conditions"></img>
          <button disabled className="bottom-left-text">Legal Conditions</button>
        </div>
        <div className="discord-container">
          <img src={Discord} className="discord-logo" alt="Discord"></img>
        </div>
        <div className="language-container">
         <button disabled className="language">Translation component here</button>
         <span className="copyright">© unknownpros | 2020</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { userGames: state.userGames }
}

export default connect(mapStateToProps, { getAllUserGames })(LeftPane)
