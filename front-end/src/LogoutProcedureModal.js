import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

function LogoutProcedureModal({ logoutIsOpen, setLogoutIsOpen, currentUser, setCurrentUser }){

    let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        fetch(`/api/logout`, {
          method: 'DELETE',
          credentials: 'include'
        })
        .then(res => {
          if (res.ok) {
            setCurrentUser(null)
            navigate('/', {replace:false})
          }
        })
      }

    return(
        <div>
            <Modal className='modal'
                show={ logoutIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
                <ModalHeader >
                    <ModalTitle>Are you Sure You want to Logout</ModalTitle>
                </ModalHeader>
                    <ModalFooter> 
                        <Link to='/logout'>
                        <button type="button" onClick={handleLogout}>Logout</button>
                        </Link>
                        <button type="button" onClick={() => {setLogoutIsOpen(false)}}>No</button> 
                    </ModalFooter> 
            </Modal>
            <h1></h1>
        </div>
    )
}

export default LogoutProcedureModal