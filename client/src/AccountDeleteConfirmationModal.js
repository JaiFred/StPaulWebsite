//Hooks
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap'
import { DarkHeader } from './Modal/Header'
import DeleteProfile from './DeleteProfile'

function AccountDeleteConfirmationModal({ currentUser, accountDeleteIsOpen, setAccountDeleteIsOpen, handleUserDelete, email, setEmail, password, setPassword, error }){

    return (
        <div className='overlay-account-delete-modal'>
             <Modal className='modal'
                show={ accountDeleteIsOpen }
             >
                <DarkHeader onCancel={() => setAccountDeleteIsOpen(false)} />
                <ModalBody>
                    <DeleteProfile 
                        handleUserDelete={handleUserDelete} 
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        error={error}
                        setAccountDeleteIsOpen={setAccountDeleteIsOpen}
                    />
                </ModalBody>
             </Modal>
        </div>
    )
}

export default AccountDeleteConfirmationModal