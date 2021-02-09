import React, { useEffect, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { createGlobalStyle } from 'styled-components'

import CenterModal from '../components/UI/CenterModal'

const _ = require('lodash')

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function verificationForm(props) {
  return (
    <CenterModal>
      {/* <GlobalStyle></GlobalStyle>
      <div className='VerificationForm' style={{width:"300px",height:"300px",zIndex:"3000"}}>
        <div className='CloseButton1'>
          <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon>{'patates'}
        </div>
        <header className='header'>Create Game</header>
        <div className='CreateRow'>
          <label className='labels'>Game Selection</label>
          <select className='create-select'>
            {props.games.map((game, index) => (
              <option className='create-option' value={index}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
        <div className='CreateRow'>
          <label className='labels'>Map</label>
          <select className='create-select'>
          </select>
        </div>
        <div className='CreateRow'>
          <label className='labels'>Type</label>
          <select className='create-select'>
          </select>
        </div>
        <div className='CreateRow'>
          <label className='labels'>Fee</label>
          <input
            className='create-input'
          ></input>
        </div>
        <button class='button'>
          Create Game
        </button>
      </div> */}

      <p
        style={{
          backgroundColor: 'red',
          width: '300px',
          height: '300px',
          color: 'white',
        }}
      >
        TEST
      </p>
    </CenterModal>
  )
}

export default verificationForm
