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

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: { minHeight: 400, minWidth: 800 },
  mainHolder: {
    flexGrow: 1,
    padding: 10,
  },
  dialog: {
    minHeight: 400,
    minWidth: 400,
  },
  card: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  gridItems: {
    width: '100%',
  },
  inputs: {
    width: '100%',
  },
}))

function Payment({ paymentModal, handPaymentModalClose }) {
  const classes = useStyles()

  return (
    <Dialog
      PaperProps={{
        style: {
          minWidth: 800,
          maxWidth: 1200,
          minHeight: 400,
        },
      }}
      open={paymentModal}
      onClose={handPaymentModalClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      className={classes.root}
    >
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button color='primary'>Disagree</Button>
        <Button color='primary' autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Payment
