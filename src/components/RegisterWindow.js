import React, {useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import { useHistory } from "react-router-dom";  
const Axios = require('axios')

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function RegisterWindow() 
{
  const [click, setClick] = useState(false);
  const [visible , setVisible] = useState(false);
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const history = useHistory();


  const handleRegister = async () => 
  {
    try
    {
      const url = "http://localhost:5000/auth/register"
      const response = await Axios.post(url , {nickname , email , password})
      if(response.status == 200){
        history.push("/");
      }
      else{
        console.log('invalid register')
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }


const handleClickRegister = ()=> 
{
  setClick(true);
  setVisible(false);
}
    return(
        <>
        <GlobalStyle></GlobalStyle>
        <Window>
        <Modal>
          <Title><b>CREATE ACCOUNT</b></Title>
            <label>
              Nickname
              <StyledInput
                 type="text"
                name="nickname"
                onChange={e => setNickname(e.target.value )}
                required
              ></StyledInput>
            </label>
            <label>
              Mail
              <StyledInput
                 type="text"
                name="email"
                onChange={e => setEmail(e.target.value )}
                required
              ></StyledInput>
            </label>
            <label>
              Password
              <StyledInput
                 type="password"
                name="password"
                onChange={e => setPassword(e.target.value )}
                required
              ></StyledInput>
            </label>
            <label>
              Confirm Password
              <StyledInput
                 type="password"
                name="repassword"
                required
              ></StyledInput>
            </label>
            <div>
                <Button onClick={handleRegister} buttonStyle='btn--register'>Register</Button>
            </div>
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
  margin: 5% 25%;
  position: flex;
  line-height: 1.5715;
  list-style: none;
  display: grid;
  justify-items:center;
  align-items:center;
`;
//Popup'ın cssi
const Window = styled.div`
  box-sizing: border-box;
    position: absolute;
    width: 300px;
    height: fit-content;
    top: 150px;
    left: 40%;
    background: #0b0b0b;
    border-radius: 12px;
    z-index: 3;
`;

const StyledInput = styled.input`
  margin-top:0.5em;
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
  font-size: 1Sem;
  margin: 0.5em 1.5em;
  padding-bottom:0.5em;
  `;

  const Button = styled.button`
    color: #000;
    background-color: #00FF60;
    font-size: 1em;
    margin-top:1.5em;
    padding: 0.75em;
    border: 2px solid #00ff60;
    border-radius: 8px;
    width: 75%;
    margin-right:12.5%;
    margin-left:12.5%;
  &:hover {
      background-color: #16161b;
      color: #f1f1f1;
      border-color: #f1f1f1;
  }
`;

export default RegisterWindow