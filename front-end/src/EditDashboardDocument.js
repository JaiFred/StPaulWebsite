//Hooks
import { ModalFooter } from 'react-bootstrap'
import React, {useState, useEffect} from "react"; 
import className from 'classnames'


//Components
import Editor from './Editor/Editor';


const EditDashboardDocument = ({ document, fetchDashboardDocuments, editDashboardDocumentModalIsOpen, setEditDashboardDocumentModalIsOpen, onCancel }) => {    
    console.log(`document inside EditDashboardDocumentModal: ${JSON.stringify(document)}`)
    const description = document.description;
    // console.log(`document inside EditDashboardDocumentModal initDescription: ${initDescription}`)
    const [editedDescription, setEditedDescription] = useState(description);
    // if (editedDescription !== description) {
    //     setEditedDescription(description)
    // }

    // useEffect(() => {
    //     setEditedDescription(initDescription);
    // },[])
    
    console.log(`editedDescription: ${editedDescription}`)

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`handleSubmit updating document: ${document.id}`);

        const formData = new FormData();       
        formData.append("description", editedDescription);

        const configObj = {
            method: "PATCH",
            body: formData
        }

        fetch(`api/dashboard_documents/${document.id}`, configObj)
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
                <h6 className="document-content-title-box">Edit Dashboard</h6>
                <Editor
                        id="description"
                        value={editedDescription}
                        onChange={newValue => setEditedDescription(newValue)}
                        placeholder="description..." 
                />
            </div>                    
            <ModalFooter onSubmit={handleSubmit} onCancel={onCancel} submitLabel="Edit Me" />                
        </form>
    )
}

export default EditDashboardDocument;
