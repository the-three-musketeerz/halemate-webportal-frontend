const ROOT_URL = 'http://localhost:8000'

/*GET request for fetching every resource associated with the hospital 
except appointments for security reasons
Authorization: Token <redacted>
*/
const WHO_AM_I = '/halemate/whoami/'

/*POST, PATCH requests for creating, editing appointment model
Authorization: Token <redacted>
*/
const APPOINTMENT = '/halemate/appointment/'

//Websocket for new appointments and alerts
const WEB_SOCKET_URL = 'ws://localhost:8000'
const WEB_SOCKET = '/ws/halemate/'

//Login, logout and register API endpoint for POST request 
const LOGIN_URL =  '/halemate/login/'
const REGISTER_URL = '/halemate/register/'
const LOGOUT_URL = '/halemate/logout/'

module.exports = {
  rootUrl: ROOT_URL,
  whoAmI: WHO_AM_I,
  appointmentAPI: APPOINTMENT,
  webSocket: WEB_SOCKET,
  webSocketUrl: WEB_SOCKET_URL,
  loginUrl: LOGIN_URL,
  registerUrl: REGISTER_URL,
  logoutUrl: LOGOUT_URL
}
