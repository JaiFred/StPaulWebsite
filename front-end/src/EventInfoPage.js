import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


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

    return (
        <div>
            <h1>Church Hours</h1>
            <p>Sunday School services:</p>
            <p>9:30 AM.</p>
            <p>Sunday Morning services:</p>
            <p>11:00 AM.</p>
            <p>Bible Study is every second and third Wednesday of each month at 7:00 PM.</p>

            <h1>{event?.title}</h1>
            <div className="detailed-start-info">
                <h3>Time</h3>
                <h3>{event?.starts} - {event?.ends}</h3>
            </div>
            <div>
                <h2>Details:</h2>
                <h3>{event?.details}</h3>
            </div>
            <div>
                <h2>Where:</h2>
                <h3>{event?.address_line_1}</h3>
                <h3>{event?.address_line_2}</h3>
                <h3>{event?.city}</h3>
                <h3>{event?.state_province_region}</h3>
                <h3>{event?.zip_postalcode}</h3>
                <h3>{event?.country}</h3>
            </div>
            <div>
                
            </div>
            <div className="back-to-bulletin-page">
                <Link to='/events' className="main">Back</Link>
            </div>


            
        </div>
    )

}

export default EventInfoPage