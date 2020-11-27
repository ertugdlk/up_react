import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear';
import css from '../components/css/MyAccount.css'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`


function MyAccount(props) 
{

    return(
        <>
           <GlobalStyle></GlobalStyle>
          <div className='MyAccount'>
            <div className='CloseButton1'> <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon> </div>
        <div className='emailLine'>
        <label>Email</label>
          <Button>Edit</Button>
        </div>
        <div className='usernameLine'>
        <label>Username</label>
            <Button>Edit</Button>
        </div>
        </div>
        </>
    )
}

const Button = styled.button`
display:flex;
color: #000;
background-color: #00FF60;
font-size: 1em;
border: 2px solid #00ff60;
border-radius: 8px;
height:10%;
width:75px;
margin: 10% 20%;
padding: 0;
justify-content:center;
align-items:center;

&:hover {
  background-color: #16161b;
  color: #f1f1f1;
  border-color: #f1f1f1;
}
`;

export default MyAccount