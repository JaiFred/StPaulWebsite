import React, { useState, useEffect } from "react";
import EventInfoDetails from "./EventInfoDetails";

function EventInfoPage ({ events, setEvents, showEvents, setShowEvents }){

    useEffect(() => {
        fetch(`/api/event/${id}`)
          .then((r) => r.json())
          .then(events => setShowEvents(events))
      },[])

    //  const EventDetails = showEvents.map((event) =>(
    //     <EventInfoDetails key={event.id} event={event}/>

    // ))

    const { id, title, starts, ends} = events

console.log(id)
    return (
        <div>
            {/* <h2>{title}</h2>               
            <h2>{starts}</h2> */}
            {/* {EventDetails} */}
            hello
        </div>
    )

}

export default EventInfoPage