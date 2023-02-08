// Hooks
import react, { useState } from 'react';
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'

import ModalFooter from './Modal/Footer';

function EventDeleteConfirmationModal({ event, deleteIsOpen, setDeleteIsOpen, handleDeleteClick }){

    const { id, title, starts_short, ends_short, details, location } = event;

    return(
        <div className='overlay_delete_modal'>
            <Modal className='modal modal-delete text-center'
                show={ deleteIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader className="justify-content-center">
                <ModalTitle >Are you sure you want to delete: <br/><h1>{title}</h1></ModalTitle>
                    </ModalHeader>
                    <ModalFooter
                        onSubmit={handleDeleteClick}
                        onCancel={() => {setDeleteIsOpen(false)}}
                        submitLabel='Yes'
                        cancelLabel='No'
                        className="mb-4 mt-2"
                        theme='dark'
                    // <Link to='/signup'></Link>
                    /> 
                        {/* <button type="button" onClick={handleDeleteClick}>Yes</button>
                        <button type="button" onClick={() => {setDeleteIsOpen(false)}}>No</button> */}
            </Modal>
        </div>
    )
}

export default EventDeleteConfirmationModal