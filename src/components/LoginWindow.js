import React, {useState} from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";  
const Axios = require('axios')
const Cookie = require('js-cookie')


function LoginWindow() 
{
  const [nickname , setNickname] = useState("")
  const [password , setPassword] = useState("")
  const history = useHistory();


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
        <Window>
        <Modal>
        <Title>
          <b>LOGIN</b>
        </Title>
        <label>Email</label>
            <input
              onChange={e => setNickname(e.target.value)}
              type="text"
              name="nickname"
              required
            />
            <label>Password</label>
            <input
              onChange={e => setPassword(e.target.value )}
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
  color:#fff;
  box-sizing: border-box;
  font-size: 14px;
  width: 12px;
  margin:25% 25%;
  position: flex;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
`;
//Popup'ın cssi
const Window = styled.div`
    position: absolute;
    width: 300px;
    height: 400px;
    top: 200px;
    left: 40%;
    align-self:center;
    background: #161616;
    border-radius: 12px;
    z-index: 3;
`;


const StyledInput = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color:#fff;
  background-color: grey;
  border: none;
  border-radius: 20px;
`;


const Title = styled.h2`
color: #fff;
font-size: 1Sem;
margin: 1em 1.5em;
padding-bottom:0.5em;
`;



const Button = styled.button`
  color: #000;
  background-color: #00FF60;
  font-size: 1em;
  margin: 4em 1em;
  padding: 0.75em 3em;
  border: 2px solid #00ff60;
  border-radius: 3px;
  &:hover {
      background-color: #16161b;
      color: #f1f1f1;
      border-color: #f1f1f1;
  }
`;


export default LoginWindow