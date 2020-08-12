import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AppointmentCard from './AppointmentCard'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  control: {
    padding: theme.spacing(2)
  }
}))

export default function AppointmentCardsContainer (props) {
  const [spacing, setSpacing] = React.useState(2)
  const classes = useStyles()
  const appointments = props.appointmentList
  return (
    <Grid
      container
      className={classes.root}
      direction='row'
      justify='flex-start'
      alignItems='center'
    >
        {appointments.map(appointment => (
          <AppointmentCard iter={appointment} token={props.token} />
        ))}
    </Grid>
  )
}
