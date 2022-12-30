//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'
import { Button } from "react-bootstrap";

//Components
import EditProfile from "./EditProfile"


function EditProfileModal({ errors, currentUser, editProfileIsOpen, setEditProfileIsOpen, handleUserEdit, firstName, setFirstName, lastName, setLastName, email, setEmail }){

    console.log(`firstName 1: ${firstName}`);

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
                <button type="button" onClick={() => {setEditProfileIsOpen(false)}}>Cancel</button>
            </ModalFooter>

            </Modal>
        </div>
    )
}

export default EditProfileModal