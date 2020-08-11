import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import PersonIcon from '@material-ui/icons/Person'
import Chip from '@material-ui/core/Chip'
import { blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
})

const useStylesChip = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
}))

function SimpleDialog (props) {
  const classes = useStyles()
  const chipClasses = useStylesChip()
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const doctorsDetail = props.list

  return (
    <Dialog
      onClose={handleClose}
      open={open}
    >
      <DialogTitle id='doctors-list'>
        Available doctors in the Hospital
      </DialogTitle>
      <List>
        {doctorsDetail.map(doctor => (
          <ListItem button>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={doctor.name} />
            <Container>
              <div className={chipClasses.root}>
                {doctor.specialization.map(specialization => (
                  <Chip color='primary' label={specialization} />
                ))}
              </div>
            </Container>
            <ListItemText primary={doctor.timing} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default function DoctorsAvailable (props) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button variant='contained' color='primary' onClick={handleClickOpen}>
        Doctors Available
      </Button>
      <SimpleDialog
        open={open}
        onClose={handleClose}
        list={props.list}
      />
    </div>
  )
}
