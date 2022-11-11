// Hooks
import react, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'

import SubmitEvent from './SubmitEvent';

function SubmitNewEventModal({ events, setEvents, addEventIsOpen, setAddEventIsOpen, handleAddNewEvent }) {

    return(
        <div className='overlay-submit-event-modal'>
            <Modal className='submit-event-modal' show={addEventIsOpen}>
                <ModalHeader>
                    <ModalTitle>
                        <button type="button" onClick={() => {setAddEventIsOpen(false)}}>X</button>
                    </ModalTitle>
                </ModalHeader>
                <ModalFooter>
                    <SubmitEvent events={events} setEvents={setEvents} handleAddNewEvent={handleAddNewEvent}/>
                    <button type="button" onClick={() => {setAddEventIsOpen(false)}}>Cancel</button>
                </ModalFooter>

            </Modal>
        </div>
    )

}

export default SubmitNewEventModal