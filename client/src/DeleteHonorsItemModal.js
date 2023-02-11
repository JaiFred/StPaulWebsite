//Hooks
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'

//Components
import ModalFooter from './Modal/Footer';

function DeleteHonorsItemModal({ selectedDocument, doc, documents, setDocuments, deleteHonorIsOpen, setDeleteHonorIsOpen}){
    const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";
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
        fetch(`${API_ENDPOINT}/api/documents/${id}`, reqObj )
            .then((res) => res.json())
            .then(handleDocumentDelete(id))
            .then(setDeleteHonorIsOpen(false));
    }

    return(
        <Modal
            className='modal modal-delete text-center'
            show={deleteHonorIsOpen && selectedDocument === doc}
        >
            <ModalHeader className="justify-content-center">
                <ModalTitle className='bold'>
                        Are you sure you want<br /> to delete Document #{doc.id}?
                </ModalTitle>
            </ModalHeader>
            <ModalFooter 
                onSubmit={handleDocumentDeleteClick}
                onCancel={() => setDeleteHonorIsOpen(false)}
                submitLabel='Yes'
                cancelLabel='No'
                className="mb-4 mt-2"
                theme='dark' />
        </Modal>
    )
}

export default DeleteHonorsItemModal