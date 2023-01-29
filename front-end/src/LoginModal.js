import { Link, useNavigate } from 'react-router-dom'
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'
import ModalFooter from './Modal/Footer';

function LoginModal({ loginIsOpen, setLoginIsOpen }) {
    
    const navigate = useNavigate();
    const closeModal = () => setLoginIsOpen(false);
    const goToLogin = () => {
        navigate('/login');
        closeModal();
    };

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
                    onSubmit={goToLogin}
                    onCancel={closeModal}
                    submitLabel='Yes'
                    cancelLabel='No'
                    className="mb-4 mt-2"
                    theme='dark'
                />

                        {/* <button type="button" onClick={() => {setLoginIsOpen(false)}}>No</button> 
                    </ModalFooter>  */}

            </Modal>
        </div>
    )
}

export default LoginModal