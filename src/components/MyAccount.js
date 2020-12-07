import React from 'react';
import { createGlobalStyle } from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import css from '../components/css/MyAccount.css';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`;

function MyAccount(props) {
  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className='MyAccount'>
        <div className='CloseButton1'>
          {' '}
          <ClearIcon fontSize='large' onClick={props.onClose}></ClearIcon>{' '}
        </div>
        <div className='account-emailbox'>
          <label className='myaccount-email'>Email</label>
          <button className='myaccount-button'>Edit</button>
        </div>
        <div className='account-usernamebox'>
          <label className='myaccount-username'>Username</label>
          <button className='myaccount-button'>Edit</button>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
