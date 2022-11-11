//Hooks
import React, { useState, useEffect } from "react";

//Need to make Event submit page accept specific adress information
// 

function SubmitEvent({ handleAddNewEvent }){

    // t.string :title
    // t.datetime :starts
    // t.datetime :ends
    // t.string :details
    // t.string :location

    const [ title, setTitle ] = useState("")
    const [ starts, setStarts ] = useState("")
    const [ ends, setEnds ] = useState("")
    const [ details, setDetails ] = useState("")
    const [ location, setLocation ] = useState("")

    function handleSubmit(e){
        console.log("submitted")
        e.preventDefault();
        fetch("api/events", {
            method: "POST",
            headers: {
                "content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: title,
                starts: starts,
                ends: ends,
                details: details,
                location: location
            })
        })
        .then((res) => res.json())
        .then((newEvent) => handleAddNewEvent(newEvent));
        console.log();
    }


    return(
        <div>
            <h1>Submit New Event</h1>
            <ul>
                <input 
                type='text'
                className='title-input'
                id='title'
                placeholder='title' 
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                type='datetime-local'
                className='starts-input'
                id='starts'
                onChange={(e) => setStarts(e.target.value)}
                />
                <input
                type='datetime-local'
                className='ends-input'
                id='ends'
                onChange={(e) => setEnds(e.target.value)}
                />
                <input
                type='text'
                className='details-input'
                id='details'
                placeholder='details'
                onChange={(e) => setDetails(e.target.value)}
                />
                <input
                type='text'
                className='location-input'
                id='location'
                placeholder='street address'
                onChange={(e) => setDetails(e.target.value)}
                />
                {/* I want a new location input for the apt/suite etc.(optional) */}
                <input
                type='text'
                className='location-input'
                id='location'
                placeholder='apt'
                onChange={(e) => setLocation(e.target.value)}
                />
                {/* I want a city dropdown*/}
                {/* I want a country dropdown - other dropdowns such as "state" must be reactive */}
                {/* I want a state dropdown - this disappears if the country is not the United States*/}
                {/* ZIP/Postal code*/}
                
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Submit</button>
        </div>
    )
}

export default SubmitEvent