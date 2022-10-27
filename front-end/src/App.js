import {useState, useEffect} from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'

import Login from './Login';
import Logout from './Logout';
import ChurchLandingAttributes from './ChurchLandingAttributes';
import GivingModal from './GivingModal';
import EventsContainer from './EventsContainer';
import EventInfoPage from './EventInfoPage';
import NavBar from './NavBar';

import './App.css';


function App() {
  const [ authChecked, setAuthChecked ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ events, setEvents ] = useState([]);
  const [ givingIsOpen, setGivingIsOpen ] = useState(false);
  const [ staffIsOpen, setStaffIsOpen ] = useState(false);
  const [ logoutIsOpen, setLogoutIsOpen ] = useState(false);
  const [ showEvents, setShowEvents ] = useState([]);

  
  // const [home, setHome] = useState ([])

  useEffect(() => {
    fetch(`/api/events`)
      .then((r) => r.json())
      .then(events => setShowEvents(events))
  },[])

  

  // console.log(currentUser)

  // useEffect(() => {
  //   fetch('/me', {
  //     credentials: 'include'
  //   })
  //   .then((res) => res.json())
  //   .then((home) => setCurrentUser(home));
  //   })

  useEffect(() => {
    fetch('/api/me', {
      credentials: 'include'
    })
      .then(res => {
        if (res.ok) {
          res.json().then(user => {
            setCurrentUser(user)
            setAuthChecked(true)
          })
        } else {
          setAuthChecked(true)
        }
        console.log(authChecked)
     })
  }, [])

  if (!authChecked){
    return(
      <div></div>
    )
  }
  return (
    <div className="App">
      <NavBar givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen}/>
        <Routes>      
          <Route path='/' element={<ChurchLandingAttributes currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>  
          <Route path='/events' element={<EventsContainer events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
          {/* <Route exact path='/about_us' component={AboutUsContainer} /> */}
          <Route path='/events/:id/more_information' element={<EventInfoPage events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
          <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}  />
          <Route path='/logout' element={<Logout currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
        </Routes>
        {/* <button className='giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
        <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/> */}

    </div>
  );
}

export default App;

