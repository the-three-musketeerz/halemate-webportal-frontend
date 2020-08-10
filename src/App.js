import React from 'react';
import NavBar from './components/Navbar'

function App() {

  const [notification, setNotification] = React.useState(140)
  const [appointments, setAppointments] = React.useState([])
  const [doctors, setDoctors] = React.useState([])

  return (
    <div className="App">
      <NavBar clientHospital="Aryaman" serverName = "HaleMate portal" notifCount = {notification}/>
      
    </div>
  );
}

export default App;
