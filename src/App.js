import React from 'react'
import NavBar from './components/Navbar'
import axios from 'axios'
import { whoAmI, appointmentAPI, rootUrl, webSocket, webSocketUrl } from './config/config'
import Container from '@material-ui/core/Container'
import AppointmentCardsContainer from './components/AppointmentCardsContainer'
import DoctorsAvailable from './components/DoctorList'
import CreateAppointmentForm from './components/CreateAppointment'

function App () {

  const [isLoggedIn, toogleLogin] = React.useState(false)
  const [token, setToken] = React.useState(
    '48b652b491668f44fd9c3330d185a23e00139439aa35c0ca867037b982857f41'
    )
  
  const [hospitalName, setHospitalName] = React.useState(null)
  const [hospitalId, setHospitalId] = React.useState(null)
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
      patient_name: "Patient",
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
      .get(rootUrl + whoAmI)
      .then(res => {
        // console.log(res.data[0].hospital_appointments)
        //console.log(res.data[0])
        setDoctors(res.data[0].doctors)
        setHospitalName(res.data[0].name)
        setHospitalId(res.data[0].id)
      })
  }

  const fetchHospitalAppointments = () => {
    console.log("fetched appointments")
    axios
      .get(rootUrl + appointmentAPI)
      .then(res => {
        console.log(res.data)
        setAppointments(res.data)
      })
      .catch(err => console.error(err))
  }

  React.useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    fetchHospitalInfo()
    fetchHospitalAppointments()
  }, [])

  return (
    <div className='App'>
      <NavBar
        clientHospital={hospitalName}
        serverName='HaleMate portal'
        token={token}
      />
      <Container>
        <AppointmentCardsContainer
          appointmentList={appointments}
        />
      </Container>
      <DoctorsAvailable list={doctors} />
        <CreateAppointmentForm
          doctors={doctors}
          hospitalId={hospitalId}
          appointmentCallback={fetchHospitalAppointments}
        />
    </div>
  )
}

export default App
