/*eslint-disable */

import React from 'react'
import Popover from '@material-ui/core/Popover'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { webSocket, webSocketUrl } from '../config/config'
import MenuItem from '@material-ui/core/MenuItem'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import Collapse from '@material-ui/core/Collapse'

// const notifSoundUrl = '../assets/audio/swiftly.mp3'

export default function NotifIcon (props) {
  const [isAlertOpen, setAlertOpen] = React.useState(false)
  const [isRendered, setRenderStatus] = React.useState(true)

  const handleAlertClose = () => {
    setRenderStatus(false)
    setAlertOpen(false)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)
  const notifRef = React.useRef(null)

  const [notifCount, setNotifCount] = React.useState(0)

  const [notifications, setNotifications] = React.useState([])

  const [alert, setAlerts] = React.useState([])
  const [lat, setLat] = React.useState(null)
  const [lng, setLng] = React.useState(null)
  const [patientLocation, setPatientLocation] = React.useState(null)
  const [
    patientLocationGoogleMaps,
    setPatientLocationGoogleMaps
  ] = React.useState(null)

  React.useEffect(() => {
    const ws = new WebSocket(`${webSocketUrl}${webSocket}${props.token}`)

    ws.onopen = event => {
      console.log(event)
    }

    ws.onmessage = event => {
      const data = JSON.parse(event.data)
      setNotifCount(notifCount => notifCount + 1)
      console.log(data)
      if (data.type === 200) {
        notifRef.current.click()
        let obj = {}
        obj['type'] = 'newAppointment - 200'
        obj['message'] = 'You got a new appointment!'
        obj['appointment_id'] = data.appointment_id
        setNotifications(notifications => notifications.concat(obj))
        props.appointmentCallback()
      } else {
        notifRef.current.click()
        setAlertOpen(true)
        let obj = {}
        obj['type'] = 'emergencyAlert - 505'
        obj['message'] = 'Medical Emergency Alert'
        obj['patient_contact'] = data.patient_contact
        obj['patient_name'] = data.patient_name
        obj['patient_lat'] = data.lat
        obj['patient_lng'] = data.lng

        setAlerts(alert => alert.concat(obj))

        setLat(data.lat)
        setLng(data.lng)
        setPatientLocation(
          `https://www.google.com/maps/embed/v1/place?q=${data.lat},${data.lng}&key=AIzaSyAVn6ea2iJcMq9Wp0pKGlr3RpA8SVK1MCM`
        )
        setPatientLocationGoogleMaps(
          `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${lat},${lng}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
        )
      }
    }
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  React.useEffect(() => {
    console.log(alert[0])
    console.log(patientLocation)
  }, [alert, patientLocation])

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const Transition = React.forwardRef(function Transition (props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
  })

  return (
    <div>
      <IconButton
        color='inherit'
        onClick={handleClick}
        aria-describedby={id}
        ref={notifRef}
      >
        <Badge badgeContent={notifCount} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {notifications.map(notification => (
          <MenuItem>{notification.message}</MenuItem>
        ))}
      </Popover>
      <Collapse in={isAlertOpen} unmountOnExit>
        <Dialog
          open={isAlertOpen}
          TransitionComponent={Transition}
          onClose={handleAlertClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            {'Medical Emergency'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              {'Details'}
              <Typography>{JSON.stringify(alert)}</Typography>
              <Typography>
                <a target='_blank' href={patientLocationGoogleMaps}>
                  Exact location in Google Maps :{' '}
                </a>
              </Typography>
            </DialogContentText>
            <iframe
              width='100%'
              height='600'
              frameborder='0'
              scrolling='no'
              marginheight='0'
              marginwidth='0'
              src={patientLocation}
            ></iframe>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertClose} color='primary'>
              Close
            </Button>
            <Button onClick={handleAlertClose} color='primary'>
              Take action
            </Button>
          </DialogActions>
        </Dialog>
      </Collapse>
    </div>
  )
}
