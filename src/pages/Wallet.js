import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../utils'
import { Button } from '../components/Common/Button'
import { createGlobalStyle } from 'styled-components'
import { Grid } from '@material-ui/core'
import Logo from '../logo.png'
import Bag from '../bag_icon.png'
import backIcon from '../back-icon.png'
import css from '../components/css/Wallet.css'
import Payment from '../components/UI/Payment'
import CenterModal from '../components/UI/CenterModal'
import MyAccount from '../components/MyAccount'
import { baseUrl } from '../utils/helpers'

import Divider from '@material-ui/core/Divider'

import AccountBalanceIcon from '@material-ui/icons/AccountBalance'

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Raleway');
  body {
    font-family: 'Raleway', sans-serif;
    background-color: #010101;
  }`

function Wallet(props) {
  const [upBalance, setUpBalance] = useState([])
  const [payment, setPayment] = useState(false)
  const [click, setClick] = useState(false)
  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  const [bankBalance, setBankBalance] = useState(10)
  const [bankBalance1, setBankBalance1] = useState(20)
  const [bankBalance2, setBankBalance2] = useState(30)
  const [withdrawReq, setWithdrawReq] = useState(20)
  const [withdrawReq1, setWithdrawReq2] = useState(40)
  const [withdrawReq2, setWithdrawReq3] = useState(60)
  const [paymentModal, setPaymentModal] = useState(false)
  const [transactionHistory, setTransactionHistory] = useState(false)
  const [account, setAccount] = useState(false)
  const [userName, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [session, setSession] = useState(false)
  const [transactions, setTransactions] = useState([])

  const socketio = require('socket.io-client')
  const socket = socketio(baseUrl, {
    transports: ['websocket'],
  })

  const history = useHistory()

  const dropdown = useRef()
  const btn = useRef()

  const handleLogout = () => {
    try {
      async function logout() {
        const url = 'auth/logout'
        await axios.get(url, { withCredentials: true })
      }

      // setAnchorEl(null);
      logout()
      history.push('/')
    } catch (err) {
      throw new Error("Couldn't change room data")
    }
  }

  const handPaymentModalOpen = () => {
    setPaymentModal(true)
  }
  const handPaymentModalClose = () => {
    setPaymentModal(false)
  }

  function handleDropdown() {
    setClick(!click)
  }
  function handleDropdown1() {
    setClick1(!click1)
  }
  function handleDropdown2() {
    setClick2(!click2)
  }

  const handleAccount = () => {
    // setAnchorEl(null);
    setAccount(true)
  }

  const handleAccountClose = () => {
    setAccount(false)
  }

  function handleTransationHistory() {
    setTransactionHistory(!transactionHistory)
  }

  if (bankBalance < withdrawReq || bankBalance1 < withdrawReq1 || bankBalance2 < withdrawReq2) {
    console.log('invalid')
  }
  async function userBalance() {
    try {
      const url = 'wallet/getbalance'
      const response = await axios.get(url, { withCredentials: true })
      if (response.status === 200) {
        setUpBalance(response.data.balance)
      } else {
        alert('Something went wrong')
      }
    } catch (err) {
      throw new Error("Couldn't get your balance")
    }
  }

  async function userInfo() {
    try {
      const url = 'auth/me'
      const response = await axios.get(url, { withCredentials: true })

      if (response.status == 200) {
        if (response.data.nickname) {
          setUsername(response.data.nickname)
          setEmail(response.data.email)
          setSession(true)
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

      socket.emit('login', response.data.nickname)
    } catch (error) {
      throw new Error("Couldn't get user info")
      //history.push("/")
    }
  }

  useEffect(() => {
    try {
      userBalance()
      userInfo()
      if (click) btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`
      if (click1) btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`
      if (click2) btn.current.style.marginBottom = `${dropdown.current.offsetHeight}px`
      else btn.current.style.marginBottom = 0
    } catch (err) {
      throw new Error('Something went wrong')
    }


    async function Transactions() {
      try{
      const url = 'detail/transactions' //burası değişecek
      const response = await axios.get(url, { withCredentials: true })
      if (response.data) {
        setTransactions(response.data)
      }
    }catch(err){
      alert("We couldn't get your transactions from our server")
    }
    }

    Transactions();
  }, [])

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <div className='Header'>
        <Grid container direction='row' justify='flex-start' alignItems='flex-start'>
          <Grid item xs={2}>
            <a className='LogoLink' href='/dashboard'>
              <img loading='lazy' src={Logo} className='dashboard-logo' />
            </a>
          </Grid>
          <Grid container direction='row' justify='flex-end' alignItems='center'>
            <Grid item xs={1}>
              <button className='account-buttons' onClick={handleAccount}>
                Account Settings
              </button>
            </Grid>
            <Grid item xs={1}>
              <button className='account-buttons' onClick={handleLogout}>
                Logout
              </button>
            </Grid>
          </Grid>
        </Grid>
      </div>

      {account && (
        <CenterModal>
          <MyAccount userName={userName} onClose={handleAccountClose} email={email}></MyAccount>
        </CenterModal>
      )}

      <div className='back-button-div'>
        <a className='LogoLink' href='/dashboard'>
          <img loading='lazy' src={backIcon} className='back-button' />
        </a>
      </div>

      <div className='WalletPageContainer'>
        <div className='user-coin-infobox'>
          <span className='user-coin-convertion-info'>Your UP Coin Balance</span>
          <span className='user-coin-convertion'>
            {upBalance} UP coin = {upBalance} TL
          </span>
          {!paymentModal && (
            <button className='add-payment-btn' onClick={() => handPaymentModalOpen()}>
              Add Payment
            </button>
          )}
        </div>
        <Payment paymentModal={paymentModal} handPaymentModalClose={handPaymentModalClose}></Payment>
        <div className='bank-accounts'>
          <div className='bank-accounts-header'>
            <p> Your Bank Accounts</p>
          </div>
          <div style={{ clear: 'both' }}></div>
          <div className='withdraw-content'>
            <button className='bank-button' onClick={handleDropdown} ref={btn}>
              <AccountBalanceIcon /> <span style={{ fontSize: '18px', lineHeight: '20px' }}>Bank 1</span>
            </button>
            {click ? (
              <div className='dropdown-content-wallet' ref={dropdown}>
                <span className='balance-text'>Your balance: {bankBalance}</span>
                <span className='balance-text'>Coin requirement to withdraw: {withdrawReq}</span>
                <button className='add-payment-btn'>Withdraw</button>
              </div>
            ) : null}
            <button className='bank-button' onClick={handleDropdown1} ref={btn}>
              <AccountBalanceIcon /> <span style={{ fontSize: '18px', lineHeight: '20px' }}>Bank 2</span>
            </button>
            {click1 ? (
              <div className='dropdown-content-wallet' ref={dropdown}>
                <span className='balance-text'> Your Balance: {bankBalance1}</span>
                <span className='balance-text'>
                  Coin requirement to withdraw: <span>{withdrawReq1}</span>
                </span>
                <button className='add-payment-btn'>Withdraw</button>
              </div>
            ) : null}
            <button className='bank-button' onClick={handleDropdown2} ref={btn}>
              <AccountBalanceIcon /> <span style={{ fontSize: '18px', lineHeight: '20px' }}>Bank 3</span>
            </button>
            {click2 ? (
              <div className='dropdown-content-wallet' ref={dropdown}>
                <span className='balance-text'>Your Balance: {bankBalance2}</span>
                <span className='balance-text'>Coin requirement to withdraw: {withdrawReq2}</span>
                <button className='add-payment-btn'>Withdraw</button>
              </div>
            ) : null}
          </div>
        </div>
        <div className='user-coin-infobox'>
          <span className='user-coin-convertion-info'>1 UP coin = 1 TL</span>
          {!payment && <span className='user-coin-convertion'>You have to choose a payment method to buy UP coins.</span>}
          {!paymentModal && (
            <button className='add-payment-btn' onClick={() => handPaymentModalOpen()}>
              GET UP COIN
            </button>
          )}
        </div>
      </div>
      {transactionHistory ? (
        <div className='transaction-history'>
          <Divider className='divider-wallet' variant='middle' />
          <div className='bank-accounts-header'>
            <p>Transaction History</p>
          </div>
          <div className='transaction-content-holder'>
            <div className='transaction-content'>
              <span className='transaction-type'>Refund</span>
              <span className='transaction-info'>+50 UP coin</span>
            </div>

            <div className='transaction-content-holder'>
              {transactions.map((transaction) => (
                <div
                  className='transaction-content' key={transaction.name}>

                    <span className='transaction-type'>{transaction.type}</span>
                    <span className='transaction-info'>{transaction.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='bank-accounts-header'>
          <p>
            <button className='transaction-history-button' onClick={handleTransationHistory}>
              Transaction History
            </button>
          </p>
        </div>
      )}
    </>
  )
}

export default Wallet
