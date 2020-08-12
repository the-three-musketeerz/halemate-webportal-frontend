import React from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip'
import { blue } from '@material-ui/core/colors'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  table: {
    minWidth: 500
  }
})

function SimpleDialog (props) {
  const classes = useStyles()
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const doctorsDetail = props.list

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id='doctors-list' align='center'>
        Available doctors in the Hospital
      </DialogTitle>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Doctor's Name</StyledTableCell>
              <StyledTableCell align='center'>Specialization</StyledTableCell>
              <StyledTableCell align='center'>Contact Number</StyledTableCell>
              <StyledTableCell align='center'>Timing</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctorsDetail.map(doctor => (
              <StyledTableRow key={doctor.name}>
                <StyledTableCell align='center'>{doctor.name}</StyledTableCell>
                <StyledTableCell align='center'>
                  <Chip color='primary' label={doctor.specialization} />
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {doctor.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align='center'>
                  {doctor.time_end}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Dialog>
  )
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
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
      <SimpleDialog open={open} onClose={handleClose} list={props.list} />
    </div>
  )
}
