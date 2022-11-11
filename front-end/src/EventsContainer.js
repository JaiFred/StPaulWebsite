import { Link, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import EventCard from './EventCard';
import EventInfoPage from "./EventInfoPage";
import SubmitNewEventModal from "./SubmitNewEventModal";


// Goal:
// Get the Add new event to work properly
// clean up Event info page

// Child Component of App.js

function EventsContainer({ currentUser, events, setEvents, eventMonths, handleAddNewEvent, handleEditEvent, handleDeleteEvent, addEventIsOpen, setAddEventIsOpen }){
    // debugger;
    const EventList = events.map((event) =>( 
        <EventCard key={event.id} event={event} events={events} setEvents={setEvents} currentUser={currentUser} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent}/>    
    ))

    const navigate = useNavigate()

    const months = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12",
    }

    function handleButtonClick(e) {
        e.preventDefault()
        let month = e.target.value;
        let monthNumber = months[month];
        console.log(`clicked button: ${month} | ${monthNumber}`);
        

        fetch(`/api/events?month=${monthNumber}`)
            .then((res) => res.json())
            .then(events => setEvents(events))
            .then(navigate(`/events`))
    } 
    
    const EventMonthFilter = eventMonths.map((month) => {
        return <button className='months' value={month} onClick={handleButtonClick}>{month}</button>
    })


    return(
        <div>
            {currentUser ? (
            <div className='admin-events-container'>
                <h1>Events</h1>
                <h2>{EventMonthFilter}</h2>
                {EventList}
                <button className='add-new-event-modal-btn' type='button' onClick={() => setAddEventIsOpen(true)}>Add New Event</button>
                <SubmitNewEventModal events={events} setEvents={setEvents} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen} handleAddNewEvent={handleAddNewEvent}/>
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