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
    const [document, setDocument] = useState([]);
    const blankLinks = (html) => html?.replaceAll("<a ", '<a target="_blank" ');
    const parseDescription = (html) => {
        return blankLinks(html);
      };

    useEffect(() => {
        fetch(finalURL)
            .then((r) => r.json())
            .then((response) => {
            setVideos(response.items.map((item) => `https://www.youtube.com/watch?v=${item.id.videoId}`));
            })

        fetch(`/api/dashboard_documents`)
            .then((r) => r.json())
            .then(document => setDocument(document))
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

                    <div class="honor-doc-infos-inner">
                        <p
                        dangerouslySetInnerHTML={{
                            __html: parseDescription(document?.description),
                        }}
                        ></p>
                    </div>
                </div>

                <div>
                    {videos.map(url => <div><ReactPlayer url={url} controls/></div>)}
                </div>
            </div>
        )
    
}


export default BibleStudyPage