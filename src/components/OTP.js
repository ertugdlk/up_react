import React, { useState } from 'react';
import axios from '../utils';
import OtpInput from 'react-otp-input';

import css from '../components/css/OTP.css';
const Axios = require('axios');

const OTP = () => {
  const [otp, setOtp] = useState('');

  const handleChange = (element, index) => {
    /* -------------------- Uygun olmayan karakter engelleme ekleyelim -------------------- */

    if (isNaN(element.value)) return false;

    // setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.value !== '') {
      element.nextSibling.focus();
      // console.log(element);
    } else if (element.value === '') {
      element.previousSibling.focus();
      // console.log(element);
    }
  };

  const handleChango = (e) => setOtp(e);

  //eğer girilen OTP backendden gelen OTP ile aynıysa matchleştiğini göster ve kullanıcıyı verifike et daha sonra dashboarda aktar.

  const checkOTP = async () => {
    try {
      const url = 'auth/otp';
      const response = await axios.post(
        url,
        { otp },
        { withCredentials: true }
      );

      if (response.status !== 200) {
        alert('Invalid OTP entry');
      } else {
        alert('OTP successful!');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
