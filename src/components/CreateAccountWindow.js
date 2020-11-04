import React from 'react'
import styled from 'styled-components'
import Button from './Common/Button'

function CreateAccountWindow() 
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
                name="email"
                placeholder="Email"
                required
              ></input>
            </label>
            <label>
              Confirm Email:
              <input
                 type="text"
                name="email"
                placeholder="Confirm Email"
                required
              ></input>
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                placeholder="Password"
                required
              ></input>
            </label>
            <label>
              Confirm Password:
              <input
                type="text"
                name="Confirm Password"
                placeholder="Confirm Password"
                required
              ></input>
            </label>
            <div>
                <Button>Register</Button>
            </div>
          </form>
        </Modal>  
        </Window>  
        </>
    )
}

const Modal = styled.div`
  font-size: 14px;
  width: 20px;
  margin-left: 25%;
  margin-top: 40px;
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



export default CreateAccountWindow