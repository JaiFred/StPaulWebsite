//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//components
import AddHonorsItemModal from "./AddHonorsItemModal";
import DeleteHonorsItemModal from "./DeleteHonorsItemModal";
import EditHonorsItemModal from "./EditHonorsItemModal";

function HonorsPage({ currentUser, addHonorIsOpen, setAddHonorIsOpen}){    
    const [ selectedDocument, setSelectedDocument ] = useState(null)
    const [ documents, setDocuments ] = useState(null)    
    const [ editHonorIsOpen , setEditHonorIsOpen ] = useState(false);
    const [ deleteHonorIsOpen, setDeleteHonorIsOpen ] = useState(false);

    function fetchDocuments() {
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
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
            <div>
                <button className='add-new-honor-item-modal-btn' type='button' onClick={() => setAddHonorIsOpen(true)}>add new item</button>
                <AddHonorsItemModal 
                    setDocuments={setDocuments} 
                    addHonorIsOpen={addHonorIsOpen} 
                    setAddHonorIsOpen={setAddHonorIsOpen}
                />
            {
                documents && documents.map(doc => {

                    if (doc.file.endsWith(".pdf")) {
                        return <div>                            
                            
                            <embed src={doc.file} target="_blank" width="500" height="600" />
                            <p>Description: {doc.description}</p>
                            
                            <a href={doc.file} target="_blank">Click to Open</a>

                            {/* This will edit a document in the Honors Page */}
                            <button className='edit-honor-item-modal-btn' type='button' onClick={() => selectEditModal(doc)}>Edit</button>
                            <EditHonorsItemModal
                                fetchDocuments={fetchDocuments}
                                selectedDocument={selectedDocument}
                                doc={doc}
                                editHonorIsOpen={editHonorIsOpen}
                                setEditHonorIsOpen={setEditHonorIsOpen}
                            />                            

                            {/* This will delete a document in the Honors Page */}
                            <button className='delete-honor-item-modal-btn' type='button' onClick={() => selectDeleteModal(doc)}>Delete</button>
                            <DeleteHonorsItemModal 
                                selectedDocument={selectedDocument} 
                                doc={doc}                                                               
                                documents={documents} 
                                setDocuments={setDocuments} 
                                deleteHonorIsOpen={deleteHonorIsOpen} 
                                setDeleteHonorIsOpen={setDeleteHonorIsOpen}                                
                            />

                        </div>

                    } else {
                        return <div>
                            <img src={doc.file} width="500" height="600"></img>
                             <p>Description: {doc.description}</p>

                             {/* This will edit a document in the Honors Page */}
                             <button className='edit-honor-item-modal-btn' type='button' onClick={() => selectEditModal(doc)}>Edit</button>
                             <EditHonorsItemModal
                                fetchDocuments={fetchDocuments}
                                selectedDocument={selectedDocument}
                                doc={doc}                                
                                editHonorIsOpen={editHonorIsOpen}
                                setEditHonorIsOpen={setEditHonorIsOpen}
                             />
                            {/* <button><Link to={`/edithonors/${doc.id}`}>Edit</Link></button> */}

                            {/* This will delete a document in the Honors Page */}
                            <button className='delete-honor-item-modal-btn' type='button' onClick={() => selectDeleteModal(doc)}>Delete</button>
                            <DeleteHonorsItemModal 
                                selectedDocument={selectedDocument} 
                                doc={doc}                                
                                documents={documents} 
                                setDocuments={setDocuments}
                                deleteHonorIsOpen={deleteHonorIsOpen} 
                                setDeleteHonorIsOpen={setDeleteHonorIsOpen}                                 
                            />
                        </div>
                     }
                })

            }</div>

            ):(

            <div>
            {
                documents && documents.map(doc => {

                    if (doc.file.endsWith(".pdf")) {
                        return <div>
                            <embed src={doc.file} target="_parent" width="500" height="600" />;
                            <p>Description: {doc.description}</p>;
                        </div>

                    } else {
                        return <div>
                                <img src={doc.file} width="500" height="600"></img>
                                <p>Description: {doc.description}</p>
                            </div>
                    }
                })

            }
            </div>
        )}
        </div>
    )
}

export default HonorsPage