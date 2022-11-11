// Hooks
import {useState, useEffect} from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'

// Components
import AboutPage from './AboutPage';
import Login from './Login';
import ChurchLandingAttributes from './ChurchLandingAttributes';
import GivingModal from './GivingModal';
import EventsContainer from './EventsContainer';
import EventInfoPage from './EventInfoPage';
import BroadcastsContainer from './BroadcastsContainer';
import NavBar from './NavBar';
import ProfilePage from './ProfilePage';
import Footer from './Footer';
import PrayerRequestsContainer from './PrayerRequestsContainer';

import './App.css';



//BUGS
//Once login has been submitted logout model popup displays for some reason
//edit throws an error and won't update in realtime in state
//delete throws an error and won't update in realtime state

function App() {


  const [ authChecked, setAuthChecked ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ events, setEvents ] = useState([]);
  const [ eventMonths, setEventMonths ] = useState([]);
  const [ givingIsOpen, setGivingIsOpen ] = useState(false);
  const [ staffIsOpen, setStaffIsOpen ] = useState(false);
  const [ addEventIsOpen, setAddEventIsOpen ] = useState(false);
  const [ logoutIsOpen, setLogoutIsOpen ] = useState(false);
  const [ showEvents, setShowEvents ] = useState([]);

  
  // const [home, setHome] = useState ([])

  useEffect(() => {
    fetch(`/api/events`)
      .then((r) => r.json())
      .then(events => setEvents(events))
  },[])

  useEffect(() => {
    fetch(`/api/event_months`)
      .then((r) => r.json())
      .then(event_months => setEventMonths(event_months))
  },[])

  console.log(`eventMonths: ${JSON.stringify(eventMonths)}`);


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

  function handleAddNewEvent(newEvent){
    const newEvents = [...events, newEvent]
    setEvents(newEvents);
  }

  //function that runs an update request for an event 
  const handleEditEvent = (editedEvent) => {
    const eventEdit = events.map((oldEvent) => {
      if (oldEvent.id === editedEvent.id){
        return editedEvent;
      } else {
        return oldEvent;
      }
    })
    setEvents(eventEdit);
  }

  // function that runs a delete request for an event
  function handleDeleteEvent(deletedID) {
    // console.log(deletedID)
    const updatedEventsArray = events.filter(
      (event) => event.id !== deletedID
    );
    setEvents(updatedEventsArray);
  }

  if (!authChecked){
    return(
      <div></div>
    )
  }
  return (
    <div className="App">
      <NavBar givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} authChecked={authChecked} setAuthChecked={setAuthChecked}/>
        <Routes>      
          <Route path='/' element={<ChurchLandingAttributes currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>  
          <Route path='/events' element={<EventsContainer currentUser={currentUser} eventMonths={eventMonths} events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents} handleAddNewEvent={handleAddNewEvent} handleDeleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen}/>}/>
          {/* <Route exact path='/about_us' component={AboutUsContainer} /> */}
          <Route path='/events/:id' element={<EventInfoPage currentUser={currentUser} events={events} setEvents={setEvents}/>}/>
          <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} authChecked={authChecked} setLogoutIsOpen={setLogoutIsOpen} />}/>
          <Route path='/profile' element={<ProfilePage currentUser={currentUser} authChecked={authChecked}/>}/>
          <Route path='/broadcasts' element={<BroadcastsContainer/>}/>
          <Route path='/prayer_requests' element={<PrayerRequestsContainer/>}/>
          <Route path='/about' element={<AboutPage/>}/>
        </Routes>
        {/* <button className='giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
        <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/> */}
      <Footer givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} authChecked={authChecked} setAuthChecked={setAuthChecked}/>
    </div>
  );
}

export default App;

