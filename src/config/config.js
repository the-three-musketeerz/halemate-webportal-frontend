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

module.exports = {
  rootUrl: ROOT_URL,
  whoAmI: WHO_AM_I,
  appointmentAPI: APPOINTMENT
}
