//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';

//Components
import { BackHomeButton } from './BackHomeButton/BackHomeButton'

// CSS
import './AboutPage.scss'
import PastorBrown from "./images/Pastor.webp"
import PastorBullock from "./images/Pastorpic.JPG"
import Church from "./images/StPaulBaptistChurch.JPG"

// Child Component of App.js

function AboutPage(){
    console.log({PastorBrown})
    return(
        <ParallaxBanner style={{ aspectRatio: 'auto' }}>
            <ParallaxBannerLayer image={Church} speed={-30} />
                <ParallaxBannerLayer className={'about-page-background'} >
                    <div className='about-page text-center'>
                        <h3 className='about'>About</h3>
                        <h1 className='about-page-title'>St Paul Baptist Church</h1>
                        <div className="welcome-container">
                        <h2 className='welcome'>Welcome</h2>
                        <p className='welcome-message'>
                            The Pastor Rev. Brown and Assistant Pastor Rev Kim Bullock welcome you to St. Paul Baptist Church. We invite you to come and share in worship with us in the scripture of 1 Peter 2:9 "A people of praise and service".
                        </p>
                        <p>Welcome, Welcome, Welcome!</p>
                        </div>
                        
                        {/* Pastors */}
                        <div className="pastor-info-container">
                            <ul className="pastor-pictures">
                                <li>
                                    <div className="pastor-picture pastor-brown" style={{ backgroundImage: `url(${PastorBrown})` }}></div>
                                    <h5>Rev. Robert D. Brown<br /> with<br /> Pastor Kim Bullock</h5>
                                </li>
                                <li>
                                    <div className="pastor-picture pastor-bullock" style={{ backgroundImage: `url(${PastorBullock})` }}></div>
                                    <h5>Pastor Kim Bullock</h5>
                                </li>
                            </ul>
                        </div>

                        <h2 className='our-mission-title'>Our Mission</h2>
                        <p className='our-mission-message'>We believe that the door to salvation is always open and so are the doors to our church. Our mission is to be fully devoted to Jesus by opening our arms to those in search of the truth. We show God’s love and concern for our fellow man at every opportunity. Through works of charity and opening our doors to listen and love, we feel that we are walking in the footsteps of Jesus Christ.</p>
                        <h2 className='prayer-request-title'>Prayer Request</h2>
                        <p className='prayer-request-message'>
                            We believe that the door to salvation is always open and so are the doors to our church. Our mission is to be fully devoted to Jesus by opening our arms to those in search of the truth. We show God’s love and concern for our fellow man at every opportunity. Through works of charity and opening our doors to listen and love, we feel that we are walking in the footsteps of Jesus Christ.
                        </p>
                        <div className="prayer-request">
                        <Link to='/prayer_requests' className="prayer-request-button">
                            Click here if you'd like to submit a prayer request
                        </Link>
                        </div>
                        
                        <BackHomeButton className="mb-0"/>
                    </div>
            </ParallaxBannerLayer>
        </ParallaxBanner>
    )
}

export default AboutPage