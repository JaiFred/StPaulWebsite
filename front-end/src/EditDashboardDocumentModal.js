

//Hooks
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap'
import React, {useState, useEffect} from "react"; 
import className from 'classnames'


//Components
import { DarkHeader } from './Modal/Header'
import Editor from './Editor/Editor';




const EditDashboardDocumentModal = ({ document, initDescription, fetchDashboardDocuments, editDashboardDocumentModalIsOpen, setEditDashboardDocumentModalIsOpen }) => {    
    console.log(`document inside EditDashboardDocumentModal: ${JSON.stringify(document)}`)
    const description = document.description;
    console.log(`document inside EditDashboardDocumentModal initDescription: ${initDescription}`)
    const [editedDescription, setEditedDescription] = useState(description);
    if (editedDescription !== description) {
        setEditedDescription(description)
    }
    // useEffect(() => {setEditedDescription(description), [description]})

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

    return(
        <div className={className}>
            <Modal
                className='modal'
                show={ editDashboardDocumentModalIsOpen }
                autoFocus={false}
                onCancel={() => setEditDashboardDocumentModalIsOpen(false)}
                // heading="Edit"
            >
                <button type="button" onClick={() => {setEditDashboardDocumentModalIsOpen(false)}}>No</button>  
                <ModalTitle>edit</ModalTitle>
                <ModalBody>
                <form  onSubmit={handleSubmit}>
                    <div >
                        <h6 >Edit information about this dashboard document</h6>
                        <Editor
                                id="description"
                                value={editedDescription}
                                onChange={newValue => setEditedDescription(newValue)}
                                placeholder="description..." 
                        />
                    </div>                    
                    {/* <ModalFooter onSubmit={handleSubmit} onCancel={() => setEditDashboardDocumentModalIsOpen(false)} submitLabel="Edit Me" /> */}
                    <button onSubmit={handleSubmit} onCancel={() => setEditDashboardDocumentModalIsOpen(false)}> Edit </button>                    
                </form>
                </ModalBody>
            </Modal>
        </div>
        
    )
}

export default EditDashboardDocumentModal;
