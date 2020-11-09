import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Logo from '../logo.png'
import {Grid , Button , Container} from '@material-ui/core'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Menu, MenuItem} from '@material-ui/core'


function Dashboard() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Grid>
        </Header>

        <MenuBar>
          <Grid
              container
              direction="column"
              justify="space-evenly"
              alignItems="center">
          </Grid>
          <PlayButton>Play</PlayButton>
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
  width: 150px;
  height: 100%;
  position: absolute;
  top:70px;
  left:0px;
  align-self:flex-start;
  justify-self:flex-start;
  background-color: #16161b;
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
    width: 150px;
    height: 50px;
    z-index:1000;
    background-color: #00ff60;
    border: none;
    position:absolute;
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
  top:20px;
  right:60px;
  position:absolute;
`

export default Dashboard