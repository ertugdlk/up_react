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

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: { minHeight: 400, minWidth: 800 },
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
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  gridItems: {
    width: '100%',
    color: 'white',
  },
  inputs: {
    width: '100%',
    color: 'white',
  },
  formButtonsControl: {
    display: 'flex',
  },
  radioGrupControl: {
    flexDirection: 'row',
  },
  formButtons: {},
}))

function Payment({ paymentModal, handPaymentModalClose }) {
  const [isMoneySelected, setIsMoneySelected] = useState(false)
  const [selectedMoneyAmount, setSelectedMoneyAmount] = useState('250')
  const [cardHolderName, setCardHolderName] = useState('')
  const [carNumeber, setCarNumeber] = useState('')
  const [cvv, setCvv] = useState('')
  const [experieYear, setExperieYear] = useState('')
  const [experieMonth, setExperieMonth] = useState('')
  const [zipCode, setZipCode] = useState('')
  const classes = useStyles()

  function StyledRadio({ text = '' }) {
    const classes = useStyles()

    return (
      <Button
        style={{ color: text === selectedMoneyAmount ? 'pink' : 'white' }}
        variant='contained'
        onClick={(e) => handleChangeMoneyAmount(e, text)}
      >
        {text}
      </Button>
    )
  }

  const handleChangeMoneyAmount = (e, text) => {
    setSelectedMoneyAmount(text)
  }

  const selectMoney = () => {
    setIsMoneySelected(true)
  }
  const unSelectMoney = () => {
    setIsMoneySelected(false)
  }

  return (
    <Dialog
      PaperProps={{
        style: {
          minWidth: 800,
          maxWidth: 1200,
          minHeight: 400,
          backgroundColor: 'grey',
          boxShadow: 'none',
          padding: '10px',
          color: 'white',
        },
      }}
      open={paymentModal}
      onClose={handPaymentModalClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={classes.root}
    >
      <DialogContent>
        {isMoneySelected ? (
          <div className={classes.mainHolder}>
            <Grid
              container
              direction='column'
              justify='flex-end'
              alignItems='center'
              spacing={1}
            >
              <Grid item xs={12}>
                <div className={classes.mainHolder}>
                  <Grid
                    container
                    direction='row'
                    justify='center'
                    alignItems='center'
                  >
                    <Grid item xs={3} className={classes.gridItems}>
                      <div className={classes.mainHolder}>
                        <Grid
                          container
                          direction='column'
                          justify='flex-start'
                          alignItems='flex-start'
                          spacing={1}
                        >
                          <Grid item xs={6} className={classes.gridItems}>
                            <Button>
                              <Card className={classes.card}>
                                <CardMedia
                                  className={classes.media}
                                  image={CardImageHolder}
                                  title='Paella dish'
                                />
                                <CardContent>
                                  <Typography variant='body2' component='p'>
                                    Card/Debit
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Button>
                          </Grid>
                          <Grid item xs={6} className={classes.gridItems}>
                            <Button>
                              <Card className={classes.card}>
                                <CardMedia
                                  className={classes.media}
                                  image={CardImageHolder}
                                  title='Paella dish'
                                />
                                <CardContent>
                                  <Typography variant='body2' component='p'>
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
                        <Grid
                          container
                          direction='column'
                          justify='center'
                          alignItems='center'
                          spacing={1}
                        >
                          <Grid item xs={12} className={classes.gridItems}>
                            <Typography variant='h4' component='h5'>
                              {'Buy so we can earn money?'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} className={classes.gridItems}>
                            <InputLabel shrink>
                              <Typography variant='h4' component='h5'>
                                Cardholder Name
                              </Typography>
                            </InputLabel>

                            <TextField
                              autoComplete={false}
                              fullWidth
                              className={classes.inputs}
                              id='outlined-basic'
                              variant='outlined'
                            />
                          </Grid>
                          <Grid item xs={12} className={classes.gridItems}>
                            <InputLabel shrink>
                              <Typography variant='h4' component='h5'>
                                Card Name
                              </Typography>
                            </InputLabel>

                            <TextField
                              fullWidth
                              autoComplete={false}
                              className={classes.inputs}
                              id='outlined-basic'
                              variant='outlined'
                            />
                          </Grid>
                          <Grid item xs={12} className={classes.gridItems}>
                            <Grid
                              container
                              direction='row'
                              justify='space-between'
                              alignItems='center'
                              spacing={1}
                            >
                              <Grid item xs={4}>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  label='CVV'
                                  inputProps={{
                                    maxLength: 3,
                                  }}
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  label='Expiration'
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  className={classes.inputs}
                                  id='outlined-basic'
                                  variant='outlined'
                                  label='Zip Code'
                                  inputProps={{
                                    maxLength: 3,
                                  }}
                                />
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
            <Grid
              container
              direction='column'
              justify='flex-end'
              alignItems='center'
              spacing={1}
            >
              <Grid item xs={12}>
                <Typography variant='h3'>Bakiye Yükleme</Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={1}
                >
                  <Grid item xs={4}>
                    <Typography variant='h6'>Yükleme Miktarı</Typography>
                    <Typography variant='body1'>250 Coin</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h6'>İşlem Ücreti</Typography>
                    <Typography variant='body1'>10 Coin Ücretsiz</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant='h6'>Toplam Tutar</Typography>
                    <Typography variant='body1'>250 Coin = 250 TL</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>
                  Yüklenecek Bakiye Miktarını Seçin
                </Typography>

                <FormControl className={classes.formButtonsControl}>
                  <RadioGroup
                    defaultValue={selectedMoneyAmount}
                    aria-label='gender'
                    name='customized-radios'
                    // onChange={handleChangeMoneyAmount}
                    value={selectedMoneyAmount}
                    className={classes.radioGrupControl}
                  >
                    <FormControlLabel
                      className={classes.formButtons}
                      value='50'
                      control={<StyledRadio key={'50'} text='50' />}
                    />
                    <FormControlLabel
                      className={classes.formButtons}
                      value='100'
                      control={<StyledRadio key={'100'} text='100' />}
                    />
                    <FormControlLabel
                      className={classes.formButtons}
                      value='250'
                      control={<StyledRadio key={'250'} text='250' />}
                    />
                    <FormControlLabel
                      className={classes.formButtons}
                      value='500'
                      control={<StyledRadio key={'500'} text='500' />}
                    />
                    <FormControlLabel
                      className={classes.formButtons}
                      value='1000'
                      control={<StyledRadio key={'1000'} text='1000' />}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {isMoneySelected ? (
          <Button color='primary' onClick={unSelectMoney}>
            Back
          </Button>
        ) : (
          <Button color='primary' onClick={handPaymentModalClose}>
            Close
          </Button>
        )}
        {isMoneySelected ? (
          <Button color='primary'>Deposit</Button>
        ) : (
          <Button color='primary' onClick={selectMoney}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default Payment
