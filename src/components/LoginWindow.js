import React from 'react'
import styled from 'styled-components'


function LoginWindow() 
{

    return(
        <>
        <Window>
        <Modal>
        <form>
        <Title>
          <b>LOGIN</b>
        </Title>
          <label>
                Username
                <StyledInput
                  type="text"
                  name="Username"
                  required
                ></StyledInput>
                </label>
                <label>
                  Password
                <StyledInput
                  type="password"
                  name="Password"
                  required
                ></StyledInput>
                </label>
                <div>
                  <Button buttonStyle='btn--login'>Login</Button>
              </div>
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
`;


export default LoginWindow