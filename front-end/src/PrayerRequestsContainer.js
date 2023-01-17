//Hooks
import React from "react";
import emailjs from "@emailjs/browser"

//Components
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

//CSS
import prayerRequestBackground from "./images/Prayer-request-background.mp4"


function PrayerRequestsContainer(){
        const sendEmail = (e) => {
            e.preventDefault();
            alert("submitted")
    
            emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_KEY, process.env.REACT_APP_EMAILJS_PRAYER_REQUEST_TEMPLATE_KEY, e.target, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
        }


    return(
        <div>
            <h1>God's word has much to say on Prayer, and God's Desire to grant us our requests</h1>
            <p>Matthew 18:19 : "Again I say unto you, that if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in Heaven."</p>
            <p> 1 John 5:14-15: "And this is the confidence ( the assurance, the privilege of boldness) which we have in Him: (we are sure) that if we ask anything according to His will, He listens to and hears us.  And if we know that we have the requests made of him.</p>

            <form className="prayer-request"  onSubmit={sendEmail}>
        <h1>
            Prayer Request Page 
        </h1>
        <video muted loop autoPlay playsInline src={prayerRequestBackground}></video>


        <label htmlFor="who-input">Who needs Prayer?</label>
        <input
            className="who-input"
            type="text"
            id="who"
            name="who-input"
            // value=
            placeholder="Type name... "
        />
        <label htmlFor="what-input">What is their relationship to you?</label>
        <input
            className="what-input"
            type="text"
            id="what"
            name="what-input"
            // value=
            placeholder="(optional: friend, mom, dad, spouse, me, etc...) or leave blank if request is for you..."
        />
        <h2>Prayer Details</h2>
        <textarea
            className='prayer-details-input'
            type='text'
            id='prayer-details-input'
            name='prayer-details-input'
            rows='5'
            cols='30'
            // value=
            placeholder='type here --'
        />
        <h2>Name and Date</h2>
        <ul className="name-date-list">
            <li className="name-cell">
                <input
                className='name'
                type='text'
                id='name'
                name='name-cell'
                // value=
                placeholder='name'
                />
            </li>
            <li className="date-cell">
                <input
                className='date'
                type='datetime-local'
                id='date'
                name='date-cell'
                // value=
                placeholder='date'
                />
            </li>
        </ul>
        
            <fieldset>
                <legend>Would you like us to pray for your intention during the morning announcments?</legend>
               
                <div>
                    <p1 htmlFor='decision1'>Yes</p1>
                    <input type='radio' id='Yes' name="drone1" value='Yes' checked/> 
                </div>
                <div>
                    <p1 htmlFor='decision1'>No</p1>
                    <input type='radio' id='No' name="drone1" value='No'/>
                </div>
            </fieldset>
            <fieldset>
                <legend>Is it OK to post your request in Church?</legend>
                <div>
                    <p1 htmlFor='decision2'>Yes</p1>
                    <input type='radio' id='Yes' name="drone2" value='Yes' checked/>
                </div>
                <div>
                    <p1 htmlFor='decision2'>No</p1>
                    <input type='radio' id='No' name="drone2" value='No'/>
                </div>
            </fieldset>
            <label htmlFor="email-from">Your Email:</label>
            <input type="text" name="email-from" id="email-from" className="email-form"></input>
            <button type="submit" className="submit-button">send</button>
        </form>
            <BackHomeButton/>
        </div>
    )
}

export default PrayerRequestsContainer