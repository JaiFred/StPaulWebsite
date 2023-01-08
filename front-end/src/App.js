// Hooks
import {useState, useEffect} from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'

// Components
import AboutPage from './AboutPage';
import Login from './Login';
import SignUp from './SignUp';
import SignUpSuccessPage from './SignUpSuccessPage';
import ChurchLandingAttributes from './ChurchLandingAttributes';
import GivingModal from './GivingModal';
import PasswordRecoveryRequestSuccess from './PasswordRecoveryRequestSuccess';
import UpdateEmailSuccessPage from './UpdateEmailSuccessPage';
import EventsContainer from './EventsContainer';
import EventInfoPage from './EventInfoPage';
import BroadcastsContainer from './BroadcastsContainer';
import NextServicePage from './NextServicePage';
import Navbar from './Navbar';
import ProfilePage from './ProfilePage';
import SubscriptionCard from './SubscriptionCard';
import Footer from './Footer';
import PrayerRequestsContainer from './PrayerRequestsContainer';
import RecurringPayment from './RecurringPayment';
import ContactUsPage from './ContactUsPage';
import HonorsPage from './HonorsPage';
import EditHonorsDocuments from './EditHonorsItem';
import PasswordRecoveryPage from './PasswordRecoveryPage';
import YouthCorner from './YouthCorner';


// CSS
import './App.css';
import './YouthCorner.css';

//Goal:

//Subscription schedule date should only issue the creation of a subscription and should not prompt it to consider previous dates it has missed
//Subscription should have a hard start on the date of choice even/especially if that date has been passed and must start in a separate month
//Subscription does not calculate the values of time in the month it is made. It calculates for the value of time after the first issued payment
//
//Subscription is cl


// Password recovery
  // have a form where the user fills up their email with us
  // it goes to backend (route/controller/action). we check in the database whether the email exists
  // password_verifications_controller  
  // if email does not exist, we return a message saying 'we could not find this email!'
  // if the email exist, we have to generate an OTP code and send it to the user at his email
  // think about OTP expiration, how to generate and store OTP codes in our database
  // then user needs to come to a page in our website, where they can submit their email and OTP code, and the new passord
  // and then in the backend (another route/controller/action) we will verify the OTP code and email, if all good, we will 
  // reset the password for the user to the new passord...

//For accounts
//Member information is editable
//Users can delete their account

//For signup
//Can't signup without filling all inputs
//Lets users know the password requirements if invalid password is given - show completed requirements
    //At least 5 characters (and up to 100 characters)
    //5 or more unique characters.
    //At least 3 of the following: uppercase, lowercase, numeric, or special characters. The allowed special characters are ~ ! @ # $ % ^ * - _ = + [ { ] } / ; : , . ?

//password confirmation sends alert if it is not filled or not the same as password


//Youth Corner - can is be created post deployment - 

//Admin has the ability to disable Facebook button 

//2 way authentication for signup - email √ 

//

// Today
// Validations

// Only one Admin
// If email doesn’t exist on server don’t proceed with password change.

// Emailjs doesn’t work

// Weekdays do not work

//Giving modal is glitched after making a single payment

//Cancel subscriptions is deleting random subscriptions - not the ones we choose...
//# TODO show next payment date

// 1st
// Subscription starting - User can schedule a payment by month and date




//Events page issues √
  //BUGS
  //event errors out when created - without date - without title - 
  //events arent

// 2nd
//Honors page issue
  //BUGS
  //document errors out when created with just a description
  //document errors out when created with just a picture


//Sign up - "all parameters required" first_name, Last_name, email, username, password and password confirmation... 
//user can edit their info - email adress, name,  in their profile
//user must delete subscriptions before deleting account or subscriptions delete with account
//user must fill out name and email before proceeding with custom payment
//Adding an Event produces visible error and doesn't get created if end and start date values aren't present 
//Mapbox Gl directions

//BUGS
//sign up not generating first name last name email parameters.
//recurring payment not showing up



// Goal:
// I want recurring modal visible even if single payment is not
// fix address inputs on edit event and add event
// connect address input routes in backend  

// Goal:
// Get broadcast page to show most recent three videos on Broadcast Page √
// Get Donation set up on the Giving submission - Church wants to use Paypal -√
// Get Donation pay to be able to cancel the amount
// Get Donation to have regular monthly payment set up -√

// # Send Invoice to subscription payers
// # TODO Make an Admin request to delete customers that want to leave subscription.
// # TODO Make twice monthly cycles for: 
// # 1st and 15th
// # 6th and 20th
// # 11th and 25th
// # Make Monthly payment on a specific day
// # Make weekly payment on a specific day

// Prayer Request Page to be able to submit prayers to leader's email - sender gets an acknowlegdement email back to their email

// Get the Add new event to work properly 
// clean up Event info page
// Event isn't showing up for December
// Submit a picture for the Event Thumbnail

//BUGS
// The Admin's name doesn't show up when first logging in - have to refresh page 
// Single Payment only sending $1.00
// Single payment doesn't submit if no value has been added

function App() {

  const [ authChecked, setAuthChecked ] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(null)
  const [ events, setEvents ] = useState([]);
  const [ showEvents, setShowEvents ] = useState([]);
  const [ givingIsOpen, setGivingIsOpen ] = useState(false);
  const [ staffIsOpen, setStaffIsOpen ] = useState(false);
  const [ addEventIsOpen, setAddEventIsOpen ] = useState(false);
  const [ logoutIsOpen, setLogoutIsOpen ] = useState(false);
  const [ addHonorIsOpen, setAddHonorIsOpen ] = useState(false);
  const [ accountDeleteIsOpen, setAccountDeleteIsOpen ] = useState(false);
  const [ editProfileIsOpen, setEditProfileIsOpen ] = useState(false);
  const [ cancelSubscriptionIsOpen, setCancelSubscriptionIsOpen ] = useState(false);
  const [ cancelFutureSubscriptionIsOpen, setCancelFutureSubscriptionIsOpen ] = useState(false);
  
  // const [home, setHome] = useState ([])

  useEffect(() => {
    fetch(`/api/events`)
      .then((r) => r.json())
      .then(events => setEvents(events))
  },[])

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
      <Navbar givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} authChecked={authChecked} setAuthChecked={setAuthChecked}/>
        <Routes>      
          <Route path='/' element={<ChurchLandingAttributes currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>  
          <Route path='/events' element={<EventsContainer currentUser={currentUser} events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents} handleAddNewEvent={handleAddNewEvent} handleDeleteEvent={handleDeleteEvent} handleEditEvent={handleEditEvent} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen}/>}/>
          {/* <Route exact path='/about_us' component={AboutUsContainer} /> */}
          <Route path='/events/:id' element={<EventInfoPage currentUser={currentUser} events={events} setEvents={setEvents}/>}/>
          <Route path='/login' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} authChecked={authChecked} setLogoutIsOpen={setLogoutIsOpen} />}/>
          <Route path='/signup' element={<SignUp currentUser={currentUser} setCurrentUser={setCurrentUser} authChecked={authChecked} setLogoutIsOpen={setLogoutIsOpen}/>}/>
          <Route path='/signup_success' element={<SignUpSuccessPage/>}/>
          <Route path='/profile' element={<ProfilePage currentUser={currentUser} setCurrentUser={setCurrentUser} authChecked={authChecked} editProfileIsOpen={editProfileIsOpen} setEditProfileIsOpen={setEditProfileIsOpen} accountDeleteIsOpen={accountDeleteIsOpen} setAccountDeleteIsOpen={setAccountDeleteIsOpen}/>}/>
          <Route path='/broadcasts' element={<BroadcastsContainer/>}/>
          <Route path='/prayer_requests' element={<PrayerRequestsContainer/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/recurring-payment' element={<RecurringPayment/>}/>
          <Route path='/contact_us' element={<ContactUsPage/>}/>
          <Route path='/honors' element={<HonorsPage currentUser={currentUser} addHonorIsOpen={addHonorIsOpen} setAddHonorIsOpen={setAddHonorIsOpen}/>}/>
          <Route path='/edithonors/:id' element={<EditHonorsDocuments/>}/>
          <Route path='/subscriptions_page' element={<SubscriptionCard currentUser={currentUser} cancelSubscriptionIsOpen={cancelSubscriptionIsOpen} setCancelSubscriptionIsOpen={setCancelSubscriptionIsOpen} cancelFutureSubscriptionIsOpen={cancelFutureSubscriptionIsOpen} setCancelFutureSubscriptionIsOpen={setCancelFutureSubscriptionIsOpen} />}/>
          <Route path='/password_recovery' element={<PasswordRecoveryPage/>}/>
          <Route path='/next_service' element={<NextServicePage/>}/>
          <Route path='/password_recovery_success' element={<PasswordRecoveryRequestSuccess/>}/>
          <Route path='/update_email_success' element={<UpdateEmailSuccessPage/>}/>
          <Route path='/youth_corner' element={<YouthCorner/>}/>

        </Routes>
        {/* <button className='giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
        <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/> */}
      <Footer givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser} logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} authChecked={authChecked} setAuthChecked={setAuthChecked}/>
    </div>
  );
}

export default App;

