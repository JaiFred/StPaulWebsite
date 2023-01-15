//Hooks
import { Modal, ModalHeader, ModalBody, ModalTitle } from 'react-bootstrap'

//components
import AddHonorsItem from './AddHonorsItem'

function AddHonorsItemModal({ setDocuments, addHonorIsOpen, setAddHonorIsOpen }){    

    return (
        <div className='overlay-add-honors-modal'>
             <Modal className='modal'
                show={addHonorIsOpen}
             >
                <ModalHeader >
                    <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                    <ModalTitle><button type="button" onClick={() => {setAddHonorIsOpen(false)}}>X</button></ModalTitle> 
                </ModalHeader>
                <ModalHeader>
                    <ModalTitle>New Document</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <AddHonorsItem setDocuments={setDocuments} onCancel={() => setAddHonorIsOpen(false)} />
                </ModalBody>
             </Modal>
        </div>
    )
}

export default AddHonorsItemModal