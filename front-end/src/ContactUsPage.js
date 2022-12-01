//Hooks
import React from "react";
import { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser"
import mapboxgl from 'mapbox-gl'
import Map, { Marker, NavigationControl, GeolocateControl, Directions } from 'react-map-gl';

// CSS
import 'mapbox-gl/dist/mapbox-gl.css';

function ContactUsPage(){

    //Email sender 
    const sendEmail = (e) => {
        e.preventDefault();
        alert("submitted")

        emailjs.sendForm('REACT_EMAILJS_SERVICE_KEY','REACT_EMAILJS_CONTACT_US_TEMPLATE_KEY', e.target, 'REACT_EMAILJS_PUBLIC_KEY')
    }

    //States for map to generate with
    const [ lng, setLng ] = useState(-77.20214)
    const [ lat, setLat ] = useState(37.81354)
    const [ zoom, setZoom ] = useState(17)
    //map


    return(
        <div className="contact-us-overlay">
            {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com'>Contact Us</a></button> */}
            <div className="mail-page-container">
                <h1 className="page-title">Contact Us</h1>
                <form className="contact-form" onSubmit={sendEmail}>
                    <label htmlFor="sender-name">Your Name:</label>
                    <input type="text" name="sender-name" id="sender-name" className="sender-name"></input>
                    <label htmlFor="email-from">Your Email:</label>
                    <input type="text" name="email-from" id="email-from" className="email-form"></input>
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message" className="message-box"></textarea>
                    <button type="submit" className="submit-button">send</button>
                </form>
            </div>
            <div>
                <p1>
                    1995 Globe Road
                    Aylett, VA 23009
                    
                </p1>
            </div>
            <div>
                <p1>
                    Tel: 804-769-4430
                    Fax: 804-769-4430
                    email: stpaul23009@gmail.com
                </p1> 
            </div>
            <Map
             mapboxAccessToken='REACT_MAPBOX_TOKEN' 
            style={{
                width: "500px",
                height: "500px",
                borderRadius: "15px",
                border: "2px solid red",
                center: [12.550343, 55.665957],
            }}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: zoom
            }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
            MapboxDirections={
                "https://api.mapbox.com/directions/v5/"}

            >
                <Marker
                longitude={lng}
                latitude={lat}
                />
                <NavigationControl
                position="bottom-right"
                />
                <GeolocateControl/>
                
            </Map>
            <div>
                <a href="https://www.google.com/maps/place/1995+Globe+Rd,+Aylett,+VA+23009/@37.8135257,-77.2050461,17z/data=!3m1!4b1!4m5!3m4!1s0x89b128245469bbb9:0x54383625ecd83599!8m2!3d37.8135215!4d-77.2028574">Directions</a>
            </div>
            
            
        </div>
    )
}

export default ContactUsPage