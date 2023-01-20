//Hooks
import React from "react";
import emailjs from "@emailjs/browser"

//Components
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

//CSS
import prayerRequestBackground from "./images/Prayer-request-background.mp4"
import './PrayerRequests.scss';

function PrayerRequestsContainer(){

    const sendEmail = (e) => {
        e.preventDefault();
        alert("submitted")
    
        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_KEY,
            process.env.REACT_APP_EMAILJS_PRAYER_REQUEST_TEMPLATE_KEY, e.target,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        );
    
        // window.location.reload();
    }

    return (
        <section className="prayer-requests-page">
            <video muted loop autoPlay playsInline src={prayerRequestBackground} />
            
            <main>
                <h1>God's word has much to say on Prayer, and God's Desire to grant us our requests</h1>
                <p>Matthew 18:19 : "Again I say unto you, that if two of you shall agree on earth as touching any thing that they shall ask, it shall be done for them of my Father which is in Heaven."</p>
                <p>1 John 5:14-15: "And this is the confidence ( the assurance, the privilege of boldness) which we have in Him: (we are sure) that if we ask anything according to His will, He listens to and hears us.  And if we know that we have the requests made of him.</p>

                <form className="prayer-request form-default" onSubmit={sendEmail}>
                    <h1>
                        Prayer Request Page 
                    </h1>

                    <label htmlFor="who-input">Who needs Prayer?</label>
                    <input
                        className="who-input"
                        type="text"
                        id="who"
                        name="who-input"
                        // value=
                        placeholder="Type name "
                    />

                    <label htmlFor="what-input">What is their relationship to you?</label>
                    <input
                        className="what-input"
                        type="text"
                        id="what"
                        name="what-input"
                        // value=
                        placeholder="(Optional: Friend, mom, dad, spouse, you etc.) "
                    />

                    <label htmlFor="prayer-input">Prayer Details</label>
                    <textarea
                        className='prayer-details-input'
                        type='text'
                        id='prayer-details-input'
                        name='prayer-details-input'
                        rows='10'
                        cols='30'
                        placeholder='type here --'
                    />
                    
                    {/* Name and Date */}
                    <ul className="name-date-list d-flex gap-3">
                        <li className="name-cell">
                            <label>
                                Your Name
                                <input
                                    className='name'
                                    type='text'
                                    id='name'
                                    name='name-cell'
                                    placeholder='Name'
                                />
                            </label>
                        </li>
                        <li className="date-cell">
                            <label>
                                Today's Date
                                <input
                                    className='date'
                                    type='datetime-local'
                                    id='date'
                                    name='date-cell'
                                    placeholder='Date'
                                />
                            </label>
                        </li>
                    </ul>
                
                    {/* Options */}
                    <fieldset>
                        <legend className="prayer-radio-button-title">Would you like us to pray for your intention during the morning announcments?</legend>
                    
                        <label>
                            <input type='radio' id='Yes' name="drone1" value='Yes' checked/> 
                            Yes
                        </label>
                        <label>
                            <input type='radio' id='No' name="drone1" value='No'/>
                            No
                        </label>
                    </fieldset>
                    <fieldset className="mb-5">
                        <legend className="prayer-radio-button-title">Is it OK to post your request in Church?</legend>
                        <label>
                            <input type='radio' id='Yes' name="drone2" value='Yes' checked/>
                            Yes
                        </label>
                        <label>
                            <input type='radio' id='No' name="drone2" value='No'/>
                            No
                        </label>
                    </fieldset>

                    {/* Email */}
                    <label htmlFor="email-from">Your Email:</label>
                    <input type="text" name="email-from" id="email-from" className="email-form" placeholder="Your Email" />

                    {/* Submit */}
                    <fieldset className="text-center">
                        <button type="submit" className="submit-button button-custom">Send</button>
                    </fieldset>
                </form>
                <BackHomeButton/>
            </main>
        </section>
    )
}

export default PrayerRequestsContainer