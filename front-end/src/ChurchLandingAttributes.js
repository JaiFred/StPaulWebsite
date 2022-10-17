import react, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom'

import ChurchLanding from './ChurchLanding';
import EventsContainer from './EventsContainer';

function ChurchLandingAttributes(){

    const [events, setEvents] = useState([]);
    const [showEvents, setShowEvents] = useState([]);

    useEffect(() => {
        fetch(`/events`)
          .then((r) => r.json())
          .then(events => setShowEvents(events))
      }, [])

    return(
        <form>
            <Routes>
                <Route path='/' element={<ChurchLanding/>}/>
                <Route path='/events' element={<EventsContainer events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
            </Routes>
        </form>
    )
}

export default ChurchLandingAttributes