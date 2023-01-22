//Hooks
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

//Components
import ModalFooter from './Modal/Footer';

//CSS


function LogoutProcedureModal({ logoutIsOpen, setLogoutIsOpen, currentUser, setCurrentUser }){

    let navigate = useNavigate();

    console.log('Rendered LogoutProcedureModal');
    console.log(`logoutIsOpen: ${logoutIsOpen}`);

    const handleLogout = (e) => {
      console.log('inside handleLogout');
        e.preventDefault()
        fetch(`/logout`, {
          method: 'DELETE',
          credentials: 'include'
        })
        .then(res => {          
            setCurrentUser(null);
            localStorage.setItem("currentUserId", null);
            navigate('/', {replace:false})
        })
      }

    return(
        <div>
            <Modal className='modal modal-delete text-center'
                show={ logoutIsOpen }
                // hide={() => {setLogoutIsOpen(false)}}
            >
                <ModalHeader className="justify-content-center">
                    <ModalTitle className='bold'>Are you Sure You want to Logout</ModalTitle>
                </ModalHeader>
                <ModalFooter 
                onSubmit={handleLogout}
                onCancel={() => {setLogoutIsOpen(false)}}
                submitLabel='Logout'
                cancelLabel='No'
                className="mb-4 mt-2"
                theme='dark' />
                    {/* <ModalFooter> 
                        <Link to='/logout'>
                        <button type="button" onClick={handleLogout}>Logout</button>
                        </Link>
                        
                        <button type="button" onClick={() => {setLogoutIsOpen(false)}}>No</button> 
                    </ModalFooter>  */}
            </Modal>
            <h1></h1>
        </div>
    )
}

export default LogoutProcedureModal