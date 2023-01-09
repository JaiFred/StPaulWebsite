import { useState } from 'react';
import { Link } from "react-router-dom";


import background from '../images/trees-wallpaper-green.jpeg'
import { Parallax } from 'react-parallax';
import './ChurchLanding.scss'
import { HomepageBigButtons } from './HomepageBigButtons/HomepageBigButtons';

// Child Component of App.js

function ChurchLanding({ currentUser, givingIsOpen, setGivingIsOpen}){
  

  return(<>
    <Parallax bgImage={background} bgImageAlt="homepage background" strength={-200} className={'homepage-background'}>
      <HomepageBigButtons currentUser={currentUser} setGivingIsOpen={setGivingIsOpen} givingIsOpen={givingIsOpen}/>
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
    </Parallax>
    </>
  )
}
export default ChurchLanding