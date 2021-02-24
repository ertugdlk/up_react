import React, { useState,useEffect,useRef } from 'react'
import axios from '../utils';
import { Button } from '../components/Common/Button'
import { createGlobalStyle } from 'styled-components'
import { Grid } from '@material-ui/core'
import Logo from '../logo.png'
import Bag from "../bag_icon.png"
import css from '../components/css/Wallet.css';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #010101;
  }`

function Wallet(props) {
  const [upBalance, setUpBalance] = useState([])
  const [payment,setPayment] = useState(false)
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);
  const [bankBalance,setBankBalance] = useState(10)
  const [bankBalance1,setBankBalance1] = useState(20)
  const [bankBalance2,setBankBalance2] = useState(30)
  const [withdrawReq,setWithdrawReq] = useState(20)
  const [withdrawReq1,setWithdrawReq2] = useState(40)  
  const [withdrawReq2,setWithdrawReq3] = useState(60)  


  const dropdown = useRef();
  const btn = useRef();

  function handleDropdown() {
    setClick(!click);
  }
  function handleDropdown1() {
    setClick1(!click1);
  }
  function handleDropdown2() {
    setClick2(!click2);
  }

  if(bankBalance<withdrawReq || bankBalance1<withdrawReq1 || bankBalance2<withdrawReq2){
    console.log("yarra")

  }
  async function userBalance() {
    const url = "wallet/getbalance"
    const response = await axios.get(url, { withCredentials: true })
    if (response.status === 200) {
      setUpBalance(response.data.balance)
    } else{
    }
  }

  useEffect(() => {
    userBalance()
    if (click)
    btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`;
    if(click1)
    btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`;
    if(click2)
    btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`;
  else btn.current.style.marginBottom = 0;
  }, [])

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className="Header">
            <Grid  container direction="row"  justify="flex-start"  alignItems="flex-start">
              <Grid item xs={2}>
                <a className="LogoLink" href="/dashboard">
                  <img src={Logo} className="dashboard-logo"/>
                </a>
              </Grid>
              <Grid container direction="row" justify="flex-end" alignItems="center">
                <Grid item xs={1}>
                <button className="account-buttons">Account Settings</button>
                </Grid>
                <Grid item xs={1}>
                <button className="account-buttons">Logout</button>
                </Grid>
              </Grid>
            </Grid>
          </div>

          <div className='WalletPageContainer'>
          <div className="user-coin-infobox">
          <span className="user-coin-convertion-info">Your UP Coin Balance</span>
          <span className="user-coin-convertion">{upBalance} UP coin = {upBalance} TL</span>
          </div>
          <div className="bank-accounts">
          <span className="bank-accounts-header">Your Bank Accounts</span>
          <li>
            <div className="bank-content">
            <button className="bank-button">Bank 1</button>
            <button className="bank-button">Bank 2</button>
            <button className="bank-button">Bank 3</button>
            </div>
          </li>
          </div>
          <div className="transaction-history"> 
          <span className="transaction-history-header">Transaction History</span>
          <li>
            <div className="transaction-content">
            <span className="transaction-type">Refund</span>
            <span className="transaction-info">+50 UP coin</span>
            </div>
            <div className="transaction-content">
            <span className="transaction-type">Refund</span>
            <span className="transaction-info">+50 UP coin</span>
            </div>
            <div className="transaction-content">
            <span className="transaction-type">Refund</span>
            <span className="transaction-info">+50 UP coin</span>
            </div>
          </li>
          </div>
          <div className="up-coin-actions">
          <div className="up-coin-deposit">
          <span className="convertion"> 1 UP coin = 1 TL</span>
          <img src={Bag} className="wallet-icon"></img>
          {payment?null:<span className="payment-warning"> You have to choose a payment method to buy UP coins.</span>}
          <button className="deposit-button"> GET UP COIN</button>
          </div>
          <div className="up-coin-withdraw"> 
          <span className="bank-accounts-header">Your Bank Accounts</span>
          <li>
            <div className="withdraw-content">
            <button className="bank-button" onClick={handleDropdown} ref={btn}>Bank 1</button>
            {click ? (
            <div className='dropdown-content-1' ref={dropdown}>
              <span className="balance-text">Your balance: {bankBalance}</span>
              <span className="balance-text">Coin requirement to withdraw: {withdrawReq}</span>
              <button className="dropdown-btn">Withdraw</button>
            </div>
          ) : null}
            <button className="bank-button" onClick={handleDropdown1} ref={btn}>Bank 2</button>
            {click1 ? (
            <div className='dropdown-content-1' ref={dropdown}>
              <span className="balance-text"> Your Balance: {bankBalance1}</span>
              <span className="balance-text">Coin requirement to withdraw: <span>{withdrawReq1}</span></span>
              <button className="dropdown-btn">Withdraw</button>
            </div>
          ) : null}
            <button className="bank-button" onClick={handleDropdown2} ref={btn}>Bank 3</button>
            {click2 ? (
            <div className='dropdown-content-1' ref={dropdown}>
              <span className="balance-text">Your Balance: {bankBalance2}</span>
              <span className="balance-text">Coin requirement to withdraw: {withdrawReq2}</span>
              <button className="dropdown-btn">Withdraw</button>
            </div>
          ) : null}
            </div>
          </li>
          </div>
          </div>
          </div>
    </>
  )
}

export default Wallet
