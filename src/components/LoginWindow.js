import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import { useHistory } from "react-router-dom";  
const Axios = require('axios')
const Cookie = require('js-cookie')

//const URL = ''


const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function LoginWindow() 
{
  const [nickname , setNickname] = useState("")
  const [password , setPassword] = useState("")
  const history = useHistory();

  const handleSteam = async () => {
  }


  const handleLogin = async () => {
    try
    {
      const url = "http://localhost:5000/auth/login"
      const response = await Axios.post(url , {nickname , password} , {withCredentials: true})

      if(response.status == 200){
        history.push("/dashboard");
      }
      else{
        console.log('invalid login')
      }
    }
    catch(err)
    {
      console.log(err)
    }

  }

    return(
        <>
        <GlobalStyle></GlobalStyle>
        <Window>
        <Modal>
        <Title>
          Login
        </Title>
        <label>Username</label>
            <StyledInput
              onChange={e => setNickname(e.target.value)}
              type="text"
              name="username"
              required
            />
            <label>Password</label>
            <StyledInput
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              required
            />
            <Button onClick={handleLogin}>Login</Button>
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
  width: 50px;
  margin: 5% 25%;
  position: relative;
  justify-content:center;
  line-height: 1.5715;
  list-style: none;
`;

//Popup'ın cssi
const Window = styled.div`  
    position: absolute;
    width: 300px;
    height: fit-content;
    top: 200px;
    left: 40%;
    background: #0b0b0b;
    border-radius: 12px;
    z-index: 3;
    box-shadow: 0 0 0 9999px rgba(0,0,0,0.5);
`;


const StyledInput = styled.input`
  margin-bottom: auto;
  padding: 0.5em; //Boyut
  color: #fff;
  background-color: #1b1c23;
  border: none;
  border-radius: 8px;
  width: auto;
  justify-self: center;
`;


const Title = styled.h2`
  color: #fff;
  font-size:1Sem;
  margin-left: 50px;
  padding-bottom:0.5em;
  
`;


const Button = styled.button`
  color: #000;
  background-color: #00FF60;
  font-size: 1em;
  margin-top:1.5em;
  padding: 0.75em ;
  border: 2px solid #00ff60;
  border-radius: 8px;
  width: fit-content;
  height: fit-content;
  margin-left:50px;

  &:hover {
      background-color: #16161b;
      color: #f1f1f1;
      border-color: #f1f1f1;
  }
`;

export default LoginWindow