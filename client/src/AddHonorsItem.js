//Hooks
import React, { useState, useEffect } from "react";

//Components
import Editor from './Editor/Editor';
import ModalFooter from './Modal/Footer';
import InputFile from './Inputs/File';
import { OpaqueErrorMessage } from "./Forms/OpaqueErrorMessage";



function AddHonorsItem({ setDocuments, onCancel }){
    const [description, setDescription] = useState('')
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null);

    // const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";


    function handleSubmit(e) {
        console.log("submitted!")
        e.preventDefault();
        
        if (!document && !description) {
            setError('Both document and description cant be blank!')
            return
        }
        
        if (!document) {
            setError('Image must be uploaded!')
            return;
        }

        const formData = new FormData();
        
        if (document) {
            formData.append("file", document);
        }
        formData.append("description", description);

        fetch(`/api/honor_pages`, {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((honorPage) => setDocuments(honorPage.documents))
        .then(alert("New Document Created!"))
        .then(onCancel)
    }

    function handleDocumentsChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) setDocument(e.target.files[0]);
    };

    return(
        <div>
            {error && <OpaqueErrorMessage message={error.message || error} />}
            <form className="text-center" method="post">
                <InputFile
                    name="documents"
                    accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel"
                    onChange={handleDocumentsChange}
                    className="mb-3"
                /> 
                <h6 className="document-content-title-box">Add information about this document</h6>
                <Editor 
                    id='description'
                    value={description}
                    onChange={setDescription}
                    placeholder="Type here..."
                />
                <ModalFooter onSubmit={handleSubmit} onCancel={onCancel} />
            </form>
        </div>
    )
}

export default AddHonorsItem