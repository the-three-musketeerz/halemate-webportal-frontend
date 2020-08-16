import React from 'react'
import NavBar from './Navbar'
import axios from 'axios'
import { whoAmI, appointmentAPI, rootUrl } from '../config/config'
import Container from '@material-ui/core/Container'
import AppointmentCardsContainer from './AppointmentCardsContainer'
import DoctorsAvailable from './DoctorList'
import CreateAppointmentForm from './CreateAppointment'
import { Redirect } from 'react-router-dom'

function Portal () {
  const token =  localStorage.getItem('token')
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
    console.log("Token" ,token)
    if(token == null){
      console.log("Redirecting to login")
      return (
      <Redirect to={{pathname: '/login'}}/>
      )
    }
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

export default Portal
