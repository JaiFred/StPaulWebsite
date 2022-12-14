import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function LoginModal({ loginIsOpen, setLoginIsOpen }){

    return(
        <div className='overlay_staff_modal'>
            <Modal className='modal'
                show={ loginIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader >
                    <ModalTitle>Do you wish to Login</ModalTitle>
                </ModalHeader>
                    <ModalFooter> 
                        <Link to='/login'>
                        <button type="button" onClick={() => {setLoginIsOpen(false)}}>yes</button>
                        </Link>
                        <button type="button" onClick={() => {setLoginIsOpen(false)}}>No</button> 
                    </ModalFooter> 

            </Modal>
        </div>
    )

}

export default LoginModal