//Hooks
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//components
import AddHonorsItemModal from "./AddHonorsItemModal";
import DeleteHonorsItemModal from "./DeleteHonorsItemModal";
import EditHonorsItem from "./EditHonorsItem";
import EditHonorsItemModal from "./EditHonorsItemModal";

function HonorsPage({ currentUser, addHonorIsOpen, setAddHonorIsOpen}){

    const [ document, setDocument ] = useState(null)
    const [ selectedDocument, setSelectedDocument ] = useState(null)
    const [ documents, setDocuments ] = useState(null)
    const [ description, setDescription ] = useState('')
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

      console.log(`documents: ${documents}`);

    function handleSubmit(e) {
        console.log("submitted!")
        e.preventDefault();

        const formData = new FormData();
        formData.append("document", document);
        formData.append("description", description);

        fetch("api/honor_pages", {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((honorPage) => setDocuments(honorPage.documents));
    }

    console.log(`document: ${document}`);

    function handleDocumentsChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) setDocument(e.target.files[0]);
    };

    // function handleDocumentDeleteClick(e) {
    //     e.preventDefault()
    //     const reqObj = {
    //         method: "DELETE"
    //     }
    //     fetch(`/api/honor_pages/${id}`, reqObj )
    //     .then((res) => res.json())
    //     .then(handleDeleteEvent(id))
    // }

    function handleDocumentDelete(deletedDocument) {
        // console.log(deletedID)
        const updatedDocumentArray = documents.filter(
          (document) => document.id !== deletedDocument
        );
        setDocuments(updatedDocumentArray);
    }

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
                <AddHonorsItemModal document={document} setDocument={setDocument} documents={documents} setDocuments={setDocuments} description={description} setDescription={setDescription} handleSubmit={handleSubmit} handleDocumentsChange={handleDocumentsChange} addHonorIsOpen={addHonorIsOpen} setAddHonorIsOpen={setAddHonorIsOpen}/>
            {
                documents && documents.map(doc => {

                    if (doc.file.endsWith(".pdf")) {
                        return <div>
                        <embed src={doc.file} target="_parent" width="500" height="600" />;
                            <p>Description: {doc.description}</p>;

                            {/* This will edit a document in the Honors Page */}
                            <button className='edit-honor-item-modal-btn' type='button' onClick={() => selectEditModal(doc)}>Edit</button>
                            <EditHonorsItemModal
                                fetchDocuments={fetchDocuments}
                                selectedDocument={selectedDocument}
                                doc={doc}
                                document={document}
                                setDocument={setDocument}
                                documents={documents}
                                setDocuments={setDocuments}
                                description={description}
                                setDescription={setDescription}
                                initDescription={doc.description}
                                handleSubmit={handleSubmit}
                                handleDocumentsChange={handleDocumentsChange}
                                editHonorIsOpen={editHonorIsOpen}
                                setEditHonorIsOpen={setEditHonorIsOpen}/>
                            {/* <button><Link to={`/edithonors/${doc.id}`}>Edit</Link></button> */}

                            {/* This will delete a document in the Honors Page */}
                            <button className='delete-honor-item-modal-btn' type='button' onClick={() => selectDeleteModal(doc)}>Delete</button>
                            <DeleteHonorsItemModal selectedDocument={selectedDocument} doc={doc} document={document} setDocument={setDocument} documents={documents} setDocuments={setDocuments} description={description} setDescription={setDescription} deleteHonorIsOpen={deleteHonorIsOpen} setDeleteHonorIsOpen={setDeleteHonorIsOpen} handleDocumentDelete={handleDocumentDelete}/>

                        </div>

                    } else {
                        return <div>
                            <img src={doc.file} width="500" height="600"></img>;
                             <p>Description: {doc.description}</p>

                             {/* This will edit a document in the Honors Page */}
                             <button className='edit-honor-item-modal-btn' type='button' onClick={() => selectEditModal(doc)}>Edit</button>
                             <EditHonorsItemModal
                             fetchDocuments={fetchDocuments}
                             selectedDocument={selectedDocument}
                             doc={doc} document={document}
                             setDocument={setDocument}
                             documents={documents}
                             setDocuments={setDocuments}
                             description={description}
                             setDescription={setDescription}
                             initDescription={doc.description}
                             handleSubmit={handleSubmit}
                             handleDocumentsChange={handleDocumentsChange}
                             editHonorIsOpen={editHonorIsOpen}
                             setEditHonorIsOpen={setEditHonorIsOpen}/>
                            {/* <button><Link to={`/edithonors/${doc.id}`}>Edit</Link></button> */}

                            {/* This will delete a document in the Honors Page */}
                            <button className='delete-honor-item-modal-btn' type='button' onClick={() => selectDeleteModal(doc)}>Delete</button>
                            <DeleteHonorsItemModal selectedDocument={selectedDocument} doc={doc} document={document} setDocument={setDocument} documents={documents} setDocuments={setDocuments} description={description} setDescription={setDescription} deleteHonorIsOpen={deleteHonorIsOpen} setDeleteHonorIsOpen={setDeleteHonorIsOpen} handleDocumentDelete={handleDocumentDelete}/>

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