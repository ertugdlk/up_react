import React, { useState, useEffect, useRef } from "react"
import axios from "../utils"
import css from "../components/css/Room.css"
import Logo from "../logo.png"
import ClearIcon from "@material-ui/icons/Clear"
import ReportIcon from "@material-ui/icons/Report"
import CachedIcon from "@material-ui/icons/Cached"
import close from "../close.png"
import crown from "../crown.png"
import { Segment, SegmentGroup } from "semantic-ui-react"
import Countdown from "react-countdown"
import Snackbar from "@material-ui/core/Snackbar"
import { SnackbarContent } from "@material-ui/core"
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const Axios = require("axios")
const _ = require("lodash")

const useStyles = makeStyles((theme) => ({
  dialogComponent: {
    width: '85.1vw',
    height:'fit-content',
    marginLeft: '8%',
    marginRight: '8%',
    backgroundColor:'black',
    '@media (max-width:1400px)': {
      width: '82.7%',
      marginLeft: '8.6%',
      marginRight: '6%',
      color: 'white',
      backgroundColor: 'black',
    },
    '@media (max-width: 1399)': {
      width: '58.7%',
      marginLeft: '4.6%',
      marginRight: '6%',
    },
    '@media (max-width:1299px)': {
      width: '82.7%',
      marginLeft: '8.6%',
      marginRight: '6%',
    },
    '@media (max-width:1000px)': {
      width: '68.1%',
      marginLeft: '17%',
      marginRight: '5%',
    },
  },
}))

function Room(props) {
  const [chat, setChat] = useState(true)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")
  const [team1, setTeam1] = useState([])
  const [team2, setTeam2] = useState([])
  const [startButton, setStartButton] = useState(false)
  const [start, setStart] = useState(false)
  const [gameInformation, setGameInformation] = useState("")
  const [host, setHost] = useState("")
  let chatRef = useRef()
  const [snackbar, setSnackbar] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState("")
  const [sure, setSure] = useState(false)
  const [report, setReport] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState("")
  const [openModal,setOpenModal] = useState (true)
  const [fullWidthModal, setFullWidthModal] = useState('sm')
  const classes = useStyles()

  useEffect(() => {
    async function RoomUsers() {
      if (!props.roomResponse.users) {
        setErrorMessage("no room with this host")
        setSnackbar(true)
      } else {
        const allusers = props.roomResponse.users
        const team1users = _.filter(allusers, function (user) {
          return user.team == 1
        })
        setTeam1(team1users)
        const team2users = _.filter(allusers, function (user) {
          return user.team == 2
        })
        setTeam2(team2users)
      }
    }

    async function CheckReadyStatus() {
      const limit = parseInt(props.roomResponse.settings.type.charAt(0)) * 2
      if (props.roomResponse.readyCount === limit) {
        if (props.nickname == props.host) {
          setStartButton(true)
          setErrorMessage("All players are Ready")
          setSnackbar(true)
        }
      }
    }
    setHost(props.host)

    RoomUsers()
    CheckReadyStatus()
  }, [])

  useEffect(() => {
    props.socket.on("newMessage", (data) => {
      try {
        setMessages((messages) =>
          messages.concat({ nickname: data.nickname, msg: data.message })
        )
      } catch (err) {
        throw err
      }
    })

    props.socket.on("countdownStart", (data) => {
      try {
        setStart(true)
      } catch (error) {
        throw error
      }
    })

    props.socket.on("GameReadyStatus", (data) => {
      if (props.nickname == data.host) {
        if (data.msg == "all_ready") {
          setStartButton(true)
          setErrorMessage("all_ready")
          setSnackbar(true)
        } else {
          setStart(false)
          setStartButton(false)
          setErrorMessage(data.msg)
          setSnackbar(true)
        }
      } else {
        if (data.msg == "all_ready") {
        } else {
          setStart(false)
        }
      }
    })

    props.socket.on("newUserJoined", (data) => {
      if (data.nickname != props.nickname) {
        if (data.team == 1) {
          setTeam1((team1) =>
            team1.concat({
              nickname: data.nickname,
              team: data.team,
              readyStatus: data.readyStatus,
            })
          )
        } else {
          setTeam2((team2) =>
            team2.concat({
              nickname: data.nickname,
              team: data.team,
              readyStatus: data.readyStatus,
            })
          )
        }
      }
    })

    props.socket.on("UserLeft", (user) => {
      var teamArr
      if (user.team === 1) {
        teamArr = team1
        _.remove(teamArr, (team1member) => {
          return team1member.nickname == user.nickname
        })
        setTeam1(teamArr)
      } else {
        teamArr = team2
        _.remove(teamArr, (team2member) => {
          return team2member.nickname == user.nickname
        })
        setTeam2(teamArr)
      }
    })

    props.socket.on("HostLeft", async ({ host, newHost }) => {
      const url = "room/getdata"
      const response = await axios.post(
        url,
        { host: newHost.nickname },
        { withCredentials: true }
      )
      const allusers = response.data.users
      const team1users = _.filter(allusers, function (user) {
        return user.team == 1
      })
      setTeam1(team1users)
      const team2users = _.filter(allusers, function (user) {
        return user.team == 2
      })
      setTeam2(team2users)

      setHost(newHost.nickname)
    })

    props.socket.on("userKicked", ({ nickname, team, host }) => {
      if (props.nickname == nickname) {
        const data = { nickname: props.nickname, host: host }
        props.socket.emit("leave", data)
        window.location.reload()
      }
    })

    props.socket.on("readyChange", async (data) => {
      const url = "room/getdata"
      const response = await axios.post(
        url,
        { host: data.host },
        { withCredentials: true }
      )
      const allusers = response.data.users
      const team1users = _.filter(allusers, function (user) {
        return user.team == 1
      })
      setTeam1(team1users)
      const team2users = _.filter(allusers, function (user) {
        return user.team == 2
      })
      setTeam2(team2users)
    })

    props.socket.on("teamChange", async (data) => {
      try {
        const url = "room/getdata"
        const response = await axios.post(
          url,
          { host: props.host },
          { withCredentials: true }
        )
        const allusers = response.data.users
        const team1users = _.filter(allusers, function (user) {
          return user.team == 1
        })
        setTeam1(team1users)
        const team2users = _.filter(allusers, function (user) {
          return user.team == 2
        })
        setTeam2(team2users)
      } catch (err) {
        throw err
      }
    })
  }, [])

  const handleCancelButton = () => {
    setSure(false)
  }

  const handleReportCancel = () => {
    setReport(false)
  }

  const handleSendMessage = () => {
    const data = { host: props.host, nickname: props.nickname, msg: message }
    props.socket.emit("message", data)
    chatRef.current.value = ""
  }

  const handleTeamSwap = () => {
    const data = { host: props.host, nickname: props.nickname }
    props.socket.emit("changeTeam", data)
  }

  const handleReady = () => {
    const data = { host: props.host, nickname: props.nickname }
    props.socket.emit("ready", data)
  }

  const handleStart = () => {
    const data = { host: props.host }
    props.socket.emit("countdown", data)
  }

  const handleSureWindow = (nickname) => {
    setReport(false)
    setSure(true)
    setSelectedPlayer(nickname)
  }

  const handleReportWindow = (nickname) => {
    setSure(false)
    setReport(true)
    setSelectedPlayer(nickname)
  }

  const handleKick = () => {
    const data = { host: host, nickname: selectedPlayer }
    props.socket.emit("kick", data)
    setReport(false)
  }

  const handleReport = () => {
    const data = { nickname: selectedPlayer }
    props.socket.emit("report", data)
    setSure(false)
  }

  const handleStartMatch = async () => {
    try {
      setGameInformation("213.243.44.6")
      const url = "rcon/setupmatch"
      const response = await axios.post(
        url,
        { host: props.host },
        { withCredentials: true }
      )
    } catch (error) {
      throw error
    }
  }

  const checkGameInformation = () => {
    if (gameInformation != "") {
      return <span>{gameInformation}</span>
    }
    if (start) {
      return (
        <Countdown
          date={Date.now() + 10000}
          onComplete={() => handleStartMatch()}
        />
      )
    }
    if (start) {
      return (
        <Countdown
          date={Date.now() + 10000}
          onComplete={() => handleStartMatch()}
        />
      )
    } else {
      return <img className="map" src={Logo}></img>
    }
  }

  const handleHost = (member) => {
    if (host === member.nickname) {
      return "HOST"
    } else {
      return ""
    }
  }

  const handleLeaveRoom = () => {
    const user1 = _.find(team1, (member) => {
      return member.nickname == props.nickname
    })

    const user2 = _.find(team2, (member) => {
      return member.nickname == props.nickname
    })

    const temp = !user1 ? user2 : user1

    if (temp.readyStatus === true) {
      if (host === props.nickname) {
        const data = { nickname: props.nickname, host: host }
        props.socket.emit("leave", data)
        window.location.reload()
      } else {
        setErrorMessage("Before quit, change your ready status")
        setSnackbar(true)
      }
    } else {
      const data = { nickname: props.nickname, host: host }
      props.socket.emit("leave", data)
      window.location.reload()
    }
  }

  const handleSnack = () => {
    setSnackbar(false)
  }

  const checkHostOrNot = () => {
    if (props._host == true) {
      return true
    }

    if (host == props.nickname) {
      return true
    } else {
      return false
    }
  }


    const handleCloseModal = () =>{
      setOpenModal(false)
    }

  return (
    <>
       <Dialog
        className={classes.dialogComponent}
        fullWidth={fullWidthModal}
        maxWidth={false}
        open={openModal}
      >
        <Snackbar
          open={snackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={1000}
          message={ErrorMessage}
          onClose={handleSnack}
        >
          <SnackbarContent
            style={{
              backgroundColor: "#00ff60",
              color: "black",
              justifyContent: "center",
              fontWeight: "bolder",
              fontSize: "14px",
            }}
            message={<span id="client-snackbar">{ErrorMessage}</span>}
          />
        </Snackbar>
        <DialogContent>
          <Grid container>
            <Grid item>
              <div className='team-1'>
                <button onClick={handleTeamSwap} className='team-buttons'>
                  <CachedIcon
                    className='change-icon'
                    fontSize='small'
                  ></CachedIcon>
                  TEAM 1
                </button>
                <ul>
                  {team1.map((member) => {
                    var user = member.nickname
                    return (
                      <li className='team-users'>
                        {' '}
                        <span className='host-status'>
                          {handleHost(member)}
                        </span>{' '}
                        <span className='team-user'> {member.nickname} </span>{' '}
                        <div className='ready-status'>
                          {member.readyStatus ? 'Ready' : 'Unready'}
                        </div>
                        {host == props.nickname ? (
                          <img
                            src={close}
                            className='kick-icon'
                            onClick={() => handleSureWindow(user)}
                          ></img>
                        ) : null}
                        <ReportIcon
                          className='report-icon'
                          fontSize='small'
                          onClick={() => handleReportWindow(user)}
                        ></ReportIcon>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Grid>
            <Grid item>
              <div className='detail-and-button-container'>
                <div className='map-photo'>{checkGameInformation()}</div>
                <div className='gameDetails'>
                  <span>Game Details</span>
                  <div>
                    {props.roomResponse.settings.map}
                    {props.roomResponse.settings.type}
                  </div>
                </div>
                <div className='buttons-group'>
                  {checkHostOrNot() ? null : (
                    <button onClick={handleReady} className='ready-button'>
                      READY
                    </button>
                  )}
                  {startButton ? (
                    <button className='ready-button' onClick={handleStart}>
                      START
                    </button>
                  ) : host === props.nickname ? (
                    <button className='ready-button-start-disabled' disabled>
                      START
                    </button>
                  ) : null}
                  <button className='ready-button' onClick={handleLeaveRoom}>
                    LEAVE
                  </button>
                </div>
              </div>
            </Grid>
            <Grid item>
              <div className='team-2'>
                <button onClick={handleTeamSwap} className='team-buttons'>
                  {' '}
                  <CachedIcon
                    className='change-icon'
                    fontSize='small'
                  ></CachedIcon>
                  TEAM 2
                </button>
                <ul>
                  {team2.map((member) => {
                    var user = member.nickname
                    return (
                      <li className='team-users'>
                        {' '}
                        <span>{handleHost(member)}</span>{' '}
                        <span className='team-user'> {member.nickname} </span>{' '}
                        <div className='ready-status'>
                          {member.readyStatus ? 'Ready' : 'Unready'}
                        </div>
                        {host == props.nickname ? (
                          <img
                            src={close}
                            className='kick-icon'
                            onClick={() => handleSureWindow(user)}
                          ></img>
                        ) : null}
                        <ReportIcon
                          className='report-icon'
                          fontSize='small'
                          onClick={() => handleReportWindow(user)}
                        ></ReportIcon>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Grid>
            <Grid item>
              <div className='chat-holder'>
                <div className='chat'>
                  <div className='chat-field'>
                    {messages.map((message) => {
                      return (
                        <span className='chat-message'>
                          {message.nickname}: {message.msg}
                        </span>
                      )
                    })}
                  </div>
                  <div className='chat-utils'>
                    <input
                      className='chat-input'
                      ref={chatRef}
                      onChange={(e) => setMessage(e.target.value)}
                    ></input>
                    <button className='chat-send' onClick={handleSendMessage}>
                      SEND
                    </button>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Room
