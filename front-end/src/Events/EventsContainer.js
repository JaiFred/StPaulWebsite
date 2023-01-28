//Hooks

//Components
import EventCard from './EventCard';
import { BackHomeButton } from "../BackHomeButton/BackHomeButton";
import ChurchHours from "../components/ChurchHours";
import EventAddEditModal from "../EventAddEditModal"

//CSS
import './EventsContainer.scss'
import { EventsFilter } from "./EventsFilter";

// Goal:
// Get the Add new event to work properly
// clean up Event info page

// Child Component of App.js

function EventsContainer({
    currentUser,
    events,
    setEvents,
    
    handleAddNewEvent,
    handleEditEvent,
    handleDeleteEvent,
    
    addEventIsOpen,
    setAddEventIsOpen
}){
    // debugger;
    const EventList = events.map((event) => (
        <div class="col-12 col-md-6 col-lg-4 col-xl-3">
            <EventCard
                key={event.id}
                event={event}
                currentUser={currentUser}
                handleEditEvent={handleEditEvent}
                handleDeleteEvent={handleDeleteEvent}/>
        </div>
    ))

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
    console.log({addEventIsOpen})

    return(
        <div className="events-container">
            <div className="container">
                <ChurchHours />
                <div className="row upcoming-event">
                    <div className="col text-center">
                        <h2 className="bolder">Upcoming Event</h2>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="events-content">
                    <EventsFilter setEvents={setEvents}/>
                
                    <div className="events-content-scroll-wrapper">
                        <div className="events-content-scroll">
                            <div className="row">{EventList}</div>
                        </div>
                    </div>

                    {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                        <div className="events-actions">
                            <button
                                className='events-actions-button'
                                type='button'
                                onClick={() => setAddEventIsOpen(true)}>
                                Add New Event
                            </button>
                            {addEventIsOpen && (
                                <EventAddEditModal 
                                    addEditEventIsOpen={true}
                                    setAddEditEventIsOpen={setAddEventIsOpen}
                                    handleAddEditEvent={handleAddNewEvent}
                                />
                            )}
                            {/*<SubmitNewEventModal
                                events={events}
                                setEvents={setEvents}
                                addEventIsOpen={addEventIsOpen}
                                setAddEventIsOpen={setAddEventIsOpen}
                                handleAddNewEvent={handleAddNewEvent} />*/}
                        </div>
                    ) : ''}
                </div>
                <BackHomeButton/>
            </div>
        </div> 
    )
}

export default EventsContainer;