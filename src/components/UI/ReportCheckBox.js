import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    color: 'green',
  },
  formControl: {
    margin: theme.spacing(3),
    color: 'white',
  },
  checkBoxStyle: {
    color: 'green',
  },
  textBoxStyle: {
    color: 'white',
  },
}))

export default function CheckboxesGroup() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    insult: false,
    swearing: false,
    hate: false,
    other: false,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const { insult, swearing, hate, other } = state
  const error = [insult, swearing, hate, other].filter((v) => v).length !== 4

  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        {/* <FormLabel component='legend'>Report</FormLabel> */}
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={insult}
                onChange={handleChange}
                name='insult'
                className={classes.checkBoxStyle}
              />
            }
            label='Insult'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={swearing}
                onChange={handleChange}
                name='swearing'
                className={classes.checkBoxStyle}
              />
            }
            label='Swearing'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={hate}
                onChange={handleChange}
                name='hate'
                className={classes.checkBoxStyle}
              />
            }
            label='Hate speech'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={other}
                onChange={handleChange}
                name='other'
                className={classes.checkBoxStyle}
              />
            }
            label={
              <TextField
                id='standard-basic-1'
                label='Other'
                className={classes.textBoxStyle}
                InputLabelProps={{
                  style: {
                    color: 'white',
                  },
                }}
              />
            }
          />
        </FormGroup>
        <FormHelperText>belki buraya bişi yazarız yoksa sileriz</FormHelperText>
      </FormControl>
    </div>
  )
}
