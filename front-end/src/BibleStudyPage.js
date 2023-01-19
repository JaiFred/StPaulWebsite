//Hooks
import React, {useState, useEffect} from "react";
import ReactPlayer, { controls } from "react-player";
import { DarkHeader } from './Modal/Header'

import EditDashboardDocumentModal from "./EditDashboardDocumentModal"

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
    const [editDashboardDocumentModalIsOpen, setEditDashboardDocumentModalIsOpen] = useState(false)

    function fetchDashboardDocuments(){
        fetch(`/api/dashboard_documents`)
            .then((r) => r.json())
            .then(document => setDocument(document))
    }

    useEffect(() => {
        fetchDashboardDocuments();

        fetch(finalURL)
            .then((r) => r.json())
            .then((response) => {
            setVideos(response.items.map((item) => `https://www.youtube.com/watch?v=${item.id.videoId}`));
            })                    
    },[])
                
    console.log(`videos: ${JSON.stringify(videos)}`);    
    console.log(`document inside BibleStudyPage: ${JSON.stringify(document)}`)

    if (!document) {
        return <div>Loading!</div>
    }

        return(
            <div className="Bible-study-overlay">
                <h1>Bible Study</h1>
                <div className="Bible-study-info-container">
                    {/* {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (<div className="events-actions">
                            <button className='events-actions-button' type='button' onClick={() => setAddEventIsOpen(true)}>Add New Event</button>
                            <SubmitNewEventModal events={events} setEvents={setEvents} addEventIsOpen={addEventIsOpen} setAddEventIsOpen={setAddEventIsOpen} handleAddNewEvent={handleAddNewEvent}/>
                        </div>
                        ) : ''} */}

                                <button
                                        className="honor-doc-control"
                                        type="button"
                                        onClick={() => setEditDashboardDocumentModalIsOpen(true)}
                                    >X
                                </button>

                        

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
                {(currentUser?.admin === true || currentUser?.user?.admin === true) && (
                        <>
                            <EditDashboardDocumentModal
                            document={document}
                            initDescription={document.description}
                            fetchDashboardDocuments={fetchDashboardDocuments}
                            editDashboardDocumentModalIsOpen={editDashboardDocumentModalIsOpen}
                            setEditDashboardDocumentModalIsOpen={setEditDashboardDocumentModalIsOpen}
                            />
                        </>
                )}
            </div>
        )
    
}


export default BibleStudyPage