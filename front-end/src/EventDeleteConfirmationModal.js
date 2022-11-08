// Hooks
import react, { useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function EventDeleteConfirmationModal({ event, deleteIsOpen, setDeleteIsOpen, handleDeleteClick }){

    const { id, title, starts_short, ends_short, details, location } = event;

    return(
        <div className='overlay_delete_modal'>
            <Modal className='modal'
                show={ deleteIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader >
                <ModalTitle>Are you sure you want to delete: <h1>{title}</h1>
                <button type="button" onClick={() => {setDeleteIsOpen(false)}}>X</button></ModalTitle>
                    </ModalHeader>
                    <ModalFooter>
                        <button type="button" onClick={handleDeleteClick}>Yes</button>
                        <button type="button" onClick={() => {setDeleteIsOpen(false)}}>No</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EventDeleteConfirmationModal