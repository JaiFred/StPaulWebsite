import { Link } from "react-router-dom";

import NavBar from "./NavBar";
import EventCard from './EventCard';
import EventInfoPage from "./EventInfoPage";

function EventsContainer({ events, setEvents, showEvents, setShowEvents }){

    const EventList = showEvents.map((event) =>(
        <EventCard key={event.id} event={event}/>
        // <EventInfoPage key={event.id} event={event}/>

    ))


    

    return(
        <div>
            <h1>Events</h1>
            {EventList}
            <Link to='/'>back</Link>

        </div>
    )
}

export default EventsContainer;