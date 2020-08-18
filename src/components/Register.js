import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { rootUrl, registerUrl, loginUrl } from '../config/config'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function Register () {
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [name, setName] = React.useState(null)
  const [phoneNumber, setPhoneNumber] = React.useState(null)

  const handleSignup = event => {
    event.preventDefault()
    console.log('Signing up as Hospital')
    axios
      .post(rootUrl + registerUrl, {
        email: email,
        password: password,
        name: name,
        phoneNumber: phoneNumber,
        registered_as: 'H'
      })
      .then(res => {
        if (res.status === 200) {
          console.log('Successfully signed up!')
          window.location = window.location.origin + 'login/'
        }
      })
      .catch(err => console.log(err))
  }

  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up for Halemate-portal
        </Typography>
        <form className={classes.form} onSubmit={handleSignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                onChange={event => setName(event.target.value)}
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                onChange={event => setEmail(event.target.value)}
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                onChange={event => setPhoneNumber(event.target.value)}
                id='phoneNumber'
                label='Phone Number'
                name='phoneNumber'
                autoComplete='phoneNumber'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                onChange={event => setPassword(event.target.value)}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link href='/login' variant='body2'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
