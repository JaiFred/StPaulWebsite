//Hooks
import { Link, useNavigate } from "react-router-dom";

//Components
import Navbar from "../Navbar";
import EventCard from './EventCard';
import SubmitNewEventModal from "../SubmitNewEventModal";
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";

//CSS
import './EventsContainer.scss'
import { EventsFilter } from "./EventsFilter";


// Goal:
// Get the Add new event to work properly
// clean up Event info page

// Child Component of App.js

function EventsContainer({ currentUser, events, setEvents, handleAddNewEvent, handleEditEvent, handleDeleteEvent, addEventIsOpen, setAddEventIsOpen }){
    // debugger;
    const EventList = events.map((event) => <div class="col-12 col-md-6 col-lg-4 col-xl-3">
        <EventCard key={event.id} event={event} events={events} setEvents={setEvents} currentUser={currentUser} handleEditEvent={handleEditEvent} handleDeleteEvent={handleDeleteEvent}/>
        </div>
    )

   

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

  

      // let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

      
     
      
  

    
    
  

    console.log(`In EventsContainer: currentUser?.admin: ${currentUser?.admin} | currentUser?.user?.admin: ${currentUser?.user?.admin}`)

    return(
        <div className="events-container">
                <div className="container">
                    <div class="row">
                        <div className="col-12 col-md-6">
                            <h1>Events</h1>
                            <h2>Upcoming Event</h2>
                        </div>
                        <div className="col-12 col-md-6">
                        <h2>Church Hours</h2>
                        <p>Sunday School services:<br/>
                        <strong>9:30 AM.</strong>
                        </p>
                        <p>Sunday Morning services:<br/>
                        <strong>11:00 AM.</strong></p>
                        <p>Bible Study is every <strong>second</strong> and <strong>third Wednesday</strong>  of each month at <strong>7:00 PM.</strong></p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="events-content">
                        <EventsFilter setEvents={setEvents}/>
                    
                        <div className={'events-content-scroll'}>
                                <div className="row">{EventList}</div>
                        </div>

                        {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (<div className="events-actions">
                            <button className='events-actions-button' type='button' onClick={() => setAddEventIsOpen(true)}>Add New Event</button>
                            <SubmitNewEventModal events={events} setEvents={setEvents} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen} handleAddNewEvent={handleAddNewEvent}/>
                        </div>
                        ) : ''}
                    </div>
                <BackHomeButton/>
                </div>
            </div> 
    )
}

export default EventsContainer;