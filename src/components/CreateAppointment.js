import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Fab from '@material-ui/core/Fab'
import { rootUrl, appointmentAPI } from '../config/config'
import AddIcon from '@material-ui/icons/Add'
import Slide from '@material-ui/core/Slide'
import 'date-fns'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function CreateAppointmentForm (props) {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const doctorsList = props.doctors
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [patientName, setPatientName] = React.useState(null)
  const [doctor, setDoctor] = React.useState(null)
  const [reason, setReason] = React.useState(null)
  const [selectedDate, setSelectedDate] = React.useState(
      new Date("2017-05-24T10:30Z")
  )

  const handleTimeChange = date => {
    setSelectedDate(date)
  }

  const handleDoctor = event => {
    setDoctor(event.target.value)
  }

  const handleReason = event => {
    setReason(event.target.value)
  }

  const handlePatientName = event => {
    setPatientName(event.target.value)
  }

  const handleSubmit = () => {
    axios.post(
      rootUrl + appointmentAPI,
      {
        patient_name: patientName,
        doctor: doctor,
        reason: reason,
        appointment_time: selectedDate,
        hospital: props.hospitalId
      },
    ).then(() => {
        props.appointmentCallback()
    })
    setPatientName(null)
    setDoctor(null)
    setReason(null)
    setPatientName(null)
    setSelectedDate(null)
    handleClose()
  }

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 40,
    bottom: 40,
    left: 'auto',
    position: 'fixed',
};

  return (
    <div>
      <Button onClick={handleClickOpen} zIndex="tooltip">
        <Fab color='primary' aria-label='add' size='large' style={fabStyle} variant='extended'>
          <AddIcon className={classes.extendedIcon} />
        Create Appointment
        </Fab>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Patient Name'
            type='name'
            value={patientName}
            onChange={handlePatientName}
            fullWidth
          />
          <TextField
            autoFocus
            margin='dense'
            id='reason'
            label='Reason'
            type='name'
            value={reason}
            onChange={handleReason}
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel id='demo-simple-select-label'>Doctor</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              onChange={handleDoctor}
            >
              {doctorsList.map(doctor => (
                <MenuItem value={doctor.id} key={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label='Date picker dialog'
                format='MM/dd/yyyy'
                value={selectedDate}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                margin='normal'
                id='time-picker'
                label='Time picker'
                value={selectedDate}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
