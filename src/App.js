import React from 'react'
import NavBar from './components/Navbar'
import axios from 'axios'
import { whoAmI, appointmentAPI, rootUrl } from './config/config'
import Container from '@material-ui/core/Container'
import AppointmentCardsContainer from './components/AppointmentCardsContainer'
import DoctorsAvailable from './components/DoctorList'
function App () {
  const [isLoggedIn, toogleLogin] = React.useState(false)
  const [notification, setNotification] = React.useState(10)
  const [token, setToken] = React.useState(
    '48b652b491668f44fd9c3330d185a23e00139439aa35c0ca867037b982857f41'
  )
  const [hospitalName, setHospitalName] = React.useState(null)

  const [appointments, setAppointments] = React.useState([
    {
      appointment_made_time: null,
      appointment_time: null,
      doctor: {
        id: null,
        name: null
      },
      hospital: null,
      id: null,
      patient_name: null,
      reason: null,
      status: null,
      user: null
    }
  ])

  const [doctors, setDoctors] = React.useState([
    {
      id: null,
      name: null,
      phoneNumber: null,
      specialization: null,
      time_end: null,
      time_start: null
    }
  ])

  const fetchHospitalInfo = () => {
    axios
      .get(rootUrl + whoAmI, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        // console.log(res.data[0].hospital_appointments)
        console.log(res.data[0])
        setDoctors(res.data[0].doctors)
        setHospitalName(res.data[0].name)
      })
  }

  const fetchHospitalAppointments = () => {
    axios
      .get(rootUrl + appointmentAPI, {
        headers: {
          Authorization: `Token ${token}`
        }
      })
      .then(res => {
        console.log(res.data)
        setAppointments(res.data)
      })
  }

  React.useEffect(() => {
    fetchHospitalInfo()
    fetchHospitalAppointments()
  }, [])

  return (
    <div className='App'>
      <NavBar
        clientHospital={hospitalName}
        serverName='HaleMate portal'
        notifCount={notification}
      />
      <Container>
        <AppointmentCardsContainer
          appointmentList={appointments}
          token={token}
        />
      </Container>
      <DoctorsAvailable list={doctors} />
    </div>
  )
}

export default App
