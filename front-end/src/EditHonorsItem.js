
import react, { useState, useEffect } from 'react';
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

// send props into here to make this work again...

function EditHonorsItem({ fetchDocuments, doc, setEditHonorIsOpen }){

    const navigate = useNavigate();

    //  const { id } = document;
    // let { id } = useParams();

    console.log(`EditHonorsItem..document.id: ${doc.id}`);

    const [editedDescription, setEditedDescription] = useState(doc.description);
    const [ document, setDocument ] = useState(null)
    const [isDocumentPdf, setIsDocumentPdf] = useState(doc.file.endsWith(".pdf"));
    const [showExistingDocument, setShowExistingDocument] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`handleSubmit updating document: ${doc.id}`);

        const formData = new FormData();
        if (document) {
            formData.append("file", document);
        }        
        formData.append("description", editedDescription);

        const configObj = {
            method: "PATCH",
            body: formData
        }

        fetch(`api/documents/${doc.id}`, configObj)
        .then((response) => {
            console.log('document updated successfully');
            console.log('fetching latest documents 1')
            setEditHonorIsOpen(false);
            console.log('fetching latest documents 2')
            fetchDocuments();
          })      
    };

    function handleDocumentsChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) { 
            setDocument(e.target.files[0]); 
            setShowExistingDocument(false);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
            {
                showExistingDocument && (isDocumentPdf ? <embed src={doc.file} target="_parent" width="500" height="600" /> 
                    : 
                <img src={doc.file} width="500" height="600"></img>)
            }
            <input 
                type="file" 
                name="documents"
                accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel"
                onChange={handleDocumentsChange}
                multiple
            />
            <textarea
                type="text"
                id="description"
                name="description"
                rows='5'
                cols='30'
                value={editedDescription}
                placeholder="description..."
                onChange={(e) => { setEditedDescription(e.target.value)}}
            />
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Edit</button>
        </form>
    )

}
export default EditHonorsItem