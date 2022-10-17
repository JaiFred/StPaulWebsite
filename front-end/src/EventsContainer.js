import React, {useEffect, useState} from "react";

import Navbar from "./Navbar";
import EventCard from './EventCard';

function EventsContainer({ events, setEvents, showEvents, setShowEvents }){

    const EventList = showEvents.map((event) => (
        <EventCard key={event.id} event={event}/>
    ))


      console.log(`events: ${events}`);

    return(
        <div>
            {EventList}
            <Navbar />
            <h1>Events</h1>
           
        </div>
    )
}

export default EventsContainer;