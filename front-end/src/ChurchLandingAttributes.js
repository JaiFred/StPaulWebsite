import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

import ChurchLanding from './ChurchLanding';
import EventsContainer from './EventsContainer';
import GivingModal from './GivingModal';
import EventInfoPage from './EventInfoPage';

function ChurchLandingAttributes({ events, setEvents, showEvents, setShowEvents, givingIsOpen, setGivingIsOpen, currentUser}) {

    if (currentUser) {
        console.log("Admin logged in!");
    }
      else {
        console.log("Admin not logged in!");
      }
    return(
        <div>
            {currentUser ? (
                <div> 
                    ADMIN STUFF
                </div> 
                    
                   ) : (

                <div>
                    <form>
                        <Routes>
                            <Route path='/' element={<ChurchLanding givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>
                            <Route path='/events' element={<EventsContainer events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                            <Route path='/events/:id/more_information' element={<EventInfoPage events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                        </Routes>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChurchLandingAttributes