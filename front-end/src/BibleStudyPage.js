//Hooks
import React, {useState, useEffect} from "react";
import ReactPlayer, { controls } from "react-player";

function BibleStudyPage({ currentUser }){

    const API = process.env.REACT_APP_MY_GOOGLE_API_KEY
    const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID
    const result = 1

    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
    console.log(`finalURL: ${finalURL}`);

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch(finalURL)
            .then((r) => r.json())
            .then((response) => {
            setVideos(response.items.map((item) => `https://www.youtube.com/watch?v=${item.id.videoId}`));
            })
        },[])
                
    console.log(`videos: ${JSON.stringify(videos)}`);

        return(
            <div className="Bible-study-overlay">
                <h1>Bible Study</h1>
                <div className="Bible-study-info-container">
                {/* {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (<div className="events-actions">
                        <button className='events-actions-button' type='button' onClick={() => setAddEventIsOpen(true)}>Add New Event</button>
                        <SubmitNewEventModal events={events} setEvents={setEvents} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen} handleAddNewEvent={handleAddNewEvent}/>
                    </div>
                    ) : ''} */}
                    <h2>Church Hours</h2>
                    <p>Sunday School services:<br/>
                    <strong>9:30 AM.</strong>
                    </p>
                    <p>Sunday Morning services:<br/>
                    <strong>11:00 AM.</strong></p>
                    <p>Bible Study is every <strong>second</strong> and <strong>third Wednesday</strong>  of each month at <strong>7:00 PM.</strong></p>

                    <p>*This page will be updated periodically with the dates church service shall take place</p>

                    <p>
                        Topic: Prayer Night and Bible Study for Jan-Dec 2023
                        Time: Jan 4, 2023 07:00 PM Eastern Time (US and Canada)

                        Every week on Wed, until Dec 13, 2023, 49 occurrence(s)
                    </p>

                    <p>
                        Jan 4, 2023 07:00 PM
                        Jan 11, 2023 07:00 PM
                        Jan 18, 2023 07:00 PM
                        Feb 1, 2023 07:00 PM
                        Feb 8, 2023 07:00 PM
                        Feb 15, 2023 07:00 PM
                        Mar 1, 2023 07:00 PM
                        Mar 8, 2023 07:00 PM
                        Mar 15, 2023 07:00 PM
                        Apr 5, 2023 07:00 PM
                        Apr 12, 2023 07:00 PM
                        Apr 19, 2023 07:00 PM
                        May 3, 2023 07:00 PM
                        May 10, 2023 07:00 PM
                        May 17, 2023 07:00 PM
                        Jun 7, 2023 07:00 PM
                        Jun 14, 2023 07:00 PM
                        Jun 21, 2023 07:00 PM
                        Jul 5, 2023 07:00 PM
                        Jul 12, 2023 07:00 PM
                        Jul 19, 2023 07:00 PM
                        Aug 2, 2023 07:00 PM
                        Aug 9, 2023 07:00 PM
                        Aug 16, 2023 07:00 PM
                        Sep 6, 2023 07:00 PM
                        Sep 13, 2023 07:00 PM
                        Sep 20, 2023 07:00 PM
                        Oct 4, 2023 07:00 PM
                        Oct 11, 2023 07:00 PM
                        Oct 18, 2023 07:00 PM
                        Nov 1, 2023 07:00 PM
                        Nov 8, 2023 07:00 PM
                        Nov 15, 2023 07:00 PM
                        Dec 6, 2023 07:00 PM
                        Dec 13, 2023 07:00 PM
                        Dec 20, 2023 07:00 PM

                    </p>
                </div>

            <div>
                {videos.map(url => <div><ReactPlayer url={url} controls/></div>)}
            </div>
            </div>
        )
    
}


export default BibleStudyPage