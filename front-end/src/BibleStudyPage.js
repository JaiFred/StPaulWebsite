//Hooks
import React, {useState, useEffect} from "react";
import ReactPlayer, { controls } from "react-player";

import EditDashboardDocumentModal from "./EditDashboardDocumentModal"
import { ReactPlayerWrapper } from "./ReactPlayerWrapper/ReactPlayerWrapper";

//Component
import editIcon from "./images/event-edit-icon.svg";






function BibleStudyPage({ currentUser }){

    const API = process.env.REACT_APP_MY_GOOGLE_API_KEY
    const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID
    const result = 1

    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
    console.log(`finalURL: ${finalURL}`);

    const [videos, setVideos] = useState([])
    const [document, setDocument] = useState([])
    const [editDashboardDocumentModalIsOpen , setEditDashboardDocumentModalIsOpen] = useState(false)
    const blankLinks = (html) => html?.replaceAll("<a ", '<a target="_blank" ');
    const parseDescription = (html) => {
        return blankLinks(html);
      };
   

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

                    {/* {(currentUser?.admin || currentUser?.user?.admin) && ( */}
                        <button
                            className="Dashboard-document-control"
                            type="button"
                            onClick={() => setEditDashboardDocumentModalIsOpen(true)}><img src={editIcon}/></button>
                            {/* onClick={() => setEditDashboardDocumentModalIsOpen(true)}>Edit Dashboard</button> */}
                    {/* )} */}

                        

                    <div class="honor-doc-infos-inner">
                        <p
                        dangerouslySetInnerHTML={{
                            __html: parseDescription(document?.description),
                        }}>

                        </p>
                    </div>
                </div>

                <div>
                {/* <ReactPlayerWrapper url={videos[0]?.url}/> */}
                    {videos.map(url => <div><ReactPlayer url={url} controls/></div>)}
                </div>

                {(currentUser?.admin === true || currentUser?.user?.admin === true) && (
                        <>
                            <EditDashboardDocumentModal
                                document={document}
                                setDocument={setDocument}
                                // selectedDocument={selectedDocument}
                                // selectEditModal={selectEditModal}
                                // initDescription={document.description}
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