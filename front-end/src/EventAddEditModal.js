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
    // t.string :title
    // t.datetime :starts
    // t.datetime :ends
    // t.string :details
    // t.string :location

    function handleUpdateEvent(e) {
        e.preventDefault();

        // const data = {
        //   review: {
        //     text: editedText,
        //     rating: editedRating,
        //     user_id: 7,
        //     restaurant_id: 20,
        //   },
        // };

        // fetch(`http://localhost:4000/api/v1/reviews/${id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then((response) => response.json())
        //   .then((updatedReview) => {
        //     const updatedReviews = reviews.map((review) => {
        //       if (review.id === updatedReview.id) {
        //         return updatedReview;
        //       } else {
        //         return review;
        //       }
        //     });
        //     setReviews(updatedReviews);
        //     setEditReviewForm(!showEditReviewForm);
        //   });
      }

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

    console.log(`formData in EventEditModal: ${JSON.stringify(formData)}`);

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

{/* <ModalHeader>
    <ModalTitle>
        Edit: <h1>{title}</h1>
        <button type="button" onClick={() => {setEditEventIsOpen(false)}}>X</button>
    </ModalTitle>
</ModalHeader> */}