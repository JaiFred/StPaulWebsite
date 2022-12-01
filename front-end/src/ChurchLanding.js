import { useState } from 'react';
import { Link } from "react-router-dom";

import GivingModal from "./GivingModal";


// Child Component of App.js

function ChurchLanding({ currentUser, givingIsOpen, setGivingIsOpen}){
  

  return(
    <div class="homepage-background">
      <div className="homepage-links-container">
      <button>
        <div className="big-bulletin-button">
          <button className="main"><a href='/events' >Bulletin</a></button>
          {/* <Link to='/events'>Bulletin</Link> */}
        </div>
      </button>
        {/* <div className="big-Giving-button"> */}
        <button className="big-giving-modal-btn" type="button" onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
        {/* </div> */}
      <button>
        <div className="big-broadcasts-button">
          <Link to='/broadcasts'>Broadcasts</Link>
        </div>
      </button>
      <button>
        <div className="big-Prayer-button">
          <Link to='/prayer_requests'>Prayer Requests</Link>
        </div>
      </button>
      <button>
        <div className="Test-button">
          <Link to='/recurring-payment'>Recurring Payment</Link>
        </div>
      </button>
      </div>
      <div className="bible-dec-background">
        <h1>
        Bible Declaration
        </h1>
        <p>
        "This is my bible which is the word of God. God's word has everything I need for daily living. God's word is food for my Spirit when I need it is hungry. God's word is water for my Spirit when it is thirsty. God's word is my power to be released from everything that is not of the True and Living God. I thank you God for your word. As I read your word, I pray for your anointing, understanding and knowledge to be granted to me by your Holy Spirit. In the name of your son and my savior, Jesus the Christ (the Anointed One). I Pray and give thanks and counted it done. Amen."
        </p>
        <h1>
        Psalm 119:105
        </h1>
        <p>
        "Your word is a lamp for my feet, a light on my path."
        </p>

      </div>   
    </div>
  )
}
export default ChurchLanding