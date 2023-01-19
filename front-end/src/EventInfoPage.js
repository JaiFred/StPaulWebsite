import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ChurchHours from "./components/ChurchHours";

import './EventInfoPage.scss';

// Goal:
// Have each event display with only the day number, month and year on the EventCard page 
// Have each event display with the day, day number, month, year and time on the EventInfoPage that will show more information
// Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month

function EventInfoPage({ currentUser }){

    // t.string "title"
    // t.datetime "starts"
    // t.datetime "ends"
    // t.string "details"
    // t.string "address_line_1"
    // t.string "address_line_2"
    // t.string "city"
    // t.string "state_province_region"
    // t.string "zip_postalcode"
    // t.string "country"

    let { id } = useParams();

    // console.log(`event id: ${id}`);

    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`/api/events/${id}`)
            .then((res) => res.json())
            .then((event) => setEvent(event));
    }, []);


    //  const EventDetails = showEvents.map((event) =>(
    //     <EventInfoDetails key={event.id} event={event}/>

    // ))

    //const { id, title, starts, ends } = event;
    console.log({event})

    if (!event) return null;

    const BackButton = () => (
        <div className="col-12 col-md-4 d-flex justify-content-center align-items-center">
            <Link to='/events' className="main button-custom">Back</Link>
        </div>
    )

    return (
        <div className="info-page">
            <ChurchHours className="justify-content-end my-5 text-center" after={<BackButton />} />
            
            <div className="row info-page__content mb-5">
                <div className="col-12 col-lg-6 info-page__image-wrapper">
                    <div className="info-page__image" style={{ backgroundImage: `url(${event.image})` }}></div>
                </div>
                <div className="info-page-container col-12 col-lg-6 ">
                    <h1>{event.title}</h1>
                    
                    {/* Time */}
                    <h3>Time:</h3>
                    <p>{event.starts} - {event.ends}</p>
                    
                    {/* Details */}
                    <h3>Details:</h3>
                    <p>{event.details}</p>
                    
                    {/* Where */}
                    <h3>Where:</h3>
                    <ul>
                        {[
                            ['address_line_1','address_line_2'],
                            ['city','state_province_region','zip_postalcode'],
                            ['country']
                        ].map(group => (
                            <li>{group.map(prop => event[prop]).join(' ')}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EventInfoPage