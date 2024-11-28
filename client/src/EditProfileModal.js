//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'
import { Button } from "react-bootstrap";

//Components
import EditProfile from "./EditProfile"
import { DarkHeader } from './Modal/Header';


function EditProfileModal({ errors, currentUser, editProfileIsOpen, setEditProfileIsOpen, handleUserEdit, firstName, setFirstName, lastName, setLastName, email, setEmail }){

    // console.log(`firstName 1: ${firstName}`);
    const onCancel = () => setEditProfileIsOpen(false)

    return(
        <Modal
            className='modal'
            show={ editProfileIsOpen }
        >
            {/* <ModalHeader>
                <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                <button type="button" onClick={() => {setEditProfileIsOpen(false)}}>X</button>
            </ModalHeader> */}
            <DarkHeader onCancel={onCancel} />
            {/* <ModalTitle> <button type="button" onClick={() => {resetForm()}}>X</button></ModalTitle> */}
            
            <ModalBody className="text-center pb-0">
                <h2 className="modal-body-heading">Edit Account Info</h2>
                <EditProfile 
                    currentUser={currentUser} 
                    handleUserEdit={handleUserEdit}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    errors={errors}
                />
            </ModalBody>
            
            <ModalFooter className="grid-2-columns flex-grow-1 border-0 modal-footer-buttons">
                <Button variant="primary" type="button" onClick={handleUserEdit} className="submit">Update Profile</Button>
                <button type="button" onClick={onCancel} className="cancel">Cancel</button>
            </ModalFooter>
        </Modal>
    )
}

export default EditProfileModal