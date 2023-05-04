// Hooks
import react, { useEffect, useState } from 'react';
import { Modal, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'

//Components
import AddEditEvent from './AddEditEvent';
import { DarkHeader } from './Modal/Header';

import './EventAddEditModal.scss';

function EventAddEditModal({
    id,
    addEditEventIsOpen,
    setAddEditEventIsOpen,
    handleAddEditEvent
}){

    const [formData, setFormData] = useState({
        title: "",
        starts: "",
        ends: "",
        details: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state_province_region: "",
        zip_postalcode: "",
        country: "",
        image: "",
    });

    useEffect(() => {
        if (!id) return;

        fetch(`/api/events/${id}`)
            .then((res) => res.json())
            .then((event) => {
                const updatedEvent = { ...event, starts: event.starts_raw, ends: event.ends_raw }
                console.log('backend data', updatedEvent)
                setFormData(updatedEvent);
            });
    }, []);

    return(
        <div className='overlay_edit_modal'>
            <Modal
                className='edit_modal'
                show={addEditEventIsOpen}
            >
                <DarkHeader onCancel={() => setAddEditEventIsOpen(false)} />
                <ModalBody className="event-edit-modal-body">
                    <AddEditEvent
                        formData={formData}
                        setFormData={setFormData}
                        handleAddEditEvent={handleAddEditEvent}
                        setAddEditEventIsOpen={setAddEditEventIsOpen}
                    />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default EventAddEditModal