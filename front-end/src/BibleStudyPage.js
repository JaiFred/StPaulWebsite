//Hooks
import React, { useState, useEffect } from "react";
import ReactPlayer, { controls } from "react-player";

import EditDashboardDocumentModal from "./EditDashboardDocumentModal";
import { ReactPlayerWrapper } from "./ReactPlayerWrapper/ReactPlayerWrapper";
import { Parallax } from 'react-scroll-parallax'; 

//Component
import editIcon from "./images/event-edit-icon.svg";
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

//CSS
import YellowTrees from "./images/honor-page-video.mp4"
import './BibleStudyPage.scss';
import placholderImage from './images/Giving.jpeg'



function BibleStudyPage({ currentUser }) {
  const API = process.env.REACT_APP_MY_GOOGLE_API_KEY;
  const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
  const result = 1;

  var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`;
  console.log(`finalURL: ${finalURL}`);

  const [videos, setVideos] = useState([]);
  const [document, setDocument] = useState([]);
  const [
    editDashboardDocumentModalIsOpen,
    setEditDashboardDocumentModalIsOpen,
  ] = useState(false);
  const blankLinks = (html) => html?.replaceAll("<a ", '<a target="_blank" ');
  const parseDescription = (html) => {
    return blankLinks(html);
  };

  console.log({ currentUser, editDashboardDocumentModalIsOpen });

  function fetchDashboardDocuments() {
    fetch(`/api/dashboard_documents`)
      .then((r) => r.json())
      .then((document) => setDocument(document));
  }

  useEffect(() => {
    fetchDashboardDocuments();

    fetch(finalURL)
      .then((r) => r.json())
      .then((response) => {
        setVideos(
          response.items.map(
            (item) => `https://www.youtube.com/watch?v=${item.id.videoId}`
          )
        );
      });
  }, []);

  console.log(`videos: ${JSON.stringify(videos)}`);
  console.log(`document inside BibleStudyPage: ${JSON.stringify(document)}`);
  console.log('currentUser?.admin', currentUser?.admin)

  if (!document) {
    return <div>Loading!</div>;
  }

  // if (!currentUser) return null;

  return (
    <div className="bible-study-overlay overflow-hidden position-relative">
        <Parallax className={'bible-study-background'} speed={-50}>
            <video muted loop autoPlay playsInline src={YellowTrees}></video>
        </Parallax>
        <div className="bible-study position-relative text-center">
            <h1>Bible Study</h1>
            <div className="Bible-study-info-container text-start">
                {/* onClick={() => setEditDashboardDocumentModalIsOpen(true)}>Edit Dashboard</button> */}
                {/* )} */}

                <div class="honor-doc-infos-inner">
                    {(currentUser?.admin || currentUser?.user?.admin) && (
                        <button
                            className="dashboard-document-control"
                            type="button"
                            onClick={() => setEditDashboardDocumentModalIsOpen(true)}>
                                <img src={editIcon} />
                        </button>
                    )}
                    <p
                        dangerouslySetInnerHTML={{
                        __html: parseDescription(document?.description),
                        }}
                    ></p>
                </div>
            </div>

            {(currentUser?.admin || currentUser?.user?.admin === true) && (
                <EditDashboardDocumentModal
                document={document}
                setDocument={setDocument}
                // selectedDocument={selectedDocument}
                // selectEditModal={selectEditModal}
                // initDescription={document.description}
                fetchDashboardDocuments={fetchDashboardDocuments}
                editDashboardDocumentModalIsOpen={editDashboardDocumentModalIsOpen}
                setEditDashboardDocumentModalIsOpen={
                    setEditDashboardDocumentModalIsOpen
                }
                />
            )}
        </div>
        <div className="bible-study__bottom-image-wrapper">
            {/* <ReactPlayerWrapper url={videos[0]?.url}/> */}
            {/* {videos.map((url) => (
                <div>
                    <ReactPlayer url={url} controls />
                </div>
            ))} */}
            <h3>Livestream of the latest service</h3>
            <div className="bible-study__bottom-image">
                <img src={placholderImage}></img>
            </div>
            <BackHomeButton className="py-5 mb-0" />
        </div>
    </div>
  );
}

export default BibleStudyPage;
