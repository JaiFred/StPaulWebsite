import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function SignUpModal({ signUpIsOpen, setSignUpIsOpen }){

    return(
        <div className='overlay_staff_modal'>
            <Modal className='modal'
                show={ signUpIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader >
                    <ModalTitle>Do you wish to Sign Up?</ModalTitle>
                </ModalHeader>
                    <ModalFooter> 
                        <Link to='/signup'>
                        <button type="button" onClick={() => {setSignUpIsOpen(false)}}>yes</button>
                        </Link>
                        <button type="button" onClick={() => {setSignUpIsOpen(false)}}>No</button> 
                    </ModalFooter> 

            </Modal>
        </div>
    )

}

export default SignUpModal