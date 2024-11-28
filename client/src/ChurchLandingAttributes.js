import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'

import ChurchLanding from './ChurchLanding/ChurchLanding';
import EventsContainer from './Events/EventsContainer';
import GivingModal from './GivingModal';
import EventInfoPage from './EventInfoPage';

function ChurchLandingAttributes({ events, setEvents, showEvents, setShowEvents, givingIsOpen, setGivingIsOpen, currentUser}) {

    if ((currentUser?.admin === true || currentUser?.user?.admin === true)) {
        // console.log("Admin logged in!");
    }
    else if ((currentUser?.admin === false || currentUser?.user?.admin === false)) {
        // console.log("Regular user logged in!")
    }
    else {
        // console.log("User not logged in!");
      }
    return(
        <div>
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                <div> 
                    <form>
                        <Routes>
                            <Route path='/' element={<ChurchLanding currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>
                            <Route path='/events' element={<EventsContainer events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                            <Route path='/events/:id' element={<EventInfoPage events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                        </Routes>
                    </form>
                </div> 
                    
                   ) : (

                <div>
                    <form>
                        <Routes>
                            <Route path='/' element={<ChurchLanding currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>}/>
                            <Route path='/events' element={<EventsContainer events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                            <Route path='/events/:id' element={<EventInfoPage events={events} setEvents={setEvents} showEvents={showEvents} setShowEvents={setShowEvents}/>}/>
                        </Routes>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ChurchLandingAttributes