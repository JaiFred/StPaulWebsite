//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'

// CSS
import PastorBrown from "./images/Pastor.webp"
import PastorBullock from "./images/Pastorpic.JPG"
// Child Component of App.js

function AboutPage(){

    return(
        <div className='About-page-background'>
            <h3 className='about:'>About:</h3>
            <h1 className='about-page-title'>St Paul Baptist Church</h1>
            <div className="welcome-container">
            <h1 className='welcome'>Welcome</h1>
            <p>
                The Pastor Rev. Brown and Assistant Pastor Rev Kim Bullock welcome you to St. Paul Baptist Church. We invite you to come and share in worship with us in the scripture of 1 Peter 2:9 "A people of praise and service".
            </p>
            <p>Welcome, Welcome, Welcome!</p>
            </div>
            <div className="pastor-info-container">
                <ul className="pastor-pictures">
                    <li>
                        <h1>Rev. Robert D. Brown with Pastor Kim Bullock</h1>
                        <img className="pastor-brown" src={PastorBrown}></img>
                    </li>
                    
                    <li>
                        <h1>Pastor Kim Bullock</h1>
                        <img className="pastor-bullock" src={PastorBullock}></img>
                    </li>
                </ul>
            
            <div>
                <Link to='/' className="main">back to home</Link>
            </div>
            

            </div>
        </div>
    )
}

export default AboutPage