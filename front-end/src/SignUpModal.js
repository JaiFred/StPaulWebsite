import { Link, useNavigate} from 'react-router-dom'
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'

import ModalFooter from './Modal/Footer';

function SignUpModal({ signUpIsOpen, setSignUpIsOpen }){

    const navigate = useNavigate();
    const closeModal = () => setSignUpIsOpen(false);
    const goToSignUp = () => {
        navigate('/signup');
        closeModal();
    };



    return(
        <div className='overlay_staff_modal'>
            <Modal className='modal modal-delete text-center'
                show={ signUpIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader className="justify-content-center">
                    <ModalTitle className='bold'><h2 >Do you wish to Sign Up?</h2></ModalTitle>
                </ModalHeader>
                    <ModalFooter
                        onSubmit={goToSignUp}
                        onCancel={closeModal}
                        submitLabel='Yes'
                        cancelLabel='No'
                        className="mb-4 mt-2"
                        theme='dark'
                    /> 
                        
                        {/* <Link to='/signup'>
                        <button type="button" onClick={() => {setSignUpIsOpen(false)}}>yes</button>
                        </Link>
                        <button type="button" onClick={}>No</button>  */}

            </Modal>
        </div>
    )

}

export default SignUpModal