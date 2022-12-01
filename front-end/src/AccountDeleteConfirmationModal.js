//Hooks
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap'

import DeleteProfile from './DeleteProfile'

function AccountDeleteConfirmationModal({ currentUser, accountDeleteIsOpen, setAccountDeleteIsOpen, handleUserDelete, username, setUsername, password, setPassword, error }){

    return (
        <div className='overlay-account-delete-modal'>
             <Modal className='modal'
                show={ accountDeleteIsOpen }
             >
            <ModalHeader >
                <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                <ModalTitle><button type="button" onClick={() => {setAccountDeleteIsOpen(false)}}>X</button></ModalTitle> 
            </ModalHeader>
            <ModalHeader >
                    <ModalTitle>Do you wish to delete your account</ModalTitle>
                </ModalHeader>
                    <ModalFooter> 
                        {/* <Link to='/'>
                        <button type="button" onClick={() => {setAccountDeleteIsOpen(false)}}>yes</button>
                        </Link> */}
                        <DeleteProfile 
                            handleUserDelete={handleUserDelete} 
                            username={username}
                            setUsername={setUsername}
                            password={password}
                            setPassword={setPassword}
                            error={error}
                            setAccountDeleteIsOpen={setAccountDeleteIsOpen}
                        />
                        <button type="button" onClick={() => {setAccountDeleteIsOpen(false)}}>No</button> 
                    </ModalFooter> 

             </Modal>
        </div>

    )
}

export default AccountDeleteConfirmationModal