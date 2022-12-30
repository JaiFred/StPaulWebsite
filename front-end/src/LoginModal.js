import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function LoginModal({ staffIsOpen, setStaffIsOpen }){

    return(
        <div className='overlay_staff_modal'>
            <Modal className='modal'
                show={ staffIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader >
                    <ModalTitle>Do you wish to Login / Sign Up?</ModalTitle>
                </ModalHeader>
                    <ModalFooter> 
                        <Link to='/login'>
                        <button type="button" onClick={() => {setStaffIsOpen(false)}}>yes</button>
                        </Link>
                        <button type="button" onClick={() => {setStaffIsOpen(false)}}>No</button> 
                    </ModalFooter> 

            </Modal>
        </div>
    )

}

export default LoginModal