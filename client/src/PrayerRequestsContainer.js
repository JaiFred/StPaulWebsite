//Hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser"
import moment from "moment";
import useAvoidBounce from "./hooks/useAvoidBounce";

//Components
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

//CSS

import './PrayerRequests.scss';

function PrayerRequestsContainer(){
    // const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";

    useAvoidBounce();

    const prayerRequestBackground = "https://st-paul-baptist-website-uploads.s3.amazonaws.com/Prayer-request-background.mp4"
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [prayerDetails, setPrayerDetails] = useState('');
    const [whatDetails, setWhatDetails] = useState('');
    const [whoDetails, setWhoDetails] = useState('');
    const [drone1, setDrone1] = useState('yes');
    const [drone2, setDrone2] = useState('yes');
    const navigate = useNavigate();

    const sendEmail = (e) => {
        e.preventDefault();
        alert("Thank you for your prayer request!");

        const reqBody = {
            service_id: process.env.REACT_APP_EMAILJS_SERVICE_KEY,
            template_id: process.env.REACT_APP_EMAILJS_PRAYER_REQUEST_TEMPLATE_KEY,
            user_id: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
            template_params: {
                'name-cell': name,
                'date-cell': moment(date).format("lll"),
                'email-from': email,
                'who-input': whoDetails,
                'what-input': whatDetails,
                'prayer-details-input': prayerDetails,
                'drone1': drone1,
                'drone2': drone2,
            },
            accessToken: process.env.REACT_APP_EMAILJS_PRIVATE_KEY
        }

        fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(reqBody)
        })
        .then((_res) => {
            // window.location.reload(false);
            navigate('/prayer_request_success')
        });
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
                        placeholder="Type name"
                        value={whoDetails}
                        onChange={(e) => setWhoDetails(e.target.value)}
                    />

                    <label htmlFor="what-input">What is their relationship to you?</label>
                    <input
                        className="what-input"
                        type="text"
                        id="what"
                        name="what-input"
                        // value=
                        placeholder="(Optional: Friend, mom, dad, spouse, you etc.) "
                        value={whatDetails}
                        onChange={(e) => setWhatDetails(e.target.value)}
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
                        value={prayerDetails}
                        onChange={(e) => setPrayerDetails(e.target.value)}
                    />

                    {/* Name and Date */}
                    <ul className="name-date-list gap-3">
                        <li className="name-cell">
                            <label>
                                Your Name
                                <input
                                    className='name'
                                    type='text'
                                    id='name'
                                    required
                                    name='name-cell'
                                    placeholder='Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </li>
                        <li className="date-cell">
                            <label>
                                Today's Date
                                <input
                                    className='date'
                                    type='datetime-local'
                                    required
                                    id='date'
                                    name='date-cell'
                                    placeholder='Date'
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </label>
                        </li>
                    </ul>

                    {/* Options */}
                    <fieldset>
                        <legend className="prayer-radio-button-title">Would you like us to pray for your intention during the morning announcments?</legend>

                        <label>
                            <input
                                type='radio'
                                id='Yes'
                                name="drone1"
                                checked={drone1 === 'Yes'}
                                value='Yes'
                                onClick={(e) => setDrone1('Yes')}
                                />
                                Yes
                        </label>
                        <label>
                            <input
                                type='radio'
                                id='No'
                                checked={drone1 === 'No'}
                                value='No'
                                onClick={(e) => setDrone1('No')}
                                />
                                No
                        </label>
                    </fieldset>
                    <fieldset className="mb-5">
                        <legend className="prayer-radio-button-title">Is it OK to post your request in Church?</legend>
                        <label>
                            <input
                                type='radio'
                                id='Yes'
                                name="drone2"
                                checked={drone2 === 'Yes'}
                                value='Yes'
                                onClick={(e) => setDrone2('Yes')}
                                />
                                Yes
                        </label>
                        <label>
                            <input
                                type='radio'
                                id='No'
                                name="drone2"
                                checked={drone2 === 'No'}
                                value='No'
                                onClick={(e) => setDrone2('No')}
                                />
                                No
                        </label>
                    </fieldset>

                    {/* Email */}
                    <label htmlFor="email-from">Your Email:</label>
                    <input
                        type="email"
                        name="email-from"
                        id="email-from"
                        required
                        className="email-form"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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