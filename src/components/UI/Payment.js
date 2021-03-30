import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardImageHolder from '../../card_image.png'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Send from '@material-ui/icons/Send'
import Checkbox from '@material-ui/core/Checkbox'

import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import Divider from '@material-ui/core/Divider'
import CancelIcon from '@material-ui/icons/Cancel'

import { makeStyles } from '@material-ui/core/styles'
import { unknownprosBackGround, unknownprosGreen, unknownprosDenied } from '../../utils/helpers'
import axios from '../../utils'

const useStyles = makeStyles((theme) => ({
  root: { minHeight: 550, minWidth: 1015, zIndex: 1000 },
  mainHolder: {
    flexGrow: 1,
    padding: 10,
    color: 'white',
  },
  dialog: {
    minHeight: 400,
    minWidth: 400,
    color: 'white',
  },
  card: {
    width: '100%',
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
  },
  media: {
    width: '100%',
    minHeight: 100,
    marginTop: 10,
    padding: 10,
    // paddingTop: '56.25%', // 16:9
  },
  gridItems: {
    width: '100%',
    color: 'white',
  },
  inputs: {
    width: '100%',
    color: 'white',
    borderColor: 'green',
  },
  formButtonsControl: {
    // display: 'flex',
  },
  radioGrupControl: {
    flexDirection: 'row',
  },
  formButtons: {
    margin: 8,
    marginTop: 1,
  },
  formButtonsActive: {},
  bakiyeBtns: {
    backgroundColor: 'green',
    fontSize: 26,
  },
  dividerAmca: {
    width: '100%',
    backgroundColor: 'white',
    minHeight: 2,
    margin: 10,
  },
  dividerAmcaVertical: {
    padding: 0,
    minWidth: 2,
    backgroundColor: 'white',
    height: 60,
    margin: 0,
    '& hr': {
      margin: 0,
    },
  },
  dividerAmcaVerticalGrids: {
    flexBasis: 'auto',
  },
  GoBtns: {
    backgroundColor: '#00ff60',
  },

  inputInput: {
    borderColor: 'white',
    backgroundColor: 'white',
    '&$focused$notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-input': {},
    '&:hover .MuiOutlinedInput-input': {},
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {},
    '& .MuiInputLabel-outlined': {},
    '&:hover .MuiInputLabel-outlined': {},
    '& .MuiInputLabel-outlined.Mui-focused': {},
  },
}))

function Payment(props) {
  const texts = ['50 Coins', '100 Coins', '250 Coins', '500 Coins', '1000 Coins']
  const middle = texts[Math.round((texts.length - 1) / 2)]
  const [isMoneySelected, setIsMoneySelected] = useState(false)
  const [selectedMoneyAmount, setSelectedMoneyAmount] = useState(middle)
  const [price, setPrice] = useState(0)
  const [cardHolderName, setCardHolderName] = useState('')
  const [carNumeber, setCarNumeber] = useState('')
  const [cvv, setCvv] = useState('')
  const [experieYear, setExperieYear] = useState('')
  const [experieMonth, setExperieMonth] = useState('')
  const [user, setUser] = useState(props.userName)
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [checkbox, setCheckbox] = useState({
    checkedA: true,
  })
  const classes = useStyles()

  // useEffect(() => {
  //   getName()
  //   getSurname()
  // }, [])

  function StyledButton({ text = '' }) {
    const classes = useStyles()

    return (
      <Button
        style={{
          color: text === selectedMoneyAmount ? 'black' : `${unknownprosDenied}`,
          backgroundColor: text === selectedMoneyAmount ? `${unknownprosGreen}` : `${unknownprosBackGround}`,
        }}
        variant='contained'
        onClick={(e) => handleChangeMoneyAmount(e, text)}
        className={classes.bakiyeBtns}
      >
        {text}
      </Button>
    )
  }

  const handleDeposit = async () => {
    getName()
    getSurname()
    if (checkbox.checkedA === false) {
      try {
        const url = 'pay/pay2d'
        const body = {
          cc_holder_name: 'ABDULLAH KANDİLLİ',
          cc_no: '5168404128791960',
          expiry_month: '07',
          expiry_year: '24',
          cvv: '108',
          currency_code: 'TRY',
          installments_number: 1,
          invoice_description: 'Testing',
          total: '0.10',
          name: 'ABDULLAH',
          surname: 'KANDİLLİ',
          nickname: 'testalka',

          items: [{ name: 'TestItem', price: '0.10', quantity: 1, description: 'Item test description' }],
        }
        console.log('BODY CREDIT', body)
        const response = await axios.post(url, body, { withCredentials: true })
        console.log('Response cREdit', response)
      } catch (err) {
        console.log('PAYEMTN ERER >>>>', err)
        throw new Error('Something went wrong')
      }
    } else {
      //buraya 3d secure gelecek
    }
  }

  const handleChangeMoneyAmount = (e, text) => {
    setSelectedMoneyAmount(text)
  }

  const selectMoney = () => {
    setIsMoneySelected(true)
    handlePrice()
  }
  const unSelectMoney = () => {
    setIsMoneySelected(false)
  }

  const handlePrice = () => {
    if (selectedMoneyAmount === '50 Coins') {
      setPrice(0.1)
    } else if (selectedMoneyAmount === '100 Coins') {
      setPrice(0.2)
    } else if (selectedMoneyAmount === '250 Coins') {
      setPrice(0.5)
    } else if (selectedMoneyAmount === '500 Coins') {
      setPrice(1)
    } else if (selectedMoneyAmount === '1000 Coins') {
      setPrice(2)
    }
  }
  const getName = () => {
    setName(cardHolderName.split(' ')[0])
  }

  const getSurname = () => {
    setSurname(cardHolderName.split(' ')[1])
  }

  function insertSlash(val) {
    return val.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4')
  }

  const handleSetCardHolderName = (e) => {
    console.log('handleSetCardHolderName', e.target.value)
    if (e.target.value === '') {
      setCardHolderName('')
    }
    setCardHolderName(e.target.value)
  }

  const handleSetCardNumber = (e) => {
    setCarNumeber(e.target.value)
    if (isNaN(e.target.value)) {
      setCarNumeber('')
    }
  }

  const handleSetCVV = (e) => {
    setCvv(e.target.value)
    if (isNaN(e.target.value)) {
      setCvv('')
    }
  }
  const handleSetMonth = (e) => {
    setExperieMonth(e.target.value)
    if (isNaN(e.target.value)) {
      setExperieMonth('')
    }
  }
  const handleSetYear = (e) => {
    setExperieYear(e.target.value)
    if (isNaN(e.target.value)) {
      setExperieYear('')
    }
  }

  const handleChecked = (event) => {
    setCheckbox({ ...checkbox, [event.target.name]: event.target.checked })
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          minHeight: 550,
          minWidth: 1200,
          backgroundColor: `${unknownprosBackGround}`,
          borderRadius: 12,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5);',
          padding: '10px',
          color: 'white',
        },
      }}
      open={props.paymentModal}
      onClose={props.handPaymentModalClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={classes.root}
    >
      <div className={classes.mainHolder}>
        <Grid container direction='row' justify='flex-end' alignItems='center'>
          <Grid item>
            <Button color='secondary' onClick={props.handPaymentModalClose}>
              <CancelIcon />
            </Button>
          </Grid>
        </Grid>
      </div>

      <DialogContent>
        {isMoneySelected ? (
          <div className={classes.mainHolder}>
            <Grid container direction='column' justify='flex-end' alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <div className={classes.mainHolder}>
                  <Grid container direction='row' justify='center' alignItems='center'>
                    <Grid item xs={3} className={classes.gridItems}>
                      <div className={classes.mainHolder}>
                        <Grid container direction='column' justify='flex-start' alignItems='flex-start' spacing={1}>
                          <Grid item xs={6} className={classes.gridItems}>
                            <Button>
                              <Card className={classes.card}>
                                <CardMedia className={classes.media} image={CardImageHolder} />
                                <CardContent>
                                  <Typography
                                    style={{
                                      color: `${unknownprosDenied}`,
                                    }}
                                    variant='body2'
                                    component='p'
                                  >
                                    Card/Debit
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Button>
                          </Grid>
                          <Grid item xs={6} className={classes.gridItems}>
                            <Button>
                              <Card className={classes.card}>
                                <CardMedia className={classes.media} image={CardImageHolder} />
                                <CardContent>
                                  <Typography
                                    style={{
                                      color: `${unknownprosDenied}`,
                                    }}
                                    variant='body2'
                                    component='p'
                                  >
                                    Card/Debit
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item xs={9}>
                      <div className={classes.mainHolder}>
                        <Grid container direction='column' justify='center' alignItems='center' spacing={1}>
                          <Grid item xs={12} className={classes.gridItems}>
                            <Typography variant='h4' component='h5'>
                              {'You have selected:'} {selectedMoneyAmount}
                              <br />
                              {'You will pay:'} {price} {'TL'}
                            </Typography>
                          </Grid>
                          <Divider classes={{ root: classes.dividerAmca }} />
                          <Grid item xs={12} className={classes.gridItems}>
                            <InputLabel shrink>
                              <Typography
                                style={{
                                  color: 'white',
                                }}
                                variant='h4'
                                component='h5'
                              >
                                Cardholder Name
                              </Typography>
                            </InputLabel>

                            <TextField
                              type='text'
                              autoComplete={false}
                              fullWidth
                              className={classes.inputs}
                              id='outlined-basic'
                              variant='outlined'
                              placeholder='XXXXXXXX XXXXXXXX'
                              onChange={(e) => handleSetCardHolderName(e)}
                              value={cardHolderName}
                              InputProps={{
                                type: 'text',
                                classes: {
                                  root: classes.inputInput,
                                  focused: classes.focused,
                                  notchedOutline: classes.notchedOutline,
                                },
                              }}
                              /*onInput={(e) => {
                                e.target.value = Math.max(0, (e.target.value)).toString().slice(0, 30)
                              }}*/
                            />
                          </Grid>
                          <Divider classes={{ root: classes.dividerAmca }} />
                          <Grid item xs={12} className={classes.gridItems}>
                            <InputLabel shrink>
                              <Typography
                                style={{
                                  color: 'white',
                                }}
                                variant='h4'
                                component='h5'
                              >
                                Card Number
                              </Typography>
                            </InputLabel>

                            <TextField
                              fullWidth
                              autoComplete={false}
                              className={classes.inputs}
                              id='outlined-basic'
                              variant='outlined'
                              type='tel'
                              placeholder='XXXX-XXXX-XXXX-XXXX'
                              onChange={(e) => handleSetCardNumber(e)}
                              value={insertSlash(carNumeber)}
                              InputProps={{
                                classes: {
                                  maxLength: 16,
                                  root: classes.inputInput,
                                  focused: classes.focused,
                                  notchedOutline: classes.notchedOutline,
                                },
                              }}
                              onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 16)
                              }}
                            />
                          </Grid>
                          <Divider classes={{ root: classes.dividerAmca }} />
                          <Grid container item xs={12} className={classes.gridItems}>
                            <Grid container direction='row' justify='space-between' alignItems='center' spacing={1}>
                              <Grid item xs={3}>
                                <InputLabel shrink>
                                  <Typography
                                    style={{
                                      color: 'white',
                                      fontSize: '14px',
                                    }}
                                    variant='caption'
                                  >
                                    CVV
                                  </Typography>
                                </InputLabel>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  placeholder='XXX'
                                  onChange={(e) => handleSetCVV(e)}
                                  value={cvv}
                                  InputProps={{
                                    maxLength: 3,
                                    classes: {
                                      root: classes.inputInput,
                                      focused: classes.focused,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }}
                                  onInput={(e) => {
                                    // e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                                    if (e.target.value.length > 3) {
                                      e.target.value = e.target.value.slice(0, -1)
                                    }
                                  }}
                                />
                              </Grid>
                              <Grid item xs={1} className={classes.dividerAmcaVerticalGrids}>
                                <Divider
                                  flexItem
                                  orientation='vertical'
                                  classes={{
                                    root: classes.dividerAmcaVertical,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <InputLabel shrink>
                                  <Typography
                                    style={{
                                      color: 'white',
                                      fontSize: '14px',
                                    }}
                                    variant='caption'
                                  >
                                    Exp. Month
                                  </Typography>
                                </InputLabel>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  placeholder='XX'
                                  type='string'
                                  onChange={(e) => handleSetMonth(e)}
                                  value={experieMonth}
                                  InputProps={{
                                    maxLength: 2,
                                    classes: {
                                      root: classes.inputInput,
                                      focused: classes.focused,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }}
                                  onInput={(e) => {
                                    if (e.target.value.length > 2) {
                                      e.target.value = e.target.value.slice(0, -1)
                                    }
                                  }}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <InputLabel shrink>
                                  <Typography
                                    style={{
                                      color: 'white',
                                      fontSize: '14px',
                                    }}
                                    variant='caption'
                                  >
                                    Exp. Year
                                  </Typography>
                                </InputLabel>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  placeholder='XX'
                                  type='tel'
                                  onChange={(e) => handleSetYear(e)}
                                  value={experieYear}
                                  InputProps={{
                                    maxLength: 2,
                                    classes: {
                                      root: classes.inputInput,
                                      focused: classes.focused,
                                      notchedOutline: classes.notchedOutline,
                                    },
                                  }}
                                  onInput={(e) => {
                                    e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                  }}
                                />
                              </Grid>
                              <Grid item xs={1} className={classes.dividerAmcaVerticalGrids}>
                                <Divider
                                  flexItem
                                  orientation='vertical'
                                  classes={{
                                    root: classes.dividerAmcaVertical,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <FormControlLabel control={<Checkbox checked={checkbox.checkedA} onChange={handleChecked} name='checkedA' />} label='3D Secure Payment' />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={classes.mainHolder}>
            <Grid container direction='column' justify='space-around' alignItems='center' spacing={1}>
              <Grid item xs={12}>
                <Typography variant='h3'>Bakiye Yükleme</Typography>
              </Grid>
              <Divider classes={{ root: classes.dividerAmca }} />
              <Grid container item xs={12}>
                {/* <div className={classes.mainHolder}> */}
                <Grid container direction='row' justify='space-around' alignItems='center' spacing={1}>
                  <Grid item xs={3}>
                    <Typography component='p' variant='h6' align='center'>
                      Yükleme Miktarı
                    </Typography>
                    <Typography variant='body1' align='center'>
                      250 Coin
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.dividerAmcaVerticalGrids}>
                    <Divider flexItem orientation='vertical' classes={{ root: classes.dividerAmcaVertical }} />
                  </Grid>

                  <Grid item xs={4}>
                    <Typography component='p' variant='h6' align='center'>
                      İşlem Ücreti
                    </Typography>
                    <Typography variant='body1' align='center'>
                      10 Coin Ücretsiz
                    </Typography>
                  </Grid>
                  <Grid item xs={1} className={classes.dividerAmcaVerticalGrids}>
                    <Divider flexItem orientation='vertical' classes={{ root: classes.dividerAmcaVertical }} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography component='p' variant='h6' align='center'>
                      Toplam Tutar
                    </Typography>
                    <Typography variant='body1' align='center'>
                      250 Coin = 250 TL
                    </Typography>
                  </Grid>
                </Grid>
                {/* </div> */}
              </Grid>
              <Divider classes={{ root: classes.dividerAmca }} />
              <Grid item xs={12}>
                <Typography variant='h6' align='center'>
                  Yüklenecek Bakiye Miktarını Seçin
                </Typography>
              </Grid>
              <Divider classes={{ root: classes.dividerAmca }} />
              <Grid item xs={12}>
                <FormControl className={classes.formButtonsControl}>
                  <RadioGroup defaultValue={selectedMoneyAmount} aria-label='coin' name='coin-radios' onChange={handleChangeMoneyAmount} value={selectedMoneyAmount} className={classes.radioGrupControl}>
                    <>
                      {texts &&
                        texts.map((item, index) => {
                          return (
                            <>
                              <FormControlLabel className={classes.formButtons} value={item} control={<StyledButton key={item} text={item} />} />
                              {index !== texts.length - 1 ? (
                                <Divider
                                  flexItem
                                  orientation='vertical'
                                  classes={{
                                    root: classes.dividerAmcaVertical,
                                  }}
                                />
                              ) : null}
                            </>
                          )
                        })}
                    </>
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {isMoneySelected ? (
          <Button variant='text' color='primary' onClick={unSelectMoney}>
            Back
          </Button>
        ) : (
          <Button variant='text' onClick={props.handPaymentModalClose} color='primary' endIcon={<CancelIcon />}>
            Close
          </Button>
        )}
        {isMoneySelected ? (
          <Button className={classes.GoBtns} variant='contained' endIcon={<Send />} onClick={handleDeposit}>
            Deposit
          </Button>
        ) : (
          <Button className={classes.GoBtns} variant='contained' onClick={selectMoney} endIcon={<Send />}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Payment
