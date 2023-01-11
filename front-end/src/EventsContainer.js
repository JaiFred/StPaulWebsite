import { Link, useNavigate } from "react-router-dom";

import Navbar from "./Navbar";
import EventCard from './EventCard';
import SubmitNewEventModal from "./SubmitNewEventModal";


// Goal:
// Get the Add new event to work properly
// clean up Event info page

// Child Component of App.js

function EventsContainer({ currentUser, events, setEvents, handleAddNewEvent, handleEditEvent, handleDeleteEvent, addEventIsOpen, setAddEventIsOpen }){
    // debugger;
    const EventList = events.map((event) =>( 
        <EventCard key={event.id} event={event} events={events} setEvents={setEvents} currentUser={currentUser} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent}/>
    ))

    const navigate = useNavigate()

    // const months = {
    //     "January": "01",
    //     "February": "02",
    //     "March": "03",
    //     "April": "04",
    //     "May": "05",
    //     "June": "06",
    //     "July": "07",
    //     "August": "08",
    //     "September": "09",
    //     "October": "10",
    //     "November": "11",
    //     "December": "12",
    // }

    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      // let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      let past5 = new Date();
      let currentMonth = past5.getMonth();
      let currentAbsMonth = past5.getFullYear() * 12 + currentMonth;
      let allMonths = Array.from({length: 19}, (_, offset) => {
        console.log(`offset: ${offset}`);
        return currentAbsMonth - 7 + offset
      }
      );
      
      let eventMonthOptions = allMonths.map(absMonth =>
          monthNames[absMonth % 12] + " " + Math.floor(absMonth / 12) 
      );
                   
      console.log(eventMonthOptions);

    function handleButtonClick(e) {
        e.preventDefault()
        let month = e.target.value;
        console.log(`clicked on month: ${month}`);
        // let monthNumber = months[month];
        // console.log(`clicked button: ${month} | ${monthNumber}`);
        

        fetch(`/api/events?month=${month}`)
            .then((res) => res.json())
            .then(events => setEvents(events))
            .then(navigate(`/events`))
    } 
    
    const EventMonthFilter = eventMonthOptions.map((month) => {
        return <button className='months' value={month} onClick={handleButtonClick}>{month}</button>
    })

    console.log(`In EventsContainer: currentUser?.admin: ${currentUser?.admin} | currentUser?.user?.admin: ${currentUser?.user?.admin}`)

    return(
        <div>
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
            <div className='admin-events-container'>
                <h1>Events</h1>
                <h2>{EventMonthFilter}</h2>
                <button className='add-new-event-modal-btn' type='button' onClick={() => setAddEventIsOpen(true)}>Add New Event</button>
                <SubmitNewEventModal events={events} setEvents={setEvents} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen} handleAddNewEvent={handleAddNewEvent}/>
                {EventList}
                <Link to='/'>Back Home</Link>
            </div> 
            ) : (
            <div className='events-container'>
                <h1>Events</h1>
                <h2>{EventMonthFilter}</h2>
                {EventList}
                <Link to='/'>Back Home</Link>
            </div>
            )}
        </div>
    )
}

export default EventsContainer;