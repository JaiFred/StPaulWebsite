//Hooks
import React, { useState, useEffect } from "react";
import Editor from './Editor/Editor';

function AddHonorsItem({ setDocuments, onCancel }){
    const [description, setDescription] = useState('')
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null);

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

        fetch("api/honor_pages", {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((honorPage) => setDocuments(honorPage.documents))
        .then(alert("New Document Created!"))
    }

    function handleDocumentsChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) setDocument(e.target.files[0]);
    };

    return(
        <div>
            {error && <p>{error}</p>}
            <form className="text-center" method="post">
                <label for="files">Select Documents:</label>            
                <input 
                    type="file" 
                    name="documents"
                    accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel"
                    onChange={handleDocumentsChange}
                    multiple
                    className="mb-3"
                />
                {/*<h3 className="document-add-text-box-">Information about this of document</h3>*/}
                <Editor 
                    id='description'
                    value={description}
                    onChange={setDescription}
                    placeholder="Type here..."
                />
                <div className="modal-buttons-group">
                    <button className="modal-button" id='submitBtn' type="button" onClick={handleSubmit}>Submit</button>
                    <button className="modal-button" type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddHonorsItem