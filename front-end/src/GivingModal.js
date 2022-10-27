
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'

import GivingSubmission from "./GivingSubmission";

function GivingModal({ givingIsOpen, setGivingIsOpen }){


    return(
        <div className='overlay_giving_modal'>
            <Modal className='modal'
                show={ givingIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader >
                <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                <ModalTitle> <button type="button" onClick={() => {setGivingIsOpen(false)}}>X</button></ModalTitle> 
                
                    </ModalHeader>
                    <ModalFooter>
                        <ModalTitle>Give</ModalTitle>
                        <ModalTitle>$ USD</ModalTitle>
                    </ModalFooter>
                    <ModalFooter>
                        <GivingSubmission/>
                    </ModalFooter>
                    
                    <ModalFooter> 
                        
                        {/* <button type="button" onClick={handleDeleteClick}>Yes</button> */}
                        
                        {/* this button will submit the payment request */}
                        <button type="button" onClick={() => {setGivingIsOpen(false)}}>submit</button>
                        {/* this button will cancel the payment request */}
                        <button type="button" onClick={() => {setGivingIsOpen(false)}}>cancel</button>
                </ModalFooter>
            </Modal>
            <div>
        </div>
        </div>
        
    )
}

export default GivingModal