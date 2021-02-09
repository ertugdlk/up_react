import React, { useEffect, useState } from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import { createGlobalStyle } from 'styled-components'
import CenterModal from '../components/UI/CenterModal'
import axios from '../utils';
import CloseIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import {makeStyles,createStyles} from "@material-ui/core/styles";

const _ = require('lodash')

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
  }`

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: "white",
      "&.Mui-focused": {
        color:'white',
        borderColor: 'green'
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "green"
      },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
        color:"green"
      },
    }
  }
    },
  )
);

function VerificationForm(props) {
  const [phone, setPhone] = useState('');
  const [id, setID] = useState('');
  const [name, setName] = useState('');
  const [surname, setNurmane] = useState('');
  const [dob, setDOB] = useState('');
  const classes = useStyles();
  const [ErrorMessage,setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [phoneError,setPhoneError] = useState(false);
  const [idError,setIdError] = useState(false);
  const [nameError,setNameError] = useState(false);
  const [surnameError,setSurnameError] = useState(false);
  const [dobError,setDOBError] = useState(false);
  const [phoneErrorText,setPhoneErrorText] = useState('');
  const [idErrorText,setIDErrorText] = useState('');
  const [nameErrorText,setNameErrorText] = useState('');
  const [surnameErrorText,setSurnameErrorText] = useState('');
  const [dobErrorText,setDOBErrorText] = useState ('');

  const handleVerificate = async () =>{
    try {
      if(phone===''){
        setPhoneErrorText("Phone field is empty!")
        setPhoneError(true)
      }if(id===''){
        setIDErrorText("ID field is empty!")
        setIdError(true)
      }if(name===''){
          setNameErrorText("Name field is empty!")
          setNameError(true)
      }if(surname===''){
        setSurnameErrorText("Surname field is empty!")
        setSurnameError(true)
        if(dob===''){
          setDOBErrorText("Date of birth field can't be empty!")
          setDOBError(true)
      } }if(phone!==''){
        setPhoneError(false)
        setPhoneErrorText('')
      }if(id!==''){
        setIdError(false)
        setIDErrorText('')
      }if(name!==''){
        setNameError(false)
        setNameErrorText('')
      }if(surname!==''){
        setSurnameError(false)
        setSurnameErrorText('')
      }if(dob!==''){
        setDOBError(false)
        setDOBErrorText('')
        
    const url = 'credential/add';
    const response = await axios.post(url, {phone,id,name,surname,dob});
    console.log(response)
  }
  } catch (err) {
    console.log(err);
  }
  }

  return (
    <>
          <Snackbar anchorOrigin={{vertical: 'top',horizontal: 'center'}} open={open} autoHideDuration={1000}><SnackbarContent style={{
      backgroundColor:'#00ff60',
      color:'white',
      justifyContent:'center',
      fontWeight:'bolder',
      fontSize:'14px',
      borderRadius:'10px'
    }}
    message={<span id="client-snackbar">{ErrorMessage}</span>}
  /></Snackbar>
    <CenterModal>
   <div className='register-window'>
        <div className='register-modal'>
          <h2 className='register-title'>Verify Your Account</h2>
          <label className='labels'>Phone</label>
          <TextField type="tel" id="phone" name="phone" placeholder="532-532-32-32" required error={phoneError} helperText={phoneErrorText} className={classes.root} InputProps={{className: classes.root}} pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" onChange={(e)=> setPhone(e.target.value)}/>
          <label className='labels'>Identity ID</label>
          <TextField type="text" name="identity-id" placeholder="12312312312" required error={idError} helperText={idErrorText} pattern="[0-9]{11}" className={classes.root} InputProps={{className: classes.root}} onChange={(e)=> setID(e.target.value)} />
          <label className='labels'>Name</label>
          <TextField type="text" name="name" placeholder="Your Name" required error={nameError} helperText={nameErrorText} className={classes.root} InputProps={{className: classes.root}} onChange={(e)=> setName(e.target.value)} />
          <label className='labels'> Surname</label>
          <TextField type="text" name="surname" placeholder="Your Surname" required error={surnameError} helperText={surnameErrorText} className={classes.root} InputProps={{className: classes.root}} onChange={(e)=> setNurmane(e.target.value)}/>
          <label className="labels">Date of Birth</label>
          <TextField type="date" name="dob" min="1950-01-01" max="2003-02-09" required error={dobError} helperText={dobErrorText} className={classes.root} InputProps={{className: classes.root}} onChange={(e)=> setDOB(e.target.value)}/>
          <div>
            <button
              className='register-button'
              buttonStyle='btn--register'
              onClick={handleVerificate}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </CenterModal>
    </>
  )
}

export default VerificationForm
