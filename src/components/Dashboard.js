import React, {useEffect} from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import Photo1 from '../Photo1.png'
import {Grid , Button , Container} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Menu, MenuItem} from '@material-ui/core'
import Css from './Dashboard.css'
import { useHistory } from "react-router-dom"; 
const Cookie = require('js-cookie') 


function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuBar, setmenuBar] = React.useState('')
  const history = useHistory();

  useEffect(()=> {
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    history.push("/");
  }
    return(
        <>
        <GlobalStyle></GlobalStyle>
        <Header>
          <Grid zIndex={999} >
            <LogoSize>
            <img src={Logo}/>
            </LogoSize>
            <div style={{alignSelf:"center"}}>
            <Avatar></Avatar>
            <ArrowMenu>
              <IconButton style={{ color: 'white' }} aria-label="menu" size="small" aria-haspopup="true" onClick={handleClick}>
                <ArrowDownwardIcon fontSize="inherit" />
              </IconButton>
            </ArrowMenu> 
            </div> 
             <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Header>

        <div className='Container'>
          <div className='Slider'>
            <img src ={Photo1} className='img1'></img>
          </div>
          <div className='Games'>
          </div>
        </div>

        <MenuBar>
          <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center">
          </Grid>
          <PlayButton >Play</PlayButton>
          <button className='News'>News</button>
        </MenuBar> 
        </>
    )
}


const GlobalStyle = createGlobalStyle`
  body {
    background-color:#19191f;
  }
`

const MenuBar = styled.div`
  width: 140px;
  height: 1200px;
  position: absolute;
  top:70px;
  left:0px;
  align-self:flex-start;
  justify-self:flex-start;
  background-color: #16161b;
  z-index: 999;
`;

const Header = styled.div`
  height: 70px;
  background-color: #16161b;
  top:0;
  position:absolute;
  left:0;
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
    width: 140px;
    height: 50px;
    border: none;
    position:relative;
    color: #000000;
    font-size: 17px;
    font-weight: 400;
    line-height: 40px;
    color: #f1f1f1;
    background-color: #16161b;
    &:hover {
      background-color: #00ff60;
      border-color: #f1f1f1;
      color: #000000;
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
  top:20px;
  right:60px;
  position:absolute;
`

export default Dashboard