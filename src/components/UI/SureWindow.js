import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function SureWindow({
  sureWindow,
  handleSureWindowClose,
  title = '',
  message = '',
  confirmButtnFunc = () => {},
  agreeBtnText = 'Accept',
  cancelBtnText = 'Cancel',
  innerComponent = {},
}) {
  return (
    <div>
      <Dialog
        open={sureWindow}
        onClose={handleSureWindowClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          style: {
            backgroundColor: '#16161b',
            boxShadow: 'none',
            padding: '10px',
            color: 'white',
          },
        }}
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {innerComponent && innerComponent}
            {message && message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSureWindowClose} color='primary'>
            {cancelBtnText}
          </Button>
          <Button onClick={confirmButtnFunc} color='primary' autoFocus>
            {agreeBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
