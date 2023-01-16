//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Para}

//components
import AddHonorsItemModal from "../AddHonorsItemModal";
import { Parallax, ParallaxBannerLayer } from 'react-scroll-parallax'; 
import { HonorDoc } from "./HonorDoc";
import { BackHomeButton } from '../BackHomeButton/BackHomeButton';
import { fetchDocuments } from './utils';

//CSS
import honorPageVideo from '../images/honor-page-video.mp4'
import background from "../images/trees-wallpaper-green.jpeg"
import './HonorsPage.scss'

function HonorsPage({ currentUser, addHonorIsOpen, setAddHonorIsOpen}){    
    const [ selectedDocument, setSelectedDocument ] = useState(null)
    const [ documents, setDocuments ] = useState(null)    
    const [ editHonorIsOpen , setEditHonorIsOpen ] = useState(false);
    const [ deleteHonorIsOpen, setDeleteHonorIsOpen ] = useState(false);

    useEffect(() => {
        fetchDocuments(setDocuments);
      }, [])

    function selectEditModal(doc) {
        console.log('inside selectEditModal')
        console.log(`selected doc: ${doc.id}`)
        setSelectedDocument(doc);
        setEditHonorIsOpen(true);
    }

    function selectDeleteModal(doc) {
        console.log('inside selectDeleteModal')
        console.log(`selected doc: ${doc.id}`)
        setSelectedDocument(doc);
        setDeleteHonorIsOpen(true);
    }

    return(
        <div className="honors">
            <Parallax className={'honors-background'} speed={-50}>
                {/*<video muted loop autoPlay playsInline src={honorPageVideo}></video>*/}
                <ParallaxBannerLayer image={background} speed={-30} className="opacity-50" />
            </Parallax>
            <div className="position-relative px-5">
                <div className="honors-top-heading">
                    <h1>Honors</h1>
                    <p>Learn more about our church and its members</p>
                </div>

                {/* */}
                <AddHonorsItemModal
                    setDocuments={setDocuments} 
                    addHonorIsOpen={addHonorIsOpen} 
                    setAddHonorIsOpen={setAddHonorIsOpen}
                />
            
                <div className="add-new-honor-container">
                    <div className="column"></div>
                    <div className="column"><h2>Documents</h2></div>
                    {(currentUser?.admin || currentUser?.user?.admin) && (
                        <div className="column">
                            <button
                                className='add-new-honor-item-modal-btn'
                                type='button'
                                onClick={() => setAddHonorIsOpen(true)}>Add new document</button>
                        </div>
                    )}
                </div>

                {/* */}
                <div class="row">
                    {documents && documents.map(doc => 
                        <div class="col-12 col-md-6"><HonorDoc currentUser={currentUser}
                            doc={doc}
                            fetchDocuments={fetchDocuments}
                            selectedDocument={selectedDocument}
                            editHonorIsOpen={editHonorIsOpen}
                            setEditHonorIsOpen={setEditHonorIsOpen}
                            selectEditModal={selectEditModal}
                            selectDeleteModal={selectDeleteModal}
                            documents={documents}
                            setDocuments={setDocuments}
                            deleteHonorIsOpen={deleteHonorIsOpen}
                            setDeleteHonorIsOpen={setDeleteHonorIsOpen} />
                        </div>
                    )}
                </div>
                <BackHomeButton/>
            </div>
        </div>
           
    
    )
}

export default HonorsPage