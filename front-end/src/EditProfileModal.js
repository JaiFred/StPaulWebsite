//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'

//Components
import EditProfile from "./EditProfile"


function EditProfileModal({ currentUser, editProfileIsOpen, setEditProfileIsOpen }){

    // const resetForm = () => {
    //     setAmount(null);
    //     setClientSecret(null);
    //     setGivingIsOpen(false);
    //     setShowAmountForm(true);
    //     setShowRecurringForm(true);
    //     setBillingDetails('')        
    // }

    return(
        <div>
            <Modal className='modal'
                show={ editProfileIsOpen }
            >
            <ModalHeader>
            <ModalTitle>Saint Paul Baptist Church</ModalTitle>
            <ModalTitle>Edit:</ModalTitle>
            {/* <ModalTitle> <button type="button" onClick={() => {resetForm()}}>X</button></ModalTitle> */}
            <ModalTitle> <button type="button" onClick={() => {setEditProfileIsOpen(false)}}>X</button></ModalTitle> 
                <ModalBody>
                </ModalBody>
            </ModalHeader>
            <ModalFooter>
                <EditProfile currentUser={currentUser} />
                <button type="button" onClick={() => {setEditProfileIsOpen(false)}}>Cancel</button>
            </ModalFooter>

            </Modal>
        </div>
    )
}

export default EditProfileModal