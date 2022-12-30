//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function DeleteHonorsItemModal({ selectedDocument, doc, documents, setDocuments, deleteHonorIsOpen, setDeleteHonorIsOpen}){

    const { id } = doc;

    function handleDocumentDelete(deletedDocument) {
        // console.log(deletedID)
        const updatedDocumentArray = documents.filter(
          (document) => document.id !== deletedDocument
        );
        setDocuments(updatedDocumentArray);
    }

    function handleDocumentDeleteClick(e) {
        e.preventDefault()
        const reqObj = {
            method: "DELETE"
        }
        fetch(`/api/documents/${id}`, reqObj )
        .then((res) => res.json())
        .then(handleDocumentDelete(id))
        .then(setDeleteHonorIsOpen(false));
    }

    return(
        <div>
            <Modal className='modal'
                show={ deleteHonorIsOpen && selectedDocument === doc }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader >
                <ModalTitle>Are you sure you want to delete #{doc.id}?</ModalTitle>
            </ModalHeader>
                <ModalFooter> 
                    <button onClick={(e) => handleDocumentDeleteClick(e)}>Yes</button>
                    
                    <button type="button" onClick={() => {setDeleteHonorIsOpen(false)}}>No</button> 
                </ModalFooter> 
            </Modal>

        </div>
    )
}

export default DeleteHonorsItemModal