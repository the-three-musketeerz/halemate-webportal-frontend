import React from 'react';
import NavBar from './components/Navbar'
import axios from 'axios'
import AppointmentCard from './components/AppointmentCard'
import DoctorsAvailable from './components/DoctorList'
function App() {

  const [isLoggedIn, toogleLogin] = React.useState(false)
  const doctorsDetail = [
    {
      name: 'Aryaman Behera',
      specialization: ['surgeon', 'dentist', 'doctor1'],
      timing: '11 - 12 PM'
    },
    {
      name: 'Doctor no. 2',
      specialization: ['surgeon', 'heart', 'doctor2'],
      timing: '12 - 12 AM'
    }
  ]

  return (
    <div className="App">
      <NavBar clientHospital="Aryaman" serverName = "HaleMate portal" notifCount = {notification}/>
      <AppointmentCard/>
      <DoctorsAvailable list={doctorsDetail}/>

    </div>
  );
}

export default App;
