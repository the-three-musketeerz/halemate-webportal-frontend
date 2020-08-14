import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import { webSocket, webSocketUrl } from '../config/config'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

export default function NotifIcon (props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const notifRef = React.useRef(null)

  const [notifCount, setNotifCount] = React.useState(0)

  const [notifications, setNotifications] = React.useState([])

  React.useEffect(() => {
    const ws = new WebSocket(`${webSocketUrl}${webSocket}${props.token}`)

    ws.onopen = event => {
      console.log(event)
    }

    ws.onmessage = event => {
      const data = JSON.parse(event.data)
      setNotifCount(notifCount => notifCount + 1)
      console.log(data)
      notifRef.current.click()
      if (data.type == 200) {
        console.log([...notifications], 'before setNotif')
        let obj = {}
        obj['type'] = "newAppointment - 200"
        obj['message'] = "You got a new appointment!"
        obj['appointment_id'] = data.appointment_id
        setNotifications(notifications => notifications.concat(obj))
      }
    }
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

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
          <MenuItem >{notification.message}</MenuItem>
        ))}
      </Popover>
    </div>
  )
}
