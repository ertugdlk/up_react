import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'
import Logo from '../logo.png'
import css from '../components/css/GamesList.css'
import { Photo } from '@material-ui/icons'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`


function GamesList(props) 
{

    return(
        <>
           <GlobalStyle></GlobalStyle>
          <div className='GamesList'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
            <div class="wrapper">

<div className="cards">

  <figure className="card">

    <img src="https://steamcdn-a.akamaihd.net/steam/apps/730/library_600x900.jpg?t=1604621079" />

  </figure>

  <figure className="card">

    <img src="https://steamcdn-a.akamaihd.net/steam/apps/252950/library_600x900.jpg?t=1600797256" />

  </figure>

  <figure className="card">

    <img src="https://steamcdn-a.akamaihd.net/steam/apps/578080/library_600x900.jpg?t=1603246099" />

  </figure>

</div>
</div>
    </div>
        </>
    )
}

export default GamesList