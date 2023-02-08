//Hooks
import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"
import mapboxgl from 'mapbox-gl'
import Map, { Marker, NavigationControl, GeolocateControl, Directions } from 'react-map-gl';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

//Components
import Church from "./images/StPaulBaptistChurch.JPG"

// CSS
import 'mapbox-gl/dist/mapbox-gl.css';
import './ContactUsPage.scss';
import { BackHomeButtonBordered } from "./BackHomeButton/BackHomeButtonBordered";

function ContactUsPage(){

    const navigate = useNavigate();

    //Email sender 
    const sendEmail = (e) => {
        e.preventDefault();
        alert("Message Submitted! Thank you!")

        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_KEY, process.env.REACT_APP_EMAILJS_CONTACT_US_TEMPLATE_KEY, e.target, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        navigate(`/contact_us_success`)
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
                                <input 
                                    type="text" 
                                    name="sender-name" 
                                    id="sender-name" 
                                    required
                                    placeholder="Your Name" 
                                    className="sender-name">
                                </input>
                                
                                {/* */}
                                <label htmlFor="email-from">Your Email:</label>
                                <input 
                                    type="text" 
                                    name="email-from" 
                                    id="email-from" 
                                    required
                                    placeholder="Your Email" 
                                    className="email-form">
                                </input>

                                {/* */}
                                <label htmlFor="message">Message:</label>
                                <textarea 
                                    name="message" 
                                    id="message" 
                                    placeholder="Leave your message here --" 
                                    className="message-box" 
                                    rows="10">
                                </textarea>
                                <div className="text-center">
                                    <button 
                                        type="submit" 
                                        className="submit-button button-custom">
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="map-wrapper">
                            <div className="map-container">
                                <Map
                                    mapboxAccessToken = {process.env.REACT_APP_MAPBOX_TOKEN}
                                    style={{
                                        width: "100%",
                                        aspectRatio: "1/1",
                                        borderRadius: "15px",
                                        border: "2px solid white",
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
                                    <div>
                                        <p>
                                            1995 Globe Road <br />
                                            Aylett, VA 23009
                                        </p>
                                        <p>
                                            Tel: 804-769-4430 <br />
                                            Fax: 804-769-4430 <br />
                                            email: stpaul23009@gmail.com
                                        </p>
                                    </div>
                                    <a className="directions" href="https://www.google.com/maps/dir//1995+Globe+Rd,+Aylett,+VA+23009/@37.8135257,-77.2050461,915m/data=!3m1!1e3!4m8!4m7!1m0!1m5!1m1!1s0x89b128245469bbb9:0x54383625ecd83599!2m2!1d-77.2028574!2d37.8135215" target='_blank'>
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