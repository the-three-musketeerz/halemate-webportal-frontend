import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { rootUrl, appointmentAPI } from '../config/config'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    borderRadius: 20,
    boxShadow: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const time2date = date => {
  let d = new Date(date)
  return d.toDateString()
}

const useInputStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

export default function AppointmentCard (props) {
  const [isRendered, setRenderStatus] = React.useState(true)
  const classes = useStyles()
  const statusStyles = useInputStyles()
  const appointment = props.iter
  const appointment_created_at = time2date(appointment.appointment_made_time)
  const [selectedDate, setSelectedDate] = React.useState(
    new Date(appointment.appointment_time)
  )
  const [status, setStatus] = React.useState(appointment.status)

  const handleStatusChange = event => {
    setStatus(event.target.value)
    axios
      .patch(`${rootUrl}${appointmentAPI}${appointment.id}/`, {
        status: event.target.value
      })
      .catch(err => console.error(err))
  }

  const handleDeleteAppointment = () => {
    axios
      .delete(`${rootUrl}${appointmentAPI}${appointment.id}/`)
      .then(() => {
        setRenderStatus(false)
      })
      .catch(err => console.error(err))
  }

  const handleTimeChange = date => {
    setSelectedDate(date)
    axios
      .patch(`${rootUrl}${appointmentAPI}${appointment.id}/`, {
        appointment_time: date
      })
      .catch(err => console.error(err))
  }

  return (
    <Collapse in={isRendered} unmountOnExit>
      <Card className={classes.root} key={appointment.id} variant='outlined'>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {}
            </Avatar>
          }
          action={
            <IconButton aria-label='settings' onClick={handleDeleteAppointment}>
              <CloseIcon />
            </IconButton>
          }
          title={appointment.patient_name}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            Appointment Created at: {appointment_created_at}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Doctor: {appointment.doctor.name}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            Appointment Reason: {appointment.reason}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <FormControl className={statusStyles.formControl}>
            <InputLabel id='demo-simple-select-label'>Status</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              defaultValue={appointment.status}
              onChange={handleStatusChange}
            >
              <MenuItem value={'P'}>Pending</MenuItem>
              <MenuItem value={'R'}>Rejected</MenuItem>
              <MenuItem value={'A'}>Approved</MenuItem>
            </Select>
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label='Appointment Date'
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
                label='Appointment Timing'
                value={selectedDate}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </CardActions>
      </Card>
    </Collapse>
  )
}
