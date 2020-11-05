import React from 'react'
import styled from 'styled-components'
import Button from './Common/Button'


function LoginWindow() 
{

    return(
        <>
        <Window>
        <Modal>
        <form>
          <label>
                Email:
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="Email"
                  required
                ></input>
                </label>
                <label>
                  Password:
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="Password"
                  required
                ></input>
                </label>
                <div>
                  <Button>Login</Button>
              </div>
            </form>
        </Modal>  
        </Window>  
        </>
    )
}

const Modal = styled.div`
  box-sizing: border-box;
  font-size: 14px;
  width: 15px;
  margin-left: 25%;
  margin-top: 100px;
  position: absolute;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
`;

const Window = styled.div`
  position: absolute;
  width: 300px;
  height: 400px;
  left: 40%;
  top: 130px;
  background: #161616;
  border-radius: 12px;
  z-index: 3;
`;

export default LoginWindow