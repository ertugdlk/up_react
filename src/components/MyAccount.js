import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`


function MyAccount() 
{

    return(
        <>
        <GlobalStyle></GlobalStyle>
        <Window>
        <Modal>
        <Title>
          Account Details
        </Title>
         <label>Nickname</label>
            <StyledInput
              type="text"
              name="userNickname"
            />
            <label>Email</label>
            <StyledInput
              type="email"
              name="userEmail"
            />
        </Modal>  
        </Window> 
        </>
    )
}

//İçeriklerin cssi
const Modal = styled.div`
  color: #fff;
  box-sizing: content-box;
  font-size: 14px;
  width:min-content;
  margin: 10% 20%;
  position: fixed;
  justify-content:center;
  line-height: 1.5715;
  list-style: none;
`;

//Popup'ın cssi
const Window = styled.div`  
    box-sizing:border-box;
    position: absolute;
    width: 800px;
    height: 800px;
    top:0;
    left:20%;
    background: #0b0b0b;
    border-radius: 12px;
    z-index: 3;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
`;


const StyledInput = styled.input`
  margin-top:0.5em;
  margin-bottom: 0.8em;
  padding: 0.5em; // Input Fieldların Boyutu
  color:#fff;
  background-color: #1b1c23;
  border: none;
  border-radius: 8px;
    width: auto;
    justify-self:center;
`;


const Title = styled.h2`
  color: #fff;
  font-size:1Sem;
  margin-left: 50px;
  padding-bottom:0.5em;
  
`;


export default MyAccount