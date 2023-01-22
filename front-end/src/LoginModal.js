import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'
import ModalFooter from './Modal/Footer';


function LoginModal({ loginIsOpen, setLoginIsOpen }){

    return(
        <div className='overlay_staff_modal'>
            <Modal className='modal modal-delete text-center'
                show={ loginIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader className='justify-content-center'>
                    <ModalTitle>Do you wish to Login</ModalTitle>
                </ModalHeader>
                    <ModalFooter
                        onSubmit={<Link to='/login'><button type="button" onClick={() => {setLoginIsOpen(false)}}>yes</button></Link>}
                        onCancel={() => {setLoginIsOpen(false)}}
                        submitLabel='Yes'
                        cancelLabel='No'
                        className="mb-4 mt-2"
                        theme='dark'
                    /> 
                        <Link to='/login'>
                        <button type="button" onClick={() => {setLoginIsOpen(false)}}>yes</button>
                        </Link>
                        {/* <button type="button" onClick={() => {setLoginIsOpen(false)}}>No</button> 
                    </ModalFooter>  */}

            </Modal>
        </div>
    )

}

export default LoginModal