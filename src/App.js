import React from 'react'
import Portal from './components/Portal'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }
  return true
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    }
  />
)

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' render={props => <Login {...props} />} />
        <Route
          exact
          path='/register'
          render={props => <Register {...props} />}
        />
        <AuthRoute
          exact
          path='/'
          component={props => <Portal {...props} />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
