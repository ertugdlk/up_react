import React, {useState} from 'react'
import styled from 'styled-components'
import fetch from 'node-fetch'


function LoginWindow() 
{
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')

  const handleLogin = async () => {
    try
    {
      const url = "http://localhost:5000/auth/login"
      const body = { nickname: username , password: password}
      const response = await fetch(url , { method: 'POST', body: JSON.stringify(body) })
      console.log(response)
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
        <form>
            <label>Email</label>
            <input
              onChange={e => setUsername(e.target.value)}
              type="text"
              name="email"
              required
            />
            <label>Password</label>
            <input
              onChange={e => setPassword(e.target.value )}
              type="text"
              name="password"
              required
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
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