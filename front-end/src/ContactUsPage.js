//Hooks
import React from "react";
import { useState, useEffect, useRef } from 'react';
import emailjs from "@emailjs/browser"
import mapboxgl from 'mapbox-gl'
import Map, { Marker, NavigationControl, GeolocateControl, Directions } from 'react-map-gl';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

import Church from "./images/StPaulBaptistChurch.JPG"

// CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import './ContactUsPage.scss';
import { BackHomeButtonBordered } from "./BackHomeButton/BackHomeButtonBordered";

function ContactUsPage(){

    //Email sender 
    const sendEmail = (e) => {
        e.preventDefault();
        alert("submitted")

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_KEY, process.env.REACT_APP_EMAILJS_CONTACT_US_TEMPLATE_KEY, e.target, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
    }

    //States for map to generate with
    const [ lng, setLng ] = useState(-77.20214)
    const [ lat, setLat ] = useState(37.81354)
    const [ zoom, setZoom ] = useState(17)
    //map


    return(
        <ParallaxBanner style={{ aspectRatio: 'auto' }}>
            <ParallaxBannerLayer image={Church} speed={-30} className="contact-us-page-background-container" />
                <ParallaxBannerLayer className={'contact-us-page-background'}>
                    <div className="contact-us-overlay">
                        {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com'>Contact Us</a></button> */}
                        <div className="mail-page-container">
                            <form className="contact-form form-default" onSubmit={sendEmail}>
                                <h1 className="page-title">Contact Us</h1>

                                {/* */}
                                <label htmlFor="sender-name">Your Name:</label>
                                <input type="text" name="sender-name" id="sender-name" placeholder="Your Name" className="sender-name"></input>
                                
                                {/* */}
                                <label htmlFor="email-from">Your Email:</label>
                                <input type="text" name="email-from" id="email-from" placeholder="Your Email" className="email-form"></input>
                                
                                {/* */}
                                <label htmlFor="message">Message:</label>
                                <textarea name="message" id="message" placeholder='type here --' className="message-box" rows="10"></textarea>

                                <div className="text-center">
                                    <button type="submit" className="submit-button button-custom">Send</button>
                                </div>
                            </form>
                        </div>

                        <div className="map-wrapper">
                            <div className="map-container">
                                <Map
                                    mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
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
                                
                                <div className="map-details">
                                    <p>
                                        1995 Globe Road <br />
                                        Aylett, VA 23009
                                    </p>
                                    <p>
                                        Tel: 804-769-4430 <br />
                                        Fax: 804-769-4430 <br />
                                        email: stpaul23009@gmail.com
                                    </p>
                                    <a className="directions" href="https://www.google.com/maps/place/1995+Globe+Rd,+Aylett,+VA+23009/@37.8135257,-77.2050461,17z/data=!3m1!4b1!4m5!3m4!1s0x89b128245469bbb9:0x54383625ecd83599!8m2!3d37.8135215!4d-77.2028574" target='_blank'>
                                        <p className="directions-button-title">
                                        Directions
                                        </p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="button-wrapper">
                            <BackHomeButtonBordered className="back-home-from-contact-us" />
                        </div>
                    </div>

            </ParallaxBannerLayer>
        </ParallaxBanner>
    )
}

export default ContactUsPage