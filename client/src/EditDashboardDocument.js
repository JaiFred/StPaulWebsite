import React, {useState, useEffect} from "react"; 
import className from 'classnames'
import ModalFooter from "./Modal/Footer";

//Components
import Editor from './Editor/Editor';

const EditDashboardDocument = ({ document, fetchDashboardDocuments, editDashboardDocumentModalIsOpen, setEditDashboardDocumentModalIsOpen, onCancel }) => {    
    
    // const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";

    const description = document.description;
    const [editedDescription, setEditedDescription] = useState(description);
    
    console.log(`editedDescription: ${editedDescription}`)

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`handleSubmit updating document: ${document.id}`);

        const formData = new FormData();       
        formData.append("description", editedDescription);
        formData.append("id", document.id)

        const configObj = {
            method: "PATCH",
            body: formData
        };

        fetch(`/api/dashboard_documents/${document.id}`, configObj)
            .then((response) => {
                console.log('dashoard document updated successfully');
                console.log('fetching latest documents 1')
                setEditDashboardDocumentModalIsOpen(false);
                console.log('fetching latest documents 2')
                fetchDashboardDocuments();
            })     
    };
    // <button type="button" onClick={() => {setEditDashboardDocumentModalIsOpen(false)}}>No</button>  

    return(
        <form className='dashboard-document-edit-form' onSubmit={handleSubmit}>
            <div  className="text-center">
                <h6 className="document-content-title-box">Update Dashboard</h6>
                <Editor
                        id="description"
                        value={editedDescription}
                        onChange={newValue => setEditedDescription(newValue)}
                        aspectRatio={'small'}
                        placeholder="description..." 
                />
            </div>                    
            <ModalFooter onSubmit={handleSubmit} onCancel={onCancel} submitLabel="Update" />                
        </form>
    )
}

export default EditDashboardDocument;
