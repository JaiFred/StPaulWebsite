//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Para}

//components
import AddHonorsItemModal from "../AddHonorsItemModal";
import { Parallax } from 'react-scroll-parallax'; 
import { HonorDoc } from "./HonorDoc";

//CSS
import honorPageVideo from '../images/honor-page-video.mp4'
import './HonorsPage.scss'

function HonorsPage({ currentUser, addHonorIsOpen, setAddHonorIsOpen}){    
    const [ selectedDocument, setSelectedDocument ] = useState(null)
    const [ documents, setDocuments ] = useState(null)    
    const [ editHonorIsOpen , setEditHonorIsOpen ] = useState(false);
    const [ deleteHonorIsOpen, setDeleteHonorIsOpen ] = useState(false);

    function fetchDocuments() {
        console.log('Fetching documents from teh backend server !!!');
        fetch('/api/honor_pages', {
            credentials: 'include'
          })
            .then(res => {
              if (res.ok) {
                res.json().then(honorPages => {
                  setDocuments(honorPages[0].documents)
                })
              }
           })
    }

    useEffect(() => {
        fetchDocuments();
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
                <video muted loop autoPlay playsInline src={honorPageVideo}></video>
            </Parallax>
            <div className="container">
            {(currentUser?.admin === true || currentUser?.user?.admin === true) && 
                <div>
                    <button className='add-new-honor-item-modal-btn' type='button' onClick={() => setAddHonorIsOpen(true)}>add new item</button>
                    <AddHonorsItemModal 
                        setDocuments={setDocuments} 
                        addHonorIsOpen={addHonorIsOpen} 
                        setAddHonorIsOpen={setAddHonorIsOpen}
                    />
                </div>
            }
            <div class="row">
            {   
                documents && documents.map(doc => 
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
                )

            }
            </div>
        </div>
        </div>
           
    
    )
}

export default HonorsPage