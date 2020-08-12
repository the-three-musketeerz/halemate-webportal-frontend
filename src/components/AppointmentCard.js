import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
    maxWidth: 345
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
  const classes = useStyles()
  const statusStyles = useInputStyles()
  const appointment = props.iter
  const appointment_created_at = time2date(appointment.appointment_made_time)

  const [status, setStatus] = React.useState(appointment.status)

  const handleStatusChange = event => {
    setStatus(event.target.value)
    axios
      .patch(
        `${rootUrl}${appointmentAPI}${appointment.id}/`,
        {
          status: event.target.value
        },
        {
          headers: {
            Authorization: `Token ${props.token}`
          }
        }
      )
      .catch(err => console.error(err))
  }

  return (
    <Card className={classes.root} key={appointment.id}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
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
      </CardContent>
      <CardActions disableSpacing>
        <FormControl className={statusStyles.formControl}>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            defaultValue={status}
            onChange={handleStatusChange}
          >
            <MenuItem value={'P'}>Pending</MenuItem>
            <MenuItem value={'R'}>Rejected</MenuItem>
            <MenuItem value={'A'}>Approved</MenuItem>
          </Select>
        </FormControl>
      </CardActions>
    </Card>
  )
}
