//Hooks
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap'

//components
import EditHonorsItem from "./EditHonorsItem"

function EditHonorsItemModal({ fetchDocuments, selectedDocument, doc, document, setDocument, description, setDescription, initDescription, editHonorIsOpen, setEditHonorIsOpen, handleSubmit, handleDocumentsChange }){

    return(
        <div className='overlay-edit-honors-modal'>
            <Modal className='modal'
                show={ editHonorIsOpen && selectedDocument === doc }
             >
                <ModalHeader >
                    <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                    <ModalTitle><button type="button" onClick={() => {setEditHonorIsOpen(false)}}>X</button></ModalTitle>
                </ModalHeader>
                <ModalHeader>
                    <ModalTitle>Edit</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <EditHonorsItem fetchDocuments={fetchDocuments} doc={doc} document={document} setDocument={setDocument} description={description} initDescription={initDescription} setDescription={setDescription} handleSubmit={handleSubmit} handleDocumentsChange={handleDocumentsChange} setEditHonorIsOpen={setEditHonorIsOpen}/>
                </ModalBody>
             </Modal>
        </div>
    )
}

export default EditHonorsItemModal