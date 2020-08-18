import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppointmentCard from './AppointmentCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  control: {
    padding: theme.spacing(2)
  }
}))

export default function AppointmentCardsContainer (props) {
  const classes = useStyles()
  const appointments = props.appointmentList
  return (
    <Grid
      container
      className={classes.root}
      direction='row'
      justify='space-evenly'
      alignItems='center'
      spacing={2}
    >
      {appointments.map(appointment => (
        <Grid item >
          <AppointmentCard iter={appointment} />
        </Grid>
      ))}
    </Grid>
  )
}
