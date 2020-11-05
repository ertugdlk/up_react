import React from 'react'
import styled from 'styled-components'
import Logo from '../logo.png'
import {Grid , Button , Container} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';

function Dashboard() {
    return(
        <>
        <Header>
          <Grid zIndex={999} >
            <LogoSize>
            <img src={Logo}/>
            </LogoSize>
            <Avatar></Avatar>
            <ArrowMenu>
              <IconButton style={{ color: 'white' }} aria-label="menu" size="small">
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </ArrowMenu>  
          </Grid>
        </Header>

        <Menu>
          <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center">
          </Grid>
          <PlayButton>Play</PlayButton>
        </Menu> 
        </>
    )
}

const Menu = styled.div`
  width: 150px;
  height: 100%;
  position: absolute;
  top:70px;
  align-self:flex-start;
  justify-self:flex-start;
  background-color: #16161b;
`;

const Header = styled.div`
  height: 70px;
  background-color: #16161b;
  top:0px;
  width:100%;
  z-index:998;
`;

const LogoSize = styled.div`
  position: absolute;
  top:-40px;
  width: 130px;
  height: 40px;
`;

const PlayButton = styled.button`
    width: 150px;
    height: 50px;
    background-color: #00ff60;
    border: none;
    color: #000000;
    font-size: 17px;
    font-weight: 400;
    line-height: 40px;
    &:hover {
      background-color: #16161b;
      color: #f1f1f1;
      border-color: #f1f1f1;
  }
`;

const Avatar = styled.div`
  width:40px;
  height:40px;
  position:absolute;
  top:10px;
  right:250px;
  border-radius: 50px;
  border: 3px solid #00ff60;
`
const ArrowMenu = styled.div`
  right:120px;
  justify-content:center;
  position:absolute;
`


export default Dashboard