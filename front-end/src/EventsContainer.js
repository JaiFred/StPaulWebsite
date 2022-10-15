import React, {useEffect, useState} from "react";
import EventCard from './EventCard';

function EventsContainer() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/events")
          .then((r) => r.json())
          .then(events => {
            setEvents(events)
          })
      }, [])

      console.log(`events: ${events}`);

    return(
        <div>
            {/* <Navbar /> */}
            <h1>Events</h1>
            { events.map((event) => {
                return <EventCard title={event.title} starts={event.starts} />;
            })}
        </div>
    )
}

export default EventsContainer;