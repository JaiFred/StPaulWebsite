//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';

//Components
import EventInfoPage from "./EventInfoPage";
import EventEditModal from "./EventEditModal";
import EventDeleteConfirmationModal from "./EventDeleteConfirmationModal";
import { EventCardControls } from "./EventCardControls";


// Goal:
// Have each event display with only the day number, month and year on the EventCard page 
// Have each event display with the day, day number, month, year and time on the EventInfoPage
// Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month 


function EventCard({event, events, setEvents, currentUser, handleDeleteEvent, handleEditEvent}){
    
    const [ deleteIsOpen , setDeleteIsOpen ] = useState(false);
    const [ editEventIsOpen , setEditEventIsOpen ] = useState(false);

    //edit

    const { id, title, starts_short, ends_short, details, location, image, starts_raw } = event;

    // console.log(event);


    const navigate = useNavigate()

    function handleDeleteClick(e) {
        e.preventDefault()
        const reqObj = {
            method: "DELETE"
        }
        fetch(`/api/events/${id}`, reqObj )
        .then((res) => res.json())
        .then(handleDeleteEvent(id))
    }
    
    return (
        <div>
            <div>
                <button className="event-card">
                    <div>
                        
                        <h2>{title}</h2>
                        {
                            image ? 
                            <img src={image} width="500" height="600">
                                {/* <h2>starts: {starts_short} - ends: {ends_short}</h2>
                                <Routes>
                                    <Route path="/events/:id" element={<EventInfoPage currentUser={currentUser} event={event} events={events} setEvents={setEvents} />}/>
                                </Routes>
                                <Link to={`/events/${event.id}`}>Click on this link for More Info</Link> */}
                            </img>: 
                            
                            
                            <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" width="500" height="600">
                                {/* <h2>starts: {starts_short} - ends: {ends_short}</h2>
                                <Routes>
                                    <Route path="/events/:id" element={<EventInfoPage currentUser={currentUser} event={event} events={events} setEvents={setEvents} />}/>
                                </Routes>
                                <Link to={`/events/${event.id}`}>Click on this link for More Info</Link> */}
                            </img>
                        }
                        <h2>starts: {starts_short} - ends: {ends_short}</h2>
                        <Routes>
                            <Route path="/events/:id" element={<EventInfoPage currentUser={currentUser} event={event} events={events} setEvents={setEvents} />}/>
                        </Routes>
                        <Link to={`/events/${event.id}`}>Click on this link for More Info</Link>
                        <EventCardControls 
                            currentUser={currentUser}
                            event={event} 
                            deleteIsOpen={deleteIsOpen} 
                            setDeleteIsOpen={setDeleteIsOpen} 
                            handleDeleteClick={handleDeleteClick} 
                            editEventIsOpen={editEventIsOpen} 
                            setEditEventIsOpen={setEditEventIsOpen} 
                            handleEditEvent={handleEditEvent} 
                        />
                    </div>
                </button>
            </div>
        </div> 
    )
}

export default EventCard; 







//  <div> 
//                         <Link to={`/events/${event.id}`}>
//                         <button className="event-card">
//                             <div>
//                                 <h2>{title}</h2>   
//                                 {
//                                     image ? <img src={image} width="500" height="600"></img> : <img src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" width="500" height="600"></img>
//                                 }            
//                                 <h2>starts: {starts_short} - ends: {ends_short}</h2>
//                                 <Routes>
//                                     <Route path="/events/:id" element={<EventInfoPage currentUser={currentUser} event={event} events={events} setEvents={setEvents}/>}/>
//                                 </Routes>
//                                <label htmlFor="more-info">Click for More Info</label>
//                             </div>
//                         </button>
//                         </Link>
//                     </div>
//                 )}