import React, { useState, useEffect,useRef } from 'react';
import css from './css/CreateGame.css';
import ClearIcon from '@material-ui/icons/Clear';
import { createGlobalStyle } from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import { TextField } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import axios from "../utils"
const _ = require('lodash');

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      color: "white",
      backgroundColor:"#1b1c23",
      width:"100%",
      marginBottom:"10px",
      borderRadius:"10px",
      '& label.Mui-focused': {
        color: 'green',
      },
      '& .MuiOutlinedInput-root': {
        color:"white",
        '& fieldset': {
          //borderColor: 'red',
        },
        '&:hover fieldset': {
          //borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00ff60',
        },
      },
    },
  })
)

function CreateGame(props) {
  const [data, setData] = useState({
    name: 'CSGO',
    map: 'Dust2',
    type: '1v1',
    fee: 1,
    room: 1,
    host: '',
    createdAt: new Date().toLocaleTimeString(navigator.language, {
      hour: '2-digit',
      minute: '2-digit',
    }),
  });

  const [selectedGame, setSelectedGame] = useState({
    name: '',
    appID: '',
    img: '',
    maps: [''],
    types: [''],
  });

  const [snackbar,setSnackbar] = useState(false)
  const [errorMessage,setErrorMessage] = useState('')
  const classes = useStyles()
  let btn = useRef()

  async function userBalance () {
    const url = "wallet/getbalance"
    const response = await axios.get(url, {withCredentials:true});
    console.log(response.data.balance)
    if (response.data.status === 0){
      setErrorMessage("Please verify your account")
      setSnackbar(true)
      btn.current.setAttribute("disabled", "disabled");
    }if(response.data.balance===0){
      setErrorMessage("You don't have any credits")
      setSnackbar(true)      
      btn.current.setAttribute("disabled", "disabled");
    }
    if(response.data.balance<data.fee){
      setErrorMessage("Not enough credits")
      setSnackbar(true)
      btn.current.setAttribute("disabled", "disabled");
    }
  }

  const handleSnack = () =>{
    setSnackbar(false)
  }
  useEffect(()=>{
    userBalance();
  },[])
  useState(() => {
    setSelectedGame(props.games[0]);
  });

  const onMapChange = (e) => {
    setData({ ...data, map: e.target.value });
  };
  const onTypeChange = (e) => {
    setData({ ...data, type: e.target.value });
  };
  const onFeeChange = (e) => {
    setData({ ...data, fee: e.target.value });
  };

  const onGameChange = (e) => {
    const selGame = _.find(props.games, function (game) {
      const selname = _.get(e.target, e.target.value);
      return game.name == selname.label;
    });
    setSelectedGame(selGame);
  };

  return (
    <>
     <Snackbar
          open={snackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={3000}
          message={errorMessage}
          onClose={handleSnack}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#00ff60',
              color: 'black',
              justifyContent: 'center',
              fontWeight: 'bolder',
              fontSize: '14px',
            }}
            message={<span id='client-snackbar'>{errorMessage}</span>}
          />
        </Snackbar>
      {' '}
      <GlobalStyle></GlobalStyle>
      <div className='CreateWindow'>
        <div className='CloseButton1'>
          {' '}
          <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon>{' '}
        </div>
        <h2 className='head'>Create Game</h2>
        <div className='CreateRow'>
          <label className='labels'>Game Selection</label>
          <select className='create-select' onChange={(e) => onGameChange(e)}>
            {props.games.map((game, index) => (
              <option className='create-option' value={index}>
                {' '}
                {game.name}
              </option>
            ))}
          </select>
        </div>
        <div className='CreateRow'>
          <label className='labels'>Map</label>
          <select className='create-select' onChange={(e) => onMapChange(e)}>
            {selectedGame.maps.map((map) => (
              <option className='create-option' value={map}>
                {' '}
                {map}
              </option>
            ))}
          </select>
        </div>
        <div className='CreateRow'>
          <label className='labels'>Type</label>
          <select className='create-select' onChange={(e) => onTypeChange(e)}>
            {selectedGame.types.map((type, index) => {
              return(
                          <option className='create-option' value={type}>
                            {' '}
                            {type}
                          </option>)
            }
            )}
          </select>
        </div>
        <div className='CreateRow'>
          <TextField
            variant="outlined"
            placeholder="Fee"
            onChange={(e) => onFeeChange(e)}
            className={classes.root}
          />
        </div>
        <button class="button"  ref={btn} onClick={() => props.onCreate(data)}>
            Create Game
          </button>
      </div>
    </>
  );
}

export default CreateGame;
