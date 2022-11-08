import { Link, useNavigate } from "react-router-dom";

import NavBar from "./NavBar";
import EventCard from './EventCard';
import EventInfoPage from "./EventInfoPage";


// Goal:
// Have each event display with only the day number, month and year on the EventCard page 
// Have each event display with the day, day number, month, year and time on the EventInfoPage
// Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month √

function EventsContainer({ currentUser, events, setEvents, showEvents, setShowEvents, eventMonths, handleEditEvent, handleDeleteEvent }){
    // debugger;
    const EventList = events.map((event) =>( 
        <EventCard key={event.id} event={event} currentUser={currentUser} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent}/>
        // <EventInfoPage key={event.id} event={event}/>        
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
            <h1>Events</h1>
            <h2>{EventMonthFilter}</h2>
            {EventList}
            <Link to='/'>back</Link>
        </div>
    )
}

export default EventsContainer;