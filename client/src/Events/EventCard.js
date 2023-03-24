//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';

//Components
import { EventCardControls } from "../EventCardControls";

import './EventCard.scss'


// Goal:
// Have each event display with only the day number, month and year on the EventCard page 
// Have each event display with the day, day number, month, year and time on the EventInfoPage
// Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month 


function EventCard({event, currentUser, handleDeleteEvent, handleEditEvent}){
    
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

    const imgSrc = image || "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
    
    return <div className="event-card">
        <div className="event-card-outer">
            <div className="event-card-inner">
                <Link to={`/events/${event.id}`} className="event-card-link"></Link>
                
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

                    <div className="event-card-infos">
                        <div className="event-card-infos-image" style={{backgroundImage: `url(${imgSrc})`}}></div>
                        <div className="event-card-infos-inner__wrapper">
                            <div className="event-card-infos-inner">
                                <h2 className="event-card-title">{title}</h2>
                                <p className="event-card-date">{starts_short}&#160;&#160; - &#160;&#160;{ends_short}</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
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