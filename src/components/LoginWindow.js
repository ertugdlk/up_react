import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { useHistory } from 'react-router-dom'
import axios from '../utils'
import ClearIcon from '@material-ui/icons/Clear'
import Snackbar from '@material-ui/core/Snackbar'
import { SnackbarContent } from '@material-ui/core'
import css from '../components/css/LoginWindow.css'
import { BorderAllRounded } from '@material-ui/icons'

const Axios = require('axios')
const Cookie = require('js-cookie')

//const URL = ''

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

function LoginWindow(props) {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [open, setOpen] = useState(true)

  const handleSteam = async () => {}

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogin = async () => {
    try {
      const url = 'auth/login'
      const response = await axios.post(
        url,
        { nickname, password },
        { withCredentials: true }
      )
      if (response.status == 200) {
        history.push('/dashboard')
      } else {
        setOpen(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function userInfo() {
      try {
        const url = 'auth/me'
        const response = await axios.get(url, { withCredentials: true })

        if (response.status == 200) {
          if (response.data.nickname) {
            return history.push('/dashboard')
          } else {
            if (response.data.output.statusCode == 401) {
              return history.push('/')
            }
          }
        } else {
          if (response.data.output.statusCode) {
            return history.push('/')
          }
        }
      } catch (error) {
        throw error
      }
    }
    userInfo()
  }, [])

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={10000000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: '#00ff60',
            color: 'black',
            justifyContent: 'center',
            fontWeight: 'bolder',
            fontSize: '14px',
            borderRadius: '10px',
          }}
          message={<span id='client-snackbar'>Login Failed</span>}
        />
      </Snackbar>
      <GlobalStyle></GlobalStyle>
      <div className='login-window'>
        <div className='CloseButton1'>
          <ClearIcon
            fontSize='large'
            onClick={props.handleLoginClose}
          ></ClearIcon>{' '}
        </div>
        <div className='login-modal'>
          <h2 className='login-title'>Login</h2>
          <label className='labels'>Username</label>
          <input
            className='login-input'
            onChange={(e) => setNickname(e.target.value)}
            type='text'
            name='username'
            required
          />
          <label className='labels'>Password</label>
          <input
            className='login-input'
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            required
          />
          <button className='login-button' onClick={handleLogin}>
            Login
          </button>
          <button className='login-steam-button'>
            <img
              className='steam-logo'
              src='https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg'
              height='20px'
            />
            Login with Steam
          </button>
        </div>
      </div>
    </>
  )
}

export default LoginWindow
