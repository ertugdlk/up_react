import React, { useState,useEffect } from 'react';
import axios from '../utils';
import OtpInput from 'react-otp-input';
import { useHistory } from 'react-router-dom';
import css from '../components/css/OTP.css';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
const Axios = require('axios');

const OTP = (props) => {
  const [otp, setOtp] = useState('');
  const [open, setOpen] = useState(false);
  const [ErrorMessage,setErrorMessage] = useState('');
  const history = useHistory();

  const handleChango = (e) => setOtp(e);

  //eğer girilen OTP backendden gelen OTP ile aynıysa matchleştiğini göster ve kullanıcıyı verifike et daha sonra dashboarda aktar.
  const checkOTP = async () => {
    try {
      const url = 'auth/verifyotp';
      const response = await axios.post(
        url,
        { otp, email:props.email },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        setErrorMessage('Invalid OTP entry')
        setOpen(true)
      } else {
        setErrorMessage('OTP successful!')
        setOpen(true)
        const url2 = 'auth/login';
        const response2 = await axios.post(
          url2,
          { nickname:props.nickname, password: props.password },
          { withCredentials: true }
        );
  
        if (response2.status == 200) {
          history.push('/dashboard');
        }
        history.push('/dashboard')
      }
    } catch (err) {
      throw new Error("Something went wrong")
    }
  };

  return (
    <>
    <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={1000}><SnackbarContent style={{
      backgroundColor:'#00ff60',
      color:'black',
      justifyContent:'center',
      fontWeight:'bolder',
      fontSize:'14px'
    }}
    message={<span id="client-snackbar">{ErrorMessage}</span>}
  /></Snackbar>
      <div className='otp-window'>
        <div className='otp-modal'>
          <div className='row'>
            <div className='info'>
              <p className='otp-info'>
                Please enter the OTP sent to your email
              </p>
              <OtpInput
                value={otp}
                onChange={handleChango}
                numInputs={4}
                separator={<span></span>}
                className='otp-field'
              />
              <br />
              <p className='otp-entered'>OTP : {otp}</p>
              <p>
                <button
                  className='clear-button'
                  onClick={(e) => setOtp((otp) => '')}
                >
                  Clear
                </button>
                <button
                  className='verify-button'
                  onClick={(e) => alert('Entered OTP is ' + otp)}
                  onClick={checkOTP}
                >
                  Verify OTP
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OTP;
